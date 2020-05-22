/*
 * Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.ballerinalang.packerina.task;

import com.moandjiezana.toml.Toml;
import org.ballerinalang.model.elements.PackageID;
import org.ballerinalang.packerina.buildcontext.BuildContext;
import org.ballerinalang.packerina.buildcontext.BuildContextField;
import org.ballerinalang.packerina.model.ExecutableJar;
import org.ballerinalang.toml.model.Dependency;
import org.ballerinalang.toml.model.Library;
import org.ballerinalang.toml.model.Manifest;
import org.ballerinalang.toml.parser.ManifestProcessor;
import org.wso2.ballerinalang.compiler.PackageCache;
import org.wso2.ballerinalang.compiler.semantics.model.symbols.BPackageSymbol;
import org.wso2.ballerinalang.compiler.tree.BLangPackage;
import org.wso2.ballerinalang.compiler.util.CompilerContext;
import org.wso2.ballerinalang.compiler.util.ProjectDirs;
import org.wso2.ballerinalang.programfile.ProgramFileConstants;
import org.wso2.ballerinalang.util.RepoUtils;

import java.io.File;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.DirectoryStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Arrays;
import java.util.Enumeration;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.jar.JarEntry;
import java.util.jar.JarFile;
import java.util.stream.Collectors;

import static org.ballerinalang.tool.LauncherUtils.createLauncherException;
import static org.wso2.ballerinalang.compiler.util.ProjectDirConstants.BALO_PLATFORM_LIB_DIR_NAME;
import static org.wso2.ballerinalang.compiler.util.ProjectDirConstants.BLANG_COMPILED_JAR_EXT;
import static org.wso2.ballerinalang.compiler.util.ProjectDirConstants.BLANG_PKG_DEFAULT_VERSION;
import static org.wso2.ballerinalang.compiler.util.ProjectDirConstants.DIST_BIR_CACHE_DIR_NAME;

/**
 * Copy native libraries to target/tmp.
 */
public class CopyNativeLibTask implements Task {
    private List<String> supportedPlatforms = Arrays.stream(ProgramFileConstants.SUPPORTED_PLATFORMS)
            .collect(Collectors.toList());
    private boolean skipCopyLibsFromDist;
    private Manifest manifest;
    private boolean skipTests;
    private PackageCache packageCache;


    public CopyNativeLibTask(boolean skipCopyLibsFromDist) {
        this.skipCopyLibsFromDist = skipCopyLibsFromDist;
        supportedPlatforms.add("any");
    }

    public CopyNativeLibTask() {
        this(false);
    }
    
    @Override
    public void execute(BuildContext buildContext) {
        CompilerContext context = buildContext.get(BuildContextField.COMPILER_CONTEXT);
        packageCache = PackageCache.getInstance(context);
        skipTests = buildContext.skipTests();

        Path sourceRootPath = buildContext.get(BuildContextField.SOURCE_ROOT);
        String balHomePath = buildContext.get(BuildContextField.HOME_REPO).toString();
        this.manifest = ManifestProcessor.getInstance(buildContext.get(BuildContextField.COMPILER_CONTEXT)).
                getManifest();
        copyImportedJarsForModules(buildContext, buildContext.getModules(), sourceRootPath, balHomePath);
    }

    private void copyImportedJarsForModules(BuildContext buildContext, List<BLangPackage> moduleBirMap,
                                            Path sourceRootPath, String balHomePath) {
        // Iterate through the imports and copy dependencies.
        HashSet<PackageID> alreadyImportedSet = new HashSet<>();
        for (BLangPackage pkg : moduleBirMap) {
            PackageID packageID = pkg.packageID;
            BLangPackage bLangPackage = packageCache.get(packageID);
            if (bLangPackage == null || !buildContext.moduleDependencyPathMap.containsKey(packageID)) {
                continue;
            }
            // Copy native libs for modules
            ExecutableJar executableJar = buildContext.moduleDependencyPathMap.get(packageID);
            copyPlatformLibsForModules(packageID, executableJar, sourceRootPath);
            copyImportedLibs(bLangPackage.symbol.imports, executableJar.moduleLibs, buildContext, sourceRootPath,
                    balHomePath, alreadyImportedSet);
            if (skipTests || !bLangPackage.hasTestablePackage()) {
                continue;
            }
            // Copy native libs imported by testable package
            for (BLangPackage testPkg : bLangPackage.getTestablePkgs()) {
                if (!buildContext.moduleDependencyPathMap.containsKey(testPkg.packageID)) {
                    continue;
                }
                copyImportedLibs(testPkg.symbol.imports,
                                 buildContext.moduleDependencyPathMap.get(testPkg.packageID).testLibs,
                                 buildContext, sourceRootPath, balHomePath, alreadyImportedSet);
            }
        }
    }

