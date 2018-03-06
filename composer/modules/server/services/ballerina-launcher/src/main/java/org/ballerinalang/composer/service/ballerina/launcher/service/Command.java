/*
 * Copyright (c) 2017, WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.ballerinalang.composer.service.ballerina.launcher.service;

import org.apache.commons.io.FileUtils;
import org.ballerinalang.composer.server.core.ServerUtils;
import org.ballerinalang.composer.service.ballerina.launcher.service.util.LaunchUtils;
import org.ballerinalang.composer.service.ballerina.parser.service.model.BallerinaFile;
import org.ballerinalang.composer.service.ballerina.parser.service.util.ParserUtils;
import org.ballerinalang.model.tree.TopLevelNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.wso2.ballerinalang.compiler.tree.BLangCompilationUnit;
import org.wso2.ballerinalang.compiler.tree.BLangPackageDeclaration;
import org.wso2.ballerinalang.compiler.tree.BLangService;

import java.io.File;
import java.io.IOException;
import java.net.URL;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

/**
 * Command class represent the launcher commands.
 */
public class Command {

    private static final String NETTY_TRANSPORTS_YML_TEMPLATE = "/netty-transports.yml.template";
    private static final String LISTENER_PORT = "$LISTENER_PORT";
    private static final int PORT_SEED = 9090;
    private static final String BALLERINA_HOME = "ballerina.home";
    private static final String BIN = "bin";
    private static final String BALLERINA = "ballerina";
    private static final String BAT = ".bat";
    private static final String RUN = "run";
    private static final String BUILD = "build";
    private static final String BUILD_OUTPUT = "-o";
    public static final String DEBUG = "--debug";

    private String fileName = "";
    private String filePath = "";
    private String tempSourceFile;
    private String buildOutputFile;
    private boolean debug = false;
    private String[] commandArgs;
    private String configPath;
    private int port;
    private Process process;
    private boolean errorOutputEnabled = true;
    private String packageDir = null;
    private String packagePath = null;
    private boolean buildAndRun = true;
    private boolean hasServices = false;
    private BLangCompilationUnit compilationUnit;
    private static final Logger logger = LoggerFactory.getLogger(Command.class);

    public Command(String fileName, String filePath, boolean debug) {
        this.fileName = fileName;
        this.filePath = filePath;
        this.debug = debug;

        if (debug) {
            this.port = LaunchUtils.getFreePort();
        }
    }

    public Command(String fileName, String filePath, String[] commandArgs, boolean debug) {
        this(fileName, filePath, debug);
        this.commandArgs = commandArgs;
    }

    public String getFileName() {
        return fileName;
    }

    public void setFileName(String fileName) {
        this.fileName = fileName;
    }

    public String getFilePath() {
        return filePath;
    }

    public void setFilePath(String filePath) {
        this.filePath = filePath;
    }

    public boolean isDebug() {
        return debug;
    }

    public void setDebug(boolean debug) {
        this.debug = debug;
    }

    public int getPort() {
        return port;
    }

    public void setPort(int port) {
        this.port = port;
    }

    public boolean shouldBuildAndRun() {
        return buildAndRun;
    }

    public void setBuildAndRun(boolean compileAndRun) {
        this.buildAndRun = compileAndRun;
    }

    public String[] getCommandArgs() {
        return commandArgs;
    }

    public void setCommandArgs(String[] commandArgs) {
        this.commandArgs = commandArgs;
    }


    /**
     * Construct the env variables to be set in runtime process.
     * @return String[] env array
     */
    public String[] getEnvVariables() {
        List<String> envVarList = new ArrayList<>();
        if (configPath != null) {
            envVarList.add("BALLERINA_TRANSPORT_CONFIG=" + configPath);
        }
        return envVarList.toArray(new String[0]);
    }

    /**
     * Construct the command array to be executed for compiling.
     * @return String[] command array
     */
    public String[] getBuildCommandArray() {
        List<String> commandList = new ArrayList<>();
        // path to ballerina
        commandList.add(getBallerinaExecutablePath());
        commandList.add(BUILD);

        if (packagePath == null) {
            commandList.add(getBalSourceLocation());
        } else {
            commandList.add(packagePath);
        }
        createTempBuildOutputFile();
        commandList.add(BUILD_OUTPUT);
        commandList.add(buildOutputFile);
        return commandList.toArray(new String[0]);
    }

    private String getBallerinaExecutablePath() {
        return System.getProperty(BALLERINA_HOME) + File.separator + BIN + File.separator +
                BALLERINA + (LaunchUtils.isWindows() ? BAT : "");
    }

