export const COMMANDS = {
    DEBUG_PROGRAM: 'DEBUG_PROGRAM',
    RUN_PROGRAM: 'RUN_PROGRAM',
    RUN_SOURCE: 'RUN_SOURCE',
    TERMINATE: 'TERMINATE',
    PING: 'PING',
};

export const EVENTS = {
    CONNECTED: 'connected',
    DEBUG_STARTED: 'debug-started',
    EXECUTION_STARTED: 'execution-started',
    EXECUTION_ENDED: 'execution-ended',
    SESSION_STARTED: 'session-started',
    SESSION_ERROR: 'session-error',
    SESSION_ENDED: 'session-ended',
    MESSAGE_RECEIVED: 'message-received',
    CONSOLE_MESSAGE_RECEIVED: 'console-message-received',
};

export const MSG_TYPES = {
    LAUNCH_SESSION_INFO: 'LAUNCH_SESSION_INFO',
    OUTPUT: 'OUTPUT',
    EXECUTION_STARTED: 'EXECUTION_STARTED',
    EXECUTION_STOPPED: 'EXECUTION_STOPPED',
    EXECUTION_TERMINATED: 'EXECUTION_TERMINATED',
    DEBUG_PORT: 'DEBUG_PORT',
    EXIT: 'EXIT',
    PONG: 'PONG',
    INVALID_CMD: 'INVALID_CMD',
};

