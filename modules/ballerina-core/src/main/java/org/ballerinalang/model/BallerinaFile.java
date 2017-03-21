/*
 * Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

package org.ballerinalang.model;

import org.ballerinalang.bre.SymScope;
import org.ballerinalang.model.types.TypeLattice;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * {@code BallerinaFile} represent a content of a Ballerina source file.
 * <p>
 * A Ballerina file is structured as follows:
 * <p>
 * [package PackageName;]
 * [import PackageName[ as Identifier];]*
 * (ServiceDefinition | FunctionDefinition | ConnectorDefinition | TypeDefinition | TypeMapperDefinition |
 * ConstantDefinition)+
 *
 * @since 0.8.0
 */
public class BallerinaFile implements Node {

    /**
     * Region ids for the possible whitespace regions within the node
     */
    public final static int WS_REGION_FILE_START_TO_FIRST_TOKEN = 1;
    public final static int WS_REGION_PACKAGE_KEYWORD_TO_PACKAGE_NAME_START = 2;
    public final static int WS_REGION_PACKAGE_NAME_END_TO_SEMICOLON = 3;
    public final static int WS_REGION_PACKAGE_DEC_END_TO_NEXT_TOKEN = 4;

    private String pkgName = null;
    private String bFileName;

    private ImportPackage[] importPkgs;
    private CompilationUnit[] compilationUnits;
    private WhiteSpaceDescriptor whiteSpaceDescriptor;

    private BallerinaFile(
            String pkgName,
            String bFileName,
            ImportPackage[] importPkgs,
            CompilationUnit[] compilationUnits,
            WhiteSpaceDescriptor whiteSpaceDescriptor) {

        this.pkgName = pkgName;
        this.bFileName = bFileName;
        this.importPkgs = importPkgs;
        this.compilationUnits = compilationUnits;
        this.whiteSpaceDescriptor = whiteSpaceDescriptor;
    }

    /**
     * Get the package name which file belongs to.
     *
     * @return package name
     */
    public String getPackagePath() {
        return pkgName;
    }

    public String getFileName() {
        return bFileName;
    }

    /**
     * Get {@code Import} statements the file.
     *
     * @return list of imports
     */
    public Map<String, ImportPackage> getImportPackageMap() {
        return null;
    }

    public ImportPackage[] getImportPackages() {
        return importPkgs;
    }

    public CompilationUnit[] getCompilationUnits() {
        return compilationUnits;
    }

    public ConstDef[] getConstants() {
        return null;
    }

    /**
     * Get {@code BallerinaConnector} defined the file.
     *
     * @return list of imports
     */
    public BallerinaConnectorDef[] getConnectors() {
        return null;
    }

    /**
     * Get {@code Service} list defined in the file.
     *
     * @return list of Services
     */
    public Service[] getServices() {
        return null;
    }

    /**
     * Set {@code Service} list.
     *
     * @param services list of Services
     */
    public void setServices(Service[] services) {
    }

    public Function[] getFunctions() {
        return null;
    }

    public TypeLattice getTypeLattice() {
        return null;
    }

    public Function getMainFunction() {
        return null;
    }

    public StructDef[] getStructDefs() {
        return null;
    }

    public SymScope getPackageScope() {
        return null;
    }

    public int getSizeOfStaticMem() {
        return 0;
    }

    public void setSizeOfStaticMem(int sizeOfStaticMem) {
    }

    @Override
    public void accept(NodeVisitor visitor) {
        visitor.visit(this);
    }

    @Override
    public NodeLocation getNodeLocation() {
        return null;
    }

    public WhiteSpaceDescriptor getWhiteSpaceDescriptor() {
        return whiteSpaceDescriptor;
    }

    public void setWhiteSpaceDescriptor(WhiteSpaceDescriptor whiteSpaceDescriptor) {
        this.whiteSpaceDescriptor = whiteSpaceDescriptor;
    }

    /**
     * Builds a BFile node which represents physical ballerina source file.
     *
     * @since 0.8.0
     */
    public static class BFileBuilder {
        private String pkgName = ".";
        private String bFileName;

        private BLangPackage.PackageBuilder packageBuilder;
        private List<ImportPackage> importPkgList = new ArrayList<>();
        private List<CompilationUnit> compilationUnitList = new ArrayList<>();
        private WhiteSpaceDescriptor whiteSpaceDescriptor;

        public BFileBuilder(String bFileName, BLangPackage.PackageBuilder packageBuilder) {
            this.bFileName = bFileName;
            this.packageBuilder = packageBuilder;
        }

        public void setPackagePath(String pkgName) {
            this.pkgName = pkgName;
        }

        public void addFunction(BallerinaFunction function) {
            this.compilationUnitList.add(function);
            this.packageBuilder.addFunction(function);
        }

        public void addService(Service service) {
            this.compilationUnitList.add(service);
            this.packageBuilder.addService(service);
        }

        public void addConnector(BallerinaConnectorDef connector) {
            this.compilationUnitList.add(connector);
            this.packageBuilder.addConnector(connector);
        }

        public void addImportPackage(ImportPackage importPkg) {
            this.importPkgList.add(importPkg);
            this.packageBuilder.addImportPackage(importPkg);
        }

        public void addConst(ConstDef constant) {
            this.compilationUnitList.add((constant));
            this.packageBuilder.addConst(constant);
        }

        public void addTypeMapper(TypeMapper typeMapper) {
            this.compilationUnitList.add((BTypeMapper) typeMapper);
            this.packageBuilder.addTypeMapper(typeMapper);
        }

        /**
         * Add a ballerina user defined Struct to the ballerina file.
         * 
         * @param structDef User defined struct definition
         */
        public void addStruct(StructDef structDef) {
            this.compilationUnitList.add(structDef);
            this.packageBuilder.addStruct(structDef);
        }

        public BallerinaFile build() {
            return new BallerinaFile(
                    pkgName,
                    bFileName,
                    importPkgList.toArray(new ImportPackage[importPkgList.size()]),
                    compilationUnitList.toArray(new CompilationUnit[compilationUnitList.size()]),
                    whiteSpaceDescriptor);
        }

        public void addWhiteSpaceRegion(int regionId, String whiteSpace) {
            if(this.whiteSpaceDescriptor == null){
                this.whiteSpaceDescriptor = new WhiteSpaceDescriptor();
            }
            this.whiteSpaceDescriptor.addWhitespaceRegion(regionId, whiteSpace);
        }
    }
}
