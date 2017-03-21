/*
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
package org.ballerinalang.model;

import java.util.HashMap;
import java.util.Map;

/**
 * {@code WhiteSpaceDescriptor} contains information about whitespace associated with a particular language construct in the source file.
 *
 * @since 0.8.4
 */
public class WhiteSpaceDescriptor {

    protected Map<Integer, WhiteSpaceRegion> whiteSpaceRegions;

    public WhiteSpaceDescriptor() {
        this.whiteSpaceRegions = new HashMap<>();
    }

    public void addWhitespaceRegion(int regionId, String whiteSpace){
       this.whiteSpaceRegions.put(regionId, new WhiteSpaceRegion(regionId, whiteSpace));
    }

    public Map<Integer, WhiteSpaceRegion> getWhiteSpaceRegions() {
        return whiteSpaceRegions;
    }

    public void setWhiteSpaceRegions(Map<Integer, WhiteSpaceRegion> whiteSpaceRegions) {
        this.whiteSpaceRegions = whiteSpaceRegions;
    }
}