    private void copyPlatformLibsForModules(PackageID packageID, ExecutableJar executableJar, Path project) {
        List<Library> libraries = manifest.getPlatform().libraries;
        if (libraries == null) {
            return;
        }

        for (Library lib : libraries) {
            if (lib.getModules() == null || Arrays.asList(lib.getModules()).contains(packageID.name.value)) {
                String libFilePath = lib.getPath();
                if (libFilePath == null) {
                    continue;
                }
                Path nativeFile = project.resolve(Paths.get(libFilePath));
                if (lib.getScope() != null && lib.getScope().equalsIgnoreCase("testOnly")) {
                    executableJar.testLibs.add(nativeFile);
                    continue;
                }
                executableJar.moduleLibs.add(nativeFile);
            }
        }
    }

    private void copyImportedLibs(List<BPackageSymbol> imports, Set<Path> moduleDependencySet,
                                  BuildContext buildContext, Path sourceRootPath, String balHomePath,
                                  HashSet<PackageID> alreadyImportedSet) {
        for (BPackageSymbol importSymbol : imports) {
            PackageID pkgId = importSymbol.pkgID;
            ExecutableJar jar = buildContext.moduleDependencyPathMap.get(pkgId);
            if (!alreadyImportedSet.contains(pkgId)) {
                alreadyImportedSet.add(pkgId);
                if (jar == null) {
                    jar = new ExecutableJar();
                    buildContext.moduleDependencyPathMap.put(pkgId, jar);
                }
                copyImportedLib(buildContext, importSymbol, sourceRootPath, balHomePath, jar.moduleLibs);
                copyImportedLibs(importSymbol.imports, jar.moduleLibs, buildContext, sourceRootPath,
                                 balHomePath, alreadyImportedSet);
            }
            moduleDependencySet.addAll(jar.moduleLibs);
        }
    }

    private void copyImportedLib(BuildContext buildContext, BPackageSymbol importz, Path project, String balHomePath,
                                 Set<Path> moduleDependencySet) {
        // Get the balo paths
        for (String platform : supportedPlatforms) {
            Path importJar = findImportBaloPath(buildContext, importz, project, platform);
            if (importJar != null && Files.exists(importJar)) {
                copyLibsFromBalo(buildContext, importJar, project, importz.pkgID, moduleDependencySet);
                return;
            }
        }

        // If balo cannot be found from target, cache or platform-libs, get dependencies from distribution toml.
        copyDependenciesFromToml(importz, balHomePath, moduleDependencySet);
    }

    private static Path findImportBaloPath(BuildContext buildContext, BPackageSymbol importz, Path project,
                                           String platform) {
        // Get the jar paths
        PackageID id = importz.pkgID;
    
        Optional<Dependency> importPathDependency = buildContext.getImportPathDependency(id);
        // Look if it is a project module.
        if (ProjectDirs.isModuleExist(project, id.name.value)) {
            // If so fetch from project balo cache
            return buildContext.getBaloFromTarget(id);
        } else if (importPathDependency.isPresent()) {
            return importPathDependency.get().getMetadata().getPath();
        } else {
            // If not fetch from home balo cache.
            return buildContext.getBaloFromHomeCache(id, platform);
        }
    }