    public void analyzeTarget() {
        File targetFile = Paths.get(getBalSourceLocation()).toFile();
        BallerinaFile ballerinaFile = ParserUtils
                .getBallerinaFile(targetFile.getParent(), targetFile.getName());

        if (ballerinaFile.getBLangPackage() == null || ballerinaFile.getBLangPackage().compUnits.isEmpty()) {
            return;
        }

        // Assuming there will be only one compilation unit in the list, I'm getting the first element from the list
        compilationUnit = ballerinaFile.getBLangPackage().compUnits.get(0);
        List<TopLevelNode> topLevelNodes = compilationUnit.getTopLevelNodes();
        // filter out the BLangPackageDeclaration from top level nodes list
        List<TopLevelNode> bLangPackageDeclarations = topLevelNodes.stream()
                .filter(topLevelNode -> topLevelNode instanceof BLangPackageDeclaration).collect(Collectors.toList());
        if (!bLangPackageDeclarations.isEmpty()) {
            BLangPackageDeclaration bLangPackageDeclaration = (BLangPackageDeclaration) bLangPackageDeclarations.get(0);
            if (bLangPackageDeclaration != null) {
                List<String> pkgNameCompsInString = bLangPackageDeclaration.pkgNameComps.stream()
                        .map(ParserUtils.B_LANG_IDENTIFIER_TO_STRING).collect(Collectors.<String>toList());
                if (!(pkgNameCompsInString.size() == 1 && ".".equals(pkgNameCompsInString.get(0)))) {
                    packagePath = String.join(File.separator, pkgNameCompsInString);
                    packageDir = ParserUtils.getProgramDirectory(
                            pkgNameCompsInString.size(), Paths.get(getBalSourceLocation())
                    ).toString();
                }
            }
        }
        List<TopLevelNode> serviceDeclarations = topLevelNodes.stream()
                .filter(topLevelNode -> topLevelNode instanceof BLangService).collect(Collectors.toList());
        this.hasServices = !serviceDeclarations.isEmpty();
    }

    /**
     * Construct the command array to be executed.
     * @return String[] command array
     */
    public String[] getRunCommandArray() {
        List<String> commandList = new ArrayList<>();

        if (this.hasServices) {
            this.generateListenerConfig();
        }

        // path to ballerina
        commandList.add(getBallerinaExecutablePath());
        commandList.add(RUN);
        if (shouldBuildAndRun()) {
            commandList.add(buildOutputFile);
        } else if (packagePath == null) {
            commandList.add(getBalSourceLocation());
        } else {
            commandList.add(packagePath);
        }

        if (debug) {
            commandList.add(DEBUG);
            commandList.add(String.valueOf(this.port));
        }

        if (this.commandArgs != null) {
            commandList.addAll(Arrays.asList(this.commandArgs));
        }

        return commandList.toArray(new String[0]);
    }

    public String getPackageDir() {
        return this.packageDir;
    }

    public String getCommandIdentifier() {
        if (shouldBuildAndRun()) {
            return this.buildOutputFile;
        } else if (this.packagePath == null) {
            return this.getBalSourceLocation();
        } else {
            return this.packagePath;
        }
    }

    public String getBalSourceLocation() {
        return this.tempSourceFile == null
                ? this.filePath + File.separator + fileName
                : this.tempSourceFile;
    }

    public void setProcess(Process process) {
        this.process = process;
    }

    public Process getProcess() {
        return process;
    }

    public boolean isErrorOutputEnabled() {
        return errorOutputEnabled;
    }

    public void setErrorOutputEnabled(boolean errorOutputEnabled) {
        this.errorOutputEnabled = errorOutputEnabled;
    }

    /**
     * Creates a temporary file for build output.
     */
    private void createTempBuildOutputFile() {
        try {
            buildOutputFile = File.createTempFile("Sample", ".balx").getAbsolutePath();
        } catch (IOException e) {
            logger.error("Unable to create build output file", e);
            // @todo report error
        }
    }

    /**
     * Creates a temporary file out of given source -
     * and assign it to the command object to run.
     *
     * @param source source
     */
    public void setSource(String source) {
        File tmpFile = null;
        // We will create a tmp bal file and set that as the fileName.
        try {
            tmpFile = File.createTempFile("Sample", ".bal");
            FileUtils.writeStringToFile(tmpFile, source);
            tempSourceFile = tmpFile.getAbsolutePath();
        } catch (IOException e) {
            logger.error("Unable to save command content", e);
            // @todo report error
        }
    }

    /**
     * Creates a temporary netty config file with a different port.
     */
    protected void generateListenerConfig() {

        try {
            URL resource = Command.class.getResource(NETTY_TRANSPORTS_YML_TEMPLATE);

            String config = new String(Files.readAllBytes(Paths.get(resource.toURI())));
            config = config.replace(LISTENER_PORT, "" + ServerUtils.getAvailablePort(PORT_SEED));
            File tmpFile = null;
            // We will create a tmp yaml file and use it as listener config.
            tmpFile = File.createTempFile("netty-transports", ".yml");
            FileUtils.writeStringToFile(tmpFile, config);
            this.configPath = tmpFile.getAbsolutePath();
        } catch (Exception e) {
            logger.error("Unable to create listener config", e);
            // @todo report error
        }
    }

    public String getTempSourceFile() {
        return tempSourceFile;
    }

    public String getBuildOutputFile() {
        return buildOutputFile;
    }

    public BLangCompilationUnit getCompilationUnit() {
        return compilationUnit;
    }
}
