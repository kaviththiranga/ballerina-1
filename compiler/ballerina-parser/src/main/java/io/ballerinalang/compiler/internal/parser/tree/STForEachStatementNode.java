/*
 *  Copyright (c) 2020, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
package io.ballerinalang.compiler.internal.parser.tree;

import io.ballerinalang.compiler.syntax.tree.ForEachStatementNode;
import io.ballerinalang.compiler.syntax.tree.Node;
import io.ballerinalang.compiler.syntax.tree.NonTerminalNode;
import io.ballerinalang.compiler.syntax.tree.SyntaxKind;

/**
 * This is a generated internal syntax tree node.
 *
 * @since 2.0.0
 */
public class STForEachStatementNode extends STStatementNode {
    public final STNode forEachKeyword;
    public final STNode typedBindingPattern;
    public final STNode inKeyword;
    public final STNode actionOrExpressionNode;
    public final STNode blockStatement;

    STForEachStatementNode(
            STNode forEachKeyword,
            STNode typedBindingPattern,
            STNode inKeyword,
            STNode actionOrExpressionNode,
            STNode blockStatement) {
        super(SyntaxKind.FOREACH_STATEMENT);
        this.forEachKeyword = forEachKeyword;
        this.typedBindingPattern = typedBindingPattern;
        this.inKeyword = inKeyword;
        this.actionOrExpressionNode = actionOrExpressionNode;
        this.blockStatement = blockStatement;

        addChildren(
                forEachKeyword,
                typedBindingPattern,
                inKeyword,
                actionOrExpressionNode,
                blockStatement);
    }

    public Node createFacade(int position, NonTerminalNode parent) {
        return new ForEachStatementNode(this, position, parent);
    }
}