    private void copyLibsFromBalo(BuildContext buildContext, Path baloFilePath, Path project, PackageID packageID,
                                  Set<Path> moduleDependencySet) {

        String fileName = baloFilePath.getFileName().toString();
        Path baloFileUnzipDirectory = Paths.get(baloFilePath.getParent().toString(),
                                                fileName.substring(0, fileName.lastIndexOf(".")));
        File destFile = baloFileUnzipDirectory.toFile();

        // copy and validate compile scope balo dependencies
        copyAndValidateBaloDependencies(buildContext, baloFilePath, packageID, project, moduleDependencySet);

        // Read from .balo file if directory not exist.
        if (!destFile.mkdir()) {
            // Read from already unzipped balo directory.
            try (DirectoryStream<Path> stream = Files.newDirectoryStream(Paths.get(destFile.toString()))) {
                for (Path path : stream) {
                    moduleDependencySet.add(path);
                }
            } catch (IOException e) {
                throw createLauncherException("unable to copy native jar: " + e.getMessage());
            }
            return;
        }
        try (JarFile jar = new JarFile(baloFilePath.toFile())) {
            Enumeration<JarEntry> enumEntries = jar.entries();
            while (enumEntries.hasMoreElements()) {
                JarEntry file = enumEntries.nextElement();
                String entryName = file.getName();
                if (!entryName.endsWith(BLANG_COMPILED_JAR_EXT) || !entryName.contains(BALO_PLATFORM_LIB_DIR_NAME)) {
                    continue;
                }
                File f = Paths.get(baloFileUnzipDirectory.toString(),
                                   entryName.split(BALO_PLATFORM_LIB_DIR_NAME)[1]).toFile();
                if (!f.exists()) { // if file already copied or its a directory, ignore
                    // get the input stream
                    try (InputStream is = jar.getInputStream(file)) {
                        Files.copy(is, f.toPath());
                    }
                }
                moduleDependencySet.add(f.toPath());
            }
        } catch (IOException e) {
            throw createLauncherException("unable to copy native jar: " + e.getMessage());
        }
    }

    private void copyAndValidateBaloDependencies(BuildContext buildContext, Path importDependencyPath,
                                                 PackageID packageID, Path project, Set<Path> moduleDependencySet) {
        Manifest manifestFromBalo = RepoUtils.getManifestFromBalo(importDependencyPath);
        List<Library> baloDependencies = manifestFromBalo.getPlatform().libraries;
        List<Library> libraries = manifest.getPlatform().libraries;
        HashSet<Path> baloCompileScopeDependencies = new HashSet<>();
        HashSet<Path> platformLibs = new HashSet<>();

        if (baloDependencies == null) {
            return;
        }

        for (Library baloTomlLib : baloDependencies) {
            if (baloTomlLib.getScope() != null && baloTomlLib.getScope().equalsIgnoreCase("provided")) {
                baloCompileScopeDependencies.add(Paths.get(baloTomlLib.getPath()).getFileName());
            }
        }

        if (libraries != null) {
            for (Library library : libraries) {
                if (Arrays.asList(library.getModules()).contains(packageID.orgName.value + "/" +
                        packageID.name.value)) {
                    Path libFilePath = Paths.get(library.getPath());
                    platformLibs.add(libFilePath.getFileName());
                    moduleDependencySet.add(project.resolve(libFilePath));
                }
            }
        }

        for (Path baloTomlLib : baloCompileScopeDependencies) {
            if (!platformLibs.contains(baloTomlLib)) {
                buildContext.out().println("warning: " + packageID + " is missing a native library dependency - " +
                        baloTomlLib);
            }
        }
    }

    private void copyDependenciesFromToml(BPackageSymbol importz, String balHomePath,
                                          Set<Path> moduleDependencySet) {
        // Get the jar paths
        PackageID id = importz.pkgID;
        String version = BLANG_PKG_DEFAULT_VERSION;
        if (!id.version.value.equals("")) {
            version = id.version.value;
        }
        if (skipCopyLibsFromDist) {
            return;
        }
        File tomlfile = Paths.get(balHomePath, DIST_BIR_CACHE_DIR_NAME, id.orgName.value, id.name.value,
                                  version, "Ballerina.toml").toFile();

        if (!tomlfile.exists()) {
            return;
        }
        Toml tomlConfig = new Toml().read(tomlfile);
        Toml platform = tomlConfig.getTable("platform");
        if (platform == null) {
            return;
        }
        List<Object> libraries = platform.getList("libraries");
        if (libraries == null) {
            return;
        }
        for (Object lib : libraries) {
            Path fileName = Paths.get(((HashMap) lib).get("path").toString()).getFileName();
            Path libPath = Paths.get(balHomePath, "bre", "lib", fileName.toString());
            moduleDependencySet.add(libPath);
        }
    }
}
