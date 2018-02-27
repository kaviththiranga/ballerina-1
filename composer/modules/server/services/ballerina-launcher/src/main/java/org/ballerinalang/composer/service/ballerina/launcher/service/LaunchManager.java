/*
 * Copyright (c) 2017, WSO2 Inc. (http://wso2.com) All Rights Reserved.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package org.ballerinalang.composer.service.ballerina.launcher.service;

import com.google.gson.Gson;
import org.apache.commons.io.IOUtils;
import org.apache.commons.lang3.StringUtils;
import org.ballerinalang.composer.server.core.ServerConfig;
import org.ballerinalang.composer.service.ballerina.launcher.service.dto.CommandDTO;
import org.ballerinalang.composer.service.ballerina.launcher.service.dto.MessageDTO;
import org.ballerinalang.composer.service.ballerina.launcher.service.util.LaunchUtils;
import org.ballerinalang.model.tree.TopLevelNode;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.wso2.ballerinalang.compiler.tree.BLangAnnotationAttachment;
import org.wso2.ballerinalang.compiler.tree.BLangService;
import org.wso2.ballerinalang.compiler.tree.expressions.BLangAnnotAttachmentAttribute;

import java.io.BufferedReader;
import java.io.File;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.InetAddress;
import java.nio.charset.Charset;
import java.time.Duration;
import java.time.Instant;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import javax.websocket.Session;

/**
 * Launch Manager which manage launch requests from the clients.
 */
public class LaunchManager {

    private static final Logger logger = LoggerFactory.getLogger(LaunchManager.class);

    private static Map<String, LaunchManager> launchManagersMap = new HashMap<>();

    private static final String LAUNCHER_CONFIG_KEY = "launcher";

    private static final String SERVICE_TRY_URL_CONFIG = "serviceTryURL";

    private ServerConfig serverConfig;

    private Session launchSession;

    private Command command;

    private String port = StringUtils.EMPTY;

    /**
     * Instantiates a new Debug manager.
     */
    public LaunchManager(ServerConfig serverConfig, Session launchSession) {
        this.serverConfig = serverConfig;
        this.launchSession = launchSession;
    }

    public static Map<String, LaunchManager> getLaunchManagersMap() {
        return launchManagersMap;
    }

    private void run(Command command) {
        this.command = command;
        // send a message if ballerina home is not set
        if (null == serverConfig.getBallerinaHome()) {
            pushMessageToClient(LauncherConstants.ERROR, LauncherConstants.ERROR, LauncherConstants
                    .INVALID_BAL_PATH_MESSAGE);
            pushMessageToClient(LauncherConstants.ERROR, LauncherConstants.ERROR, LauncherConstants
                    .SET_BAL_PATH_MESSAGE);
            return;
        }

        try {
            command.analyzeTarget();
            if (command.shouldBuildAndRun()) {
                buildAndLaunchProgram();
            } else {
                launchProgram();
            }
        } catch (IOException e) {
            pushMessageToClient(LauncherConstants.EXIT, LauncherConstants.ERROR, e.getMessage());
        }
    }

    private void buildAndLaunchProgram() throws IOException {
        Process buildProcess;
        String[] cmdArray = command.getBuildCommandArray();
        String[] envVars = command.getEnvVariables();
        Instant buildStart = Instant.now();
        if (command.getPackageDir() == null) {
            buildProcess = Runtime.getRuntime().exec(cmdArray, envVars);
        } else {
            buildProcess = Runtime.getRuntime().exec(cmdArray, envVars, new File(command.getPackageDir()));
        }
        command.setProcess(buildProcess);

        pushMessageToClient(LauncherConstants.BUILD_STARTED, LauncherConstants.INFO,
                LauncherConstants.BUILD_START_MESSAGE);

        new Thread(new Runnable() {
            @Override
            public void run() {
                BufferedReader reader = null;
                try {
                    reader = new BufferedReader(new InputStreamReader(buildProcess.getInputStream(), Charset
                            .defaultCharset()));
                    String line = "";
                    while ((line = reader.readLine()) != null) {
                        // TODO
                    }
                    Instant buildStop = Instant.now();
                    Duration buildTime = Duration.between(buildStart, buildStop);
                    pushMessageToClient(LauncherConstants.BUILD_STOPPED, LauncherConstants.INFO,
                            LauncherConstants.BUILD_END_MESSAGE + buildTime.toMillis() + " milliseconds");
                    launchProgram();
                } catch (IOException e) {
                    logger.error("Error while sending output stream to client.", e);
                } finally {
                    if (reader != null) {
                        IOUtils.closeQuietly(reader);
                    }
                }
            }
        }).start();

        new Thread(new Runnable() {
            @Override
            public void run() {
                BufferedReader reader = null;
                try {
                    reader = new BufferedReader(new InputStreamReader(
                            buildProcess.getErrorStream(), Charset.defaultCharset()));
                    String line = "";
                    while ((line = reader.readLine()) != null) {
                        pushMessageToClient(LauncherConstants.BUILD_ERROR, LauncherConstants.ERROR, line);
                    }
                } catch (IOException e) {
                    logger.error("Error while sending error stream to client.", e);
                } finally {
                    if (reader != null) {
                        IOUtils.closeQuietly(reader);
                    }
                }
            }
        }).start();
    }

