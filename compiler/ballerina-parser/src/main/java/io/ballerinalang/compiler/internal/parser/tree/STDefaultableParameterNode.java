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

import io.ballerinalang.compiler.syntax.tree.DefaultableParameterNode;
import io.ballerinalang.compiler.syntax.tree.Node;
import io.ballerinalang.compiler.syntax.tree.NonTerminalNode;
import io.ballerinalang.compiler.syntax.tree.SyntaxKind;

/**
 * This is a generated internal syntax tree node.
 *
 * @since 2.0.0
 */
public class STDefaultableParameterNode extends STParameterNode {
    public final STNode leadingComma;
    public final STNode annotations;
    public final STNode visibilityQualifier;
    public final STNode typeName;
    public final STNode paramName;
    public final STNode equalsToken;
    public final STNode expression;

    STDefaultableParameterNode(
            STNode leadingComma,
            STNode annotations,
            STNode visibilityQualifier,
            STNode typeName,
            STNode paramName,
            STNode equalsToken,
            STNode expression) {
        super(SyntaxKind.DEFAULTABLE_PARAM);
        this.leadingComma = leadingComma;
        this.annotations = annotations;
        this.visibilityQualifier = visibilityQualifier;
        this.typeName = typeName;
        this.paramName = paramName;
        this.equalsToken = equalsToken;
        this.expression = expression;

        addChildren(
                leadingComma,
                annotations,
                visibilityQualifier,
                typeName,
                paramName,
                equalsToken,
                expression);
    }

    public Node createFacade(int position, NonTerminalNode parent) {
        return new DefaultableParameterNode(this, position, parent);
    }
}
