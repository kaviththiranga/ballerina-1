/*
*  Copyright (c) 2016, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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
package org.ballerinalang.model;

/**
 * This class represents a Node in Ballerina AST (Abstract Syntax Tree).
 *
 * @since 0.8.0
 */
public interface Node {

    /**
     * Accept a {link NodeVisitor} and executes the visitor.
     * 
     * @param visitor Node visitor to traverse the node
     */
    void accept(NodeVisitor visitor);

    /**
     * Returns the location of this node.
     * <p>
     * {@link NodeLocation} includes the source filename and the line number.
     *
     * @return location of this node
     */
    NodeLocation getNodeLocation();

    /**
     * Get information about whitespace associated with this particular node in source text
     * @return whitespace information
     */
    WhiteSpaceDescriptor getWhiteSpaceDescriptor();

    /**
     * Set information about whitespace associated with this particular node in source text
     * @param whiteSpaceDescriptor whitespace descriptor for the node
     */
    void setWhiteSpaceDescriptor(WhiteSpaceDescriptor whiteSpaceDescriptor);
}
