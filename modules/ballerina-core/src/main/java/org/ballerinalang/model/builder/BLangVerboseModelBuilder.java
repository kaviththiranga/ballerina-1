/*
*  Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
*
*  WSO2 Inc. licenses this file to you under the Apache License,
*  Version 2.0 (the "License"); you may not use this file except
*  in compliance with the License.
*  You may obtain a copy of the License at
*
*    http://www.apache.org/licenses/LICENSE-2.0
*
*  Unless required by applicable law or agreed to in writing,
*  software distributed under the License is distributed on an
*  "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
*  KIND, either express or implied.  See the License for the
*  specific language governing permissions and limitations
*  under the License.
*/
package org.ballerinalang.model.builder;

import org.ballerinalang.model.BLangPackage;
import org.ballerinalang.model.BallerinaFile;

/**
 * {@code BLangVerboseModelBuilder} provides an API to create Ballerina language object model(AST) with detailed
 * information about node including whitespace
 */
public class BLangVerboseModelBuilder extends BLangModelBuilder {

    public BLangVerboseModelBuilder(BLangPackage.PackageBuilder packageBuilder, String bFileName) {
        super(packageBuilder, bFileName);
    }

    public BallerinaFile build() {
        return bFileBuilder.build();
    }

    public void setStartingWhiteSpace(String whiteSpace){
        bFileBuilder.addWhiteSpaceRegion(BallerinaFile.WS_REGION_FILE_START_TO_FIRST_TOKEN, whiteSpace);
    }

    public BallerinaFile.BFileBuilder getbFileBuilder() {
        return bFileBuilder;
    }
}
