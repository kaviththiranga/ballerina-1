/**
 * Copyright (c) 2017, WSO2 Inc. (http://www.wso2.org) All Rights Reserved.
 *
 * WSO2 Inc. licenses this file to you under the Apache License,
 * Version 2.0 (the "License"); you may not use this file except
 * in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied. See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
import EventChannel from 'event_channel';
import LaunchChannel from './LaunchChannel';
import { COMMANDS, EVENTS, MSG_TYPES } from './constants';

class LaunchManager extends EventChannel {
    constructor() {
        super();
        this.active = false;
        this._messages = [];
    }

    set active(active) {
        this._active = active;
    }

    get active() {
        return this._active;
    }

    set messages(messages) {
        this._messages = messages;
    }

    get messages() {
        return this._messages;
    }

    init(endpoint) {
        this.endpoint = endpoint;
    }

    run(file, debug = false, configs) {
        this._messages = [];
        let command;
        if (debug) {
            command = COMMANDS.DEBUG_PROGRAM;
        } else {
            command = COMMANDS.RUN_PROGRAM;
        }
        this.channel = new LaunchChannel(this.endpoint);
        this.channel.on(EVENTS.SESSION_STARTED, () => {
            this.sendRunApplicationMessage(file, command, configs);
        });
        this.channel.on(EVENTS.MESSAGE_RECEIVED, (message) => {
            this.processMesssage(message);
        });
    }

    stop() {
        const message = {
            command: COMMANDS.TERMINATE,
        };
        this.channel.sendMessage(message);
    }

    /**
     * Send message to run give ballerina source
     * @param {String} source - source
     *
     * @memberof LaunchManager
     */
    sendRunSourceMessage(source) {
        this.channel = new LaunchChannel(this.endpoint);
        this.channel.on(EVENTS.SESSION_STARTED, () => {
            const message = {
                command: COMMANDS.RUN_SOURCE,
                source,
                commandArgs: [],
            };
            this.channel.sendMessage(message);
        });
        this.channel.on(EVENTS.MESSAGE_RECEIVED, (message) => {
            this.processMesssage(message);
        });
    }

    /**
     * Send message to ballerina program
     * @param {File} file - File instance
     *
     * @memberof LaunchManager
     */
    sendRunApplicationMessage(file, command, configs) {
        const message = {
            command,
            fileName: `${file.name}.${file.extension}`,
            filePath: file.path,
            commandArgs: configs,
        };
        this.channel.sendMessage(message);
    }

    /**
     *
     * @param {Object} message - Process message from backend
     *
     * @memberof LaunchManager
     */
    processMesssage(message) {
        this._messages.push(message);
        if (message.code === MSG_TYPES.OUTPUT) {
            if (message.message && message.message.endsWith(this.debugPort)) {
                this.trigger(EVENTS.DEBUG_STARTED, this.debugPort);
                return;
            }
        }
        if (message.code === MSG_TYPES.EXECUTION_STARTED) {
            this.active = true;
            this.trigger(EVENTS.EXECUTION_STARTED);
        }
        if (message.code === MSG_TYPES.EXECUTION_STOPPED
                || message.code === MSG_TYPES.EXECUTION_TERMINATED) {
            this.active = false;
            this.trigger(EVENTS.EXECUTION_ENDED);
            this.channel.close();
        }
        if (message.code === MSG_TYPES.DEBUG_PORT) {
            this.debugPort = message.port;
            return;
        }
        if (message.code === MSG_TYPES.EXIT) {
            this.active = false;
            this.trigger(EVENTS.SESSION_ENDED);
            // close the current channel.
            this.channel.close();
            // this.tryItUrl = undefined;
        }
        if (message.code === MSG_TYPES.PONG) {
            // if a pong message is received we will ignore.
            return;
        }
        if (message.code === MSG_TYPES.INVALID_CMD) {
            // ignore and return.
            return;
        }
        this.trigger(EVENTS.CONSOLE_MESSAGE_RECEIVED, message);
    }
}

export default new LaunchManager();
