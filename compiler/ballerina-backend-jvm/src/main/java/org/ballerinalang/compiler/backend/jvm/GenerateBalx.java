/*
*  Copyright (c) 2019, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

package org.ballerinalang.compiler.backend.jvm;

import org.ballerinalang.compiler.BLangCompilerException;
import org.ballerinalang.compiler.CompilerPhase;
import org.wso2.ballerinalang.compiler.Compiler;
import org.wso2.ballerinalang.compiler.FileSystemProjectDirectory;
import org.wso2.ballerinalang.compiler.SourceDirectory;
import org.wso2.ballerinalang.compiler.util.CompilerContext;
import org.wso2.ballerinalang.compiler.util.CompilerOptions;
import org.wso2.ballerinalang.compiler.util.diagnotic.BLangDiagnosticLogHelper;

import java.nio.file.Path;
import java.nio.file.Paths;

import static org.ballerinalang.compiler.CompilerOptionName.COMPILER_PHASE;
import static org.ballerinalang.compiler.CompilerOptionName.OFFLINE;
import static org.ballerinalang.compiler.CompilerOptionName.PROJECT_DIR;
import static org.ballerinalang.compiler.CompilerOptionName.SKIP_TESTS;

/**
 * Class providing utility methods to generate balx from bal.
 *
 */
public class GenerateBalx {

    public static void main(String[] args) {
        Path prjctDir = Paths.get(args[0]);
        CompilerContext context = new CompilerContext();
        CompilerOptions options = CompilerOptions.getInstance(context);
        options.put(PROJECT_DIR, prjctDir.toString());
        options.put(COMPILER_PHASE, CompilerPhase.CODE_GEN.toString());
        options.put(OFFLINE, Boolean.toString(true));
        options.put(SKIP_TESTS, Boolean.toString(true));
        context.put(SourceDirectory.class, new FileSystemProjectDirectory(prjctDir));

        Compiler compiler = Compiler.getInstance(context);
        compiler.write(compiler.build(args[1]), args[2]);

        BLangDiagnosticLogHelper diagnosticLog = BLangDiagnosticLogHelper.getInstance(context);
        if (diagnosticLog.getErrorCount() > 0) {
            throw new BLangCompilerException("failed to generate executable for " + args[0]);
        }
    }
}
