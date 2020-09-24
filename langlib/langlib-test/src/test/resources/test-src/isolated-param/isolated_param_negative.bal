// Copyright (c) 2020 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
//
// WSO2 Inc. licenses this file to you under the Apache License,
// Version 2.0 (the "License"); you may not use this file except
// in compliance with the License.
// You may obtain a copy of the License at
//
// http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing,
// software distributed under the License is distributed on an
// "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
// KIND, either express or implied.  See the License for the
// specific language governing permissions and limitations
// under the License.

import ballerina/lang.array;
import ballerina/lang.'map;

isolated function testInvalidArgForIsolatedParam() {
    int[] x = [1, 2, 3];

    'array:forEach(x, arrForEachFunc);
    'array:forEach(func = arrForEachFunc, arr = x);
    x.forEach(func = arrForEachFunc);
    x.forEach(arrForEachFunc);

    map<boolean> y = {a: true, b: true, c: false};
    y = y.filter(mapFilterFunc);
    y = y.filter(func = mapFilterFunc);
    y = 'map:filter(y, mapFilterFunc);
}

function arrForEachFunc(int i) {

}

function mapFilterFunc(boolean val) returns boolean => !val;