    private void launchProgram() throws IOException {
        Process launchProcess;
        String[] cmdArray = command.getRunCommandArray();
        String[] envVars = command.getEnvVariables();
        if (command.getPackageDir() == null) {
            launchProcess = Runtime.getRuntime().exec(cmdArray, envVars);
        } else {
            launchProcess = Runtime.getRuntime().exec(cmdArray, envVars, new File(command.getPackageDir()));
        }
        command.setProcess(launchProcess);

        pushMessageToClient(LauncherConstants.EXECUTION_STARTED, LauncherConstants.INFO,
                LauncherConstants.RUN_MESSAGE);

        if (command.isDebug()) {
            MessageDTO debugMessage = new MessageDTO();
            debugMessage.setCode(LauncherConstants.DEBUG);
            debugMessage.setPort(command.getPort());
            pushMessageToClient(debugMessage);
        }

        // start a new thread to stream command output.
        Runnable output = new Runnable() {
            public void run() {
                LaunchManager.this.streamOutput();
            }
        };
        (new Thread(output)).start();
        Runnable error = new Runnable() {
            public void run() {
                LaunchManager.this.streamError();
            }
        };
        (new Thread(error)).start();
    }

    public void streamOutput() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(this.command.getProcess().getInputStream(), Charset
                    .defaultCharset()));
            String line = "";
            while ((line = reader.readLine()) != null) {
                if (line.startsWith(LauncherConstants.DEPLOYING_SERVICES_IN_MESSAGE)) {
                    pushMessageToClient(LauncherConstants.OUTPUT, LauncherConstants.INFO,
                            LauncherConstants.DEPLOYING_SERVICES);
                } else if (line.startsWith(LauncherConstants.SERVER_CONNECTOR_STARTED_AT_HTTP_LOCAL)) {
                    this.updatePort(line);
                    String serviceURL = "http://" + InetAddress.getLocalHost().getHostAddress() + ":" + this.port;
                    pushMessageToClient(LauncherConstants.OUTPUT, LauncherConstants.INFO,
                            LauncherConstants.STARTED_SERVICES + serviceURL);
                    pushMessageToClient(LauncherConstants.OUTPUT, LauncherConstants.DATA,
                            LauncherConstants.TRY_IT_MSG + getCURLCmd(serviceURL));
                } else {
                    pushMessageToClient(LauncherConstants.OUTPUT, LauncherConstants.DATA, line);
                }
            }
            pushMessageToClient(LauncherConstants.EXECUTION_STOPPED, LauncherConstants.INFO,
                    LauncherConstants.END_MESSAGE);
        } catch (IOException e) {
            logger.error("Error while sending output stream to client.", e);
        } finally {
            if (reader != null) {
                IOUtils.closeQuietly(reader);
            }
        }
    }

    private String getCURLCmd(String serviceURL) {
        List<TopLevelNode> topLevelNodes = this.command.getCompilationUnit().getTopLevelNodes();
        Optional<TopLevelNode> firstServiceQuery = topLevelNodes.stream()
                .filter(topLevelNode -> topLevelNode instanceof BLangService)
                .findFirst();
        if (firstServiceQuery.isPresent()) {
            BLangService serviceNode = (BLangService) firstServiceQuery.get();
            Optional<BLangAnnotationAttachment> httpConfigAnnoationQuery =
                    serviceNode.getAnnotationAttachments()
                    .stream()
                    .filter(annotation ->
                            annotation.annotationName.getValue().equals("configuration")
                            && annotation.pkgAlias.getValue().equals("http")
                    )
                    .findFirst();
            if (httpConfigAnnoationQuery.isPresent()) {
                BLangAnnotationAttachment httpConfigAnnotation = httpConfigAnnoationQuery.get();
                Optional<BLangAnnotAttachmentAttribute> basePathAnnotationQuery = httpConfigAnnotation.getAttributes()
                        .stream()
                        .filter(attrb -> attrb.name.getValue().equals("basePath"))
                        .findFirst();
                if (basePathAnnotationQuery.isPresent()) {
                    BLangAnnotAttachmentAttribute basePathAttrib = basePathAnnotationQuery.get();
                    String basePath = basePathAttrib.getValue().getValue().toString();
                    return serviceURL + basePath;
                }
            }
        }
        return serviceURL;
    }

    public void streamError() {
        BufferedReader reader = null;
        try {
            reader = new BufferedReader(new InputStreamReader(
                    this.command.getProcess().getErrorStream(), Charset.defaultCharset()));
            String line = "";
            while ((line = reader.readLine()) != null) {
                if (this.command.isErrorOutputEnabled()) {
                    pushMessageToClient(LauncherConstants.OUTPUT, LauncherConstants.ERROR, line);
                }
            }
        } catch (IOException e) {
            logger.error("Error while sending error stream to client.", e);
        } finally {
            if (reader != null) {
                IOUtils.closeQuietly(reader);
            }
        }
    }

    /**
     * Stop a running ballerina program.
     */
    public void stopProcess() {
        int pid = -1;
        if (this.command != null && this.command.getProcess().isAlive()) {
            //shutdown error streaming to prevent kill message displaying to user.
            this.command.setErrorOutputEnabled(false);

            String os = getOperatingSystem();
            if (os == null) {
                logger.error("unsupported operating system");
                pushMessageToClient(LauncherConstants.UNSUPPORTED_OPERATING_SYSTEM,
                        LauncherConstants.ERROR, LauncherConstants.TERMINATE_MESSAGE);
                return;
            }
            Terminator terminator = new TerminatorFactory().getTerminator(os, this.command);
            if (terminator == null) {
                logger.error("unsupported operating system");
                pushMessageToClient(LauncherConstants.UNSUPPORTED_OPERATING_SYSTEM,
                        LauncherConstants.ERROR, LauncherConstants.TERMINATE_MESSAGE);
                return;
            }

            terminator.terminate();
            pushMessageToClient(LauncherConstants.EXECUTION_TERMINATED, LauncherConstants.INFO,
                    LauncherConstants.TERMINATE_MESSAGE);
        }
    }

    private String getServerStartedURL() {
        // read configs provided in server config yaml file for launcher
        if (serverConfig.getCustomConfigs() != null &&
                serverConfig.getCustomConfigs().containsKey(LAUNCHER_CONFIG_KEY)) {
            return serverConfig.getCustomConfigs().get(LAUNCHER_CONFIG_KEY)
                    .get(SERVICE_TRY_URL_CONFIG);
        }
        return null;

    }

    /**
     * Returns name of the operating system running. null if not a unsupported operating system.
     *
     * @return operating system
     */
    private String getOperatingSystem() {
        if (LaunchUtils.isWindows()) {
            return "windows";
        } else if (LaunchUtils.isUnix() || LaunchUtils.isSolaris()) {
            return "unix";
        } else if (LaunchUtils.isMac()) {
            return "mac";
        }
        return null;
    }

    public void processCommand(String json) {
        Gson gson = new Gson();
        CommandDTO command = gson.fromJson(json, CommandDTO.class);
        MessageDTO message;
        switch (command.getCommand()) {
            case LauncherConstants.RUN_SOURCE:
                Command cmd = new Command(
                        command.getFileName(), command.getFilePath(), command.getCommandArgs(), false);
                cmd.setSource(command.getSource());
                run(cmd);
                break;
            case LauncherConstants.RUN_PROGRAM:
                run(new Command(command.getFileName(), command.getFilePath(), command.getCommandArgs(), false));
                break;
            case LauncherConstants.DEBUG_PROGRAM:
                run(new Command(command.getFileName(), command.getFilePath(), command.getCommandArgs(), true));
                break;
            case LauncherConstants.TERMINATE:
                stopProcess();
                break;
            case LauncherConstants.PING:
                message = new MessageDTO();
                message.setCode(LauncherConstants.PONG);
                pushMessageToClient(message);
                break;
            default:
                message = new MessageDTO();
                message.setCode(LauncherConstants.INVALID_CMD);
                message.setMessage(LauncherConstants.MSG_INVALID);
                pushMessageToClient(message);
        }
    }

    /**
     * Push message to client.
     * @param status  the status
     */
    public void pushMessageToClient(MessageDTO status) {
        Gson gson = new Gson();
        String json = gson.toJson(status);
        try {
            this.launchSession.getBasicRemote().sendText(json);
        } catch (IOException e) {
            logger.error("Error while pushing messages to client.", e);
        }
    }

    public void pushMessageToClient(String code, String type, String text) {
        MessageDTO message = new MessageDTO();
        message.setCode(code);
        message.setType(type);
        message.setMessage(text);
        pushMessageToClient(message);
    }

    /**
     * Gets the port of the from console log that starts with
     * LauncherConstants.SERVER_CONNECTOR_STARTED_AT_HTTP_LOCAL.
     *
     * @param line The log line.
     */
    private void updatePort(String line) {
        String hostPort = StringUtils.substringAfterLast(line,
                LauncherConstants.SERVER_CONNECTOR_STARTED_AT_HTTP_LOCAL).trim();
        String port = StringUtils.substringAfterLast(hostPort, ":");
        if (StringUtils.isNotBlank(port)) {
            this.port = port;
        }
    }

    /**
     * Getter for running port.
     *
     * @return The port.
     */
    public String getPort() {
        return this.port;
    }
}
