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

import ballerina/test;
import ballerina/io;

// afterEach function that fails. All test functions except for the first should be skipped.

string a = "before";

@test:BeforeEach
public function beforeEach() {
    io:println("BeforeEach Func");
    a = a + "beforeEach";
}

@test:AfterEach
public function afterEach() {
    io:println("AfterEach Func");
    int i = 12/0;
}

@test:Config {}
public function test1() {
    io:println("test1");
    a = a + "test";
}

@test:Config {}
public function test2() {
    io:println("test2");
    a = a + "test";
}

@test:Config {}
public function test3() {
    io:println("test3");
    a = a + "test";
}

@test:AfterSuite {}
public function afterSuite() {
    io:println("Value of a is " + a); // expects a = "beforebeforeEachtest"
}
