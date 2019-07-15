// Copyright (c) 2018 WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
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

import ballerina/http;

///////////////////////////
/// Service Annotations ///
///////////////////////////
# Configuration for a WebSubSubscriber service.
#
# + endpoints - Array of endpoints the service would be attached to
# + path - Path of the WebSubSubscriber service
# + subscribeOnStartUp - Boolean indicating whether a subscription request is expected to be sent on start up
# + resourceUrl - The resource URL for which discovery will be initiated to identify hub and topic if not
#                 specified
# + hub - The hub at which the subscription should be registered
# + topic - The topic for which this WebSub subscriber (callback) should be registered
# + leaseSeconds - The period for which the subscription is expected to be active
# + secret - The secret to be used for authenticated content distribution
# + callback - The callback to use when registering, if unspecified host:port/path will be used
# + subscriptionClientConfig - The configuration for subscription client
public type SubscriberServiceConfiguration record {|
    Listener?[] endpoints = [];
    string path = "";
    boolean subscribeOnStartUp = false;
    string resourceUrl = "";
    string hub = "";
    string topic = "";
    int leaseSeconds = 0;
    string secret = "";
    string callback = "";
    http:ClientEndpointConfig subscriptionClientConfig?;
|};

# WebSub Subscriber Configuration for the service, indicating subscription related parameters.
public annotation SubscriberServiceConfiguration SubscriberServiceConfig on service;
