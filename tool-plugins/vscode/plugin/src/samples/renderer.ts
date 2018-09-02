import { log } from '../logger';
import { ExtendedLangClient } from '../lang-client';
import { Uri } from 'vscode';

const samples = [
    {
      "title": "Hello World",
      "column": 0,
      "samples": [
        {
          "name": "Hello World Service",
          "url": "hello-world-service"
        },
        {
          "name": "Hello World Main",
          "url": "hello-world"
        },
        {
          "name": "Hello World Parallel",
          "url": "hello-world-parallel"
        },
        {
          "name": "Hello World Client",
          "url": "hello-world-client"
        },
        {
          "name": "Hello World Streams",
          "url": "hello-world-streams"
        }
      ]
    },
    {
      "title": "Ballerina Basics",
      "column": 0,
      "samples": [
        {
          "name": "Packages",
          "url": "packages"
        },
        {
          "name": "Variables",
          "url": "variables"
        },
        {
          "name": "Var",
          "url": "var"
        },
        {
          "name": "Functions",
          "url": "functions"
        },
        {
          "name": "Defaultable Parameters",
          "url": "functions-with-defaultable-parameters"
        },
        {
          "name": "Rest Parameters",
          "url": "functions-with-rest-parameter"
        },
        {
          "name": "Documentation",
          "url": "documentation"
        }
      ]
    },
    {
      "title": "Values and Types",
      "column": 0,
      "samples": [
        {
          "name": "Values",
          "url": "values"
        },
        {
          "name": "String Template Literal",
          "url": "string-template"
        },
        {
          "name": "Arrays",
          "url": "arrays"
        },
        {
          "name": "Record",
          "url": "records"
        },
        {
          "name": "Maps",
          "url": "maps"
        },
        {
          "name": "Table",
          "url": "table"
        },
        {
          "name": "Table Queries",
          "url": "table-queries"
        },
        {
          "name": "Union Types",
          "url": "union-type"
        },
        {
          "name": "Optional Type",
          "url": "optional-type"
        },
        {
          "name": "Nil Lifting",
          "url": "nil-lifting"
        },
        {
          "name": "Tuples",
          "url": "tuple-type"
        },
        {
          "name": "Any Type",
          "url": "any-type"
        },
        {
          "name": "Type Conversion",
          "url": "type-conversion"
        },
        {
          "name": "Lengthof",
          "url": "lengthof"
        },
        {
          "name": "Integer Ranges",
          "url": "integer-ranges"
        }
      ]
    },
    {
      "title": "Flow Control",
      "column": 0,
      "samples": [
        {
          "name": "If/Else",
          "url": "if-else"
        },
        {
          "name": "While",
          "url": "while"
        },
        {
          "name": "Foreach",
          "url": "foreach"
        },
        {
          "name": "Match",
          "url": "match"
        },
        {
          "name": "Match Expression",
          "url": "match-expression"
        },
        {
          "name": "Elvis",
          "url": "elvis-operator"
        }
      ]
    },
    {
      "title": "Errors ",
      "column": 0,
      "samples": [
        {
          "name": "Error Handling",
          "url": "error-handling"
        },
        {
          "name": "Error Lifting",
          "url": "error-lifting"
        },
        {
          "name": "Check",
          "url": "check"
        },
        {
          "name": "Throw ",
          "url": "throw"
        },
        {
          "name": "Try/Catch/Finally",
          "url": "try-catch-finally"
        }
      ]
    },
    {
      "title": "Testing",
      "column": 0,
      "samples": [
        {
          "name": "Assertions",
          "url": "testerina-assertions"
        },
        {
          "name": "Before and After Test",
          "url": "testerina-before-and-after-test"
        },
        {
          "name": "Before Each Test",
          "url": "testerina-before-each-test"
        },
        {
          "name": "Before and After Suite",
          "url": "testerina-before-and-after-suite"
        },
        {
          "name": "Data Driven Tests",
          "url": "testerina-data-driven-tests"
        },
        {
          "name": "Guarantee Test Execution Order",
          "url": "testerina-guarantee-test-execution-order"
        },
        {
          "name": "Function Mocks",
          "url": "testerina-function-mocks"
        },
        {
          "name": "Group Tests",
          "url": "testerina-group-tests"
        }
      ]
    },
    {
      "title": "JSON / XML",
      "column": 1,
      "samples": [
        {
          "name": "JSON",
          "url": "json"
        },
        {
          "name": "JSON Arrays",
          "url": "json-arrays"
        },
        {
          "name": "Constrained JSON",
          "url": "constrained-json"
        },
        {
          "name": "XML",
          "url": "xml"
        },
        {
          "name": "XML Literal",
          "url": "xml-literal"
        },
        {
          "name": "XML Namespaces",
          "url": "xml-namespaces"
        },
        {
          "name": "XML Attributes",
          "url": "xml-attributes"
        },
        {
          "name": "XML Functions",
          "url": "xml-functions"
        },
        {
          "name": "JSON/Struct/Map Conversion",
          "url": "json-struct-map-conversion"
        }
      ]
    },
    {
      "title": "Object",
      "column": 1,
      "samples": [
        {
          "name": "Object",
          "url": "objects"
        },
        {
          "name": "Object Initializer",
          "url": "object-initializer"
        },
        {
          "name": "Member Functions",
          "url": "object-member-functions"
        },
        {
          "name": "Object Assignability",
          "url": "object-assignability"
        }
      ]
    },
    {
      "title": "Concurrency",
      "column": 1,
      "samples": [
        {
          "name": "Workers",
          "url": "workers"
        },
        {
          "name": "Worker Interactions",
          "url": "worker-interaction"
        },
        {
          "name": "Fork/Join",
          "url": "fork-join"
        },
        {
          "name": "Fork/Join Conditional Join",
          "url": "fork-join-conditional-join"
        },
        {
          "name": "Fork/Join Variable Access",
          "url": "fork-join-variable-access"
        },
        {
          "name": "Async",
          "url": "async"
        },
        {
          "name": "Lock",
          "url": "locks"
        }
      ]
    },
    {
      "title": "Functions",
      "column": 1,
      "samples": [
        {
          "name": "Function Pointers",
          "url": "function-pointers"
        },
        {
          "name": "Lambda",
          "url": "lambda"
        },
        {
          "name": "Closures",
          "url": "closures"
        },
        {
          "name": "Functional Iteration",
          "url": "functional-iteration"
        }
      ]
    },
    {
      "title": "Transactions",
      "column": 1,
      "samples": [
        {
          "name": "Local Transactions",
          "url": "local-transactions"
        },
        {
          "name": "XA Transactions",
          "url": "xa-transactions"
        },
        {
          "name": "Distributed Transactions",
          "url": "transactions-distributed"
        }
      ]
    },
    {
      "title": "Streams",
      "column": 1,
      "samples": [
        {
          "name": "Streams",
          "url": "streams"
        },
        {
          "name": "Join Mutiple Streams",
          "url": "join-multiple-streams"
        },
        {
          "name": "Temporal Aggregations",
          "url": "temporal-aggregations-and-windows"
        },
        {
          "name": "Identify Patterns",
          "url": "identify-patterns"
        },
        {
          "name": "Identify Trends",
          "url": "identify-trends"
        }
      ]
    },
    {
      "title": "Security",
      "column": 1,
      "samples": [
        {
          "name": "Taint Checking",
          "url": "taint-checking"
        },
        {
          "name": "Secured Service With JWT",
          "url": "secured-service-with-jwt"
        },
        {
          "name": "Secured Service With Basic Auth",
          "url": "secured-service-with-basic-auth"
        },
        {
          "name":"Secured Client With Basic Auth",
          "url": "secured-client-with-basic-auth" 
        },
        {
          "name":"Secured Client With JWT Auth",
          "url": "secured-client-with-jwt-auth"
        },
        {
          "name":"Secured Client With OAuth2",
          "url": "secured-client-with-oauth2"
        }
      ]
    },
    {
      "title": "Swagger ",
      "column": 1,
      "samples": [
        {
          "name": "Client Generation",
          "url": "client-generation"
        },
        {
          "name": "Ballerina To Swagger",
          "url": "ballerina-to-swagger"
        },
        {
          "name": "Swagger To Ballerina",
          "url": "swagger-to-ballerina"
        }
      ]
    },
    {
      "title": "HTTP/HTTPS",
      "column": 2,
      "samples": [
        {
          "name": "Client Endpoint",
          "url": "http-client-endpoint"
        },
        {
          "name": "Redirects",
          "url": "http-redirects"
        },
        {
          "name": "Base Path and Path",
          "url": "base-path-and-path"
        },
        {
          "name": "Query Path Matrix Param",
          "url": "query-path-matrix-param"
        },
        {
          "name": "Restrict By Media Type",
          "url": "restrict-by-media-type"
        },
        {
          "name": "HTTP Caching",
          "url": "http-caching-client"
        },
        {
          "name": "Disable Chunking",
          "url": "http-disable-chunking"
        },
        {
          "name": "Trace Logs",
          "url": "http-trace-logs"
        },
        {
          "name": "Basic HTTPS Listener Client",
          "url": "basic-https-listener-client"
        },
        {
          "name": "HTTPS Listener",
          "url": "https-listener"
        },
        {
          "name": "Mutual SSL",
          "url": "mutual-ssl"
        },
        {
          "name": "Request With Multiparts",
          "url": "request-with-multiparts"
        },
        {
          "name": "Response With Multiparts",
          "url": "response-with-multiparts"
        },
        {
          "name": "CORS",
          "url": "http-cors"
        },
        {
          "name": "Access Logs",
          "url": "http-access-logs"
        },
        {
          "name": "Data Binding",
          "url": "http-data-binding"
        },
        {
          "name": "100 Continue",
          "url": "http-100-continue"
        },
        {
          "name": "Handling Different Payload Types",
          "url": "different-payload-types"
        },
        {
          "name": "HTTP Streaming",
          "url": "http-streaming"
        }
      ]
    },
    {
      "title": "HTTP2",
      "column": 2,
      "samples": [
        {
          "name": "HTTP 1.1 to 2.0 Protocol Switch",
          "url": "http-1.1-to-2.0-protocol-switch"
        },
        {
          "name": "HTTP 2.0 Server Push",
          "url": "http-2.0-server-push"
        }
      ]
    },
    {
      "title": "WebSockets ",
      "column": 2,
      "samples": [
        {
          "name": "WebSocket Basic Example",
          "url": "websocket-basic-sample"
        },
        {
          "name": "HTTP To WebSocket Upgrade",
          "url": "http-to-websocket-upgrade"
        },
        {
          "name": "WebSocket Proxy Server",
          "url": "websocket-proxy-server"
        },
        {
          "name": "WebSocket Chat Application",
          "url": "websocket-chat-application"
        }
      ]
    },
    {
      "title": "Routing",
      "column": 2,
      "samples": [
        {
          "name": "Header-Based Routing",
          "url": "header-based-routing"
        },
        {
          "name": "Passthrough",
          "url": "passthrough"
        },
        {
          "name": "Content-Based Routing",
          "url": "content-based-routing"
        }
      ]
    },
    {
      "title": "Resiliency",
      "column": 2,
      "samples": [
        {
          "name": "Circuit Breaker",
          "url": "http-circuit-breaker"
        },
        {
          "name": "Load Balancing",
          "url": "http-load-balancer"
        },
        {
          "name": "Failover",
          "url": "http-failover"
        },
        {
          "name": "Retry",
          "url": "http-retry"
        }
      ]
    },
    {
      "title": "gRPC",
      "column": 2,
      "samples": [
        {
          "name": "Unary Blocking",
          "url": "grpc-unary-blocking"
        },
        {
          "name": "Unary Non-Blocking",
          "url": "grpc-unary-non-blocking"
        },
        {
          "name": "Server Streaming",
          "url": "grpc-server-streaming"
        },
        {
          "name": "Client Streaming",
          "url": "grpc-client-streaming"
        },
        {
          "name": "Bidirectional Streaming",
          "url": "grpc-bidirectional-streaming"
        },
        {
          "name": "Secured Unary",
          "url": "grpc-secured-unary"
        },
        {
          "name": "Proto To Ballerina",
          "url": "proto-to-ballerina"
        }
      ]
    },
    {
      "title": "WebSub",
      "column": 2,
      "samples": [
        {
          "name": "WebSub Internal Hub Sample",
          "url": "websub-internal-hub-sample"
        },
        {
          "name": "WebSub Remote Hub Sample",
          "url": "websub-remote-hub-sample"
        },
        {
          "name": "WebSub Hub Client Sample",
          "url": "websub-hub-client-sample"
        },
        {
          "name": "WebSub Service Integration Sample",
          "url": "websub-service-integration-sample"
        }
      ]
    },
    {
      "title": "I/O",
      "column": 3,
      "samples": [
        {
          "name": "Byte I/O",
          "url": "byte-io"
        },
        {
          "name": "Character I/O",
          "url": "character-io"
        },
        {
          "name": "Record I/O",
          "url": "record-io"
        },
        {
          "name": "CSV I/O",
          "url": "csv-io"
        },
        {
          "name": "JSON I/O",
          "url": "json-io"
        },
        {
          "name": "XML I/O",
          "url": "xml-io"
        }
      ]
    },
    {
      "title": "Database",
      "column": 3,
      "samples": [
        {
          "name": "JDBC Client",
          "url": "jdbc-client"
        },
        {
          "name": "H2 Client",
          "url": "h2-client"
        },
        {
          "name": "MySQL Client",
          "url": "mysql-client"
        }
      ]
    },
    {
      "title": "Common Libraries",
      "column": 3,
      "samples": [
        {
          "name": "Date Time",
          "url": "date-time"
        },
        {
          "name": "Caching",
          "url": "cache"
        },
        {
          "name": "Config ",
          "url": "config-api"
        },
        {
          "name": "Log ",
          "url": "log-api"
        },
        {
          "name": "Math",
          "url": "math-functions"
        },
        {
          "name": "String ",
          "url": "strings"
        },
        {
          "name": "XML/JSON Conversion",
          "url": "xml-to-json-conversion"
        }
      ]
    },
    {
      "title": "Task",
      "column": 3,
      "samples": [
        {
          "name": "Task Timer",
          "url": "task-timer"
        },
        {
          "name": "Task Appointment",
          "url": "task-appointment"
        }
      ]
    },
    {
      "title": "Message Broker",
      "column": 3,
      "samples": [
        {
          "name": "MB Simple Queue Receiver",
          "url": "mb-simple-queue-message-receiver"
        },
        {
          "name": "MB Simple Queue Producer",
          "url": "mb-simple-queue-message-producer"
        },
        {
          "name": "MB Simple Topic Subscriber",
          "url": "mb-simple-topic-message-subscriber"
        },
        {
          "name": "MB Simple Topic Publisher",
          "url": "mb-simple-topic-message-publisher"
        },
        {
          "name": "MB Simple Durable Topic Subscriber",
          "url": "mb-simple-durable-topic-message-subscriber"
        }
      ]
    },
    {
      "title": "JMS",
      "column": 3,
      "samples": [
        {
          "name": "Simple Queue Receiver",
          "url": "jms-simple-queue-message-receiver"
        },
        {
          "name": "Simple Queue Producer",
          "url": "jms-simple-queue-message-producer"
        },
        {
          "name": "Simple Topic Subscriber",
          "url": "jms-simple-topic-message-subscriber"
        },
        {
          "name": "Simple Topic Producer",
          "url": "jms-simple-topic-message-producer"
        },
        {
          "name": "Simple Durable Topic Subscriber",
          "url": "jms-durable-topic-message-subscriber"
        },
        {
          "name": "Queue Receiver",
          "url": "jms-queue-message-receiver"
        },
        {
          "name": "Queue Producer",
          "url": "jms-queue-message-producer"
        },
        {
          "name": "Topic Subscriber",
          "url": "jms-topic-message-subscriber"
        },
        {
          "name": "Topic Producer",
          "url": "jms-topic-message-producer"
        },
        {
          "name": "Synchronous Queue Receiver",
          "url": "jms-synchronous-queue-message-receiver"
        },
        {
          "name": "Queue Receiver with Client Acknowledgment",
          "url": "jms-queue-message-receiver-with-client-acknowledgment"
        },
        {
          "name": "Durable Topic Subscriber",
          "url": "jms-simple-durable-topic-message-subscriber"
        },
        {
          "name": "Transactional Queue Producer",
          "url": "transactional-queue-message-producer"
        },
        {
          "name": "JMS Headers and Properties",
          "url": "jms-headers-and-properties"
        },
        {
          "name": "Send JMS Message to HTTP Endpoint",
          "url": "send-jms-message-to-http-endpoint"
        }
      ]
    },
    {
      "title": "Listeners",
      "column": 3,
      "samples": [
        {
          "name": "Directory Listener",
          "url": "directory-listener"
        }
      ]
    },
    {
      "title": "Observability",
      "column": 3,
      "samples": [
        {
          "name": "Distributed Tracing",
          "url": "tracing"
        },
        {
          "name": "Counter-Based Metrics",
          "url": "counter-metrics"
        },
        {
          "name": "Gauge-Based Metrics",
          "url": "gauge-metrics"
        }
      ]
    }
  ]
  ;

export function render (langClient: ExtendedLangClient, resourceRoot: Uri)
        : Thenable<string | undefined> {       
    return Promise.resolve(renderSamples(resourceRoot));
}

function renderSamples(resourceRoot: Uri): string {
    const page = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <link rel="stylesheet" href="${resourceRoot.toString()}/bundle.css" />
        <link rel="stylesheet" href="${resourceRoot.toString()}/theme.css" />
        <link rel="stylesheet" href="${resourceRoot.toString()}/less.css" />
    </head>
    <body>
        <div id="samples" />
    </body>
    <script charset="UTF-8" src="${resourceRoot.toString()}/ballerina-diagram-library.js"></script>
    <script>
        (function() {
            const vscode = acquireVsCodeApi();
            const samples = ${JSON.stringify(samples)};
            function openSample(url) {
                vscode.postMessage({
                    command: 'openSample',
                    url: JSON.stringify(url)
                });
            }
            ballerinaDiagram.renderSamplesList(document.getElementById("samples"), samples, openSample, () => {});
        }());
    </script>
    </html>
    `;

    return page;
}