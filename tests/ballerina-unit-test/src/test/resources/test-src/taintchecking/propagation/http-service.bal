import ballerina/http;

listener http:Listener helloWorldEP = new(9090);

service sample on helloWorldEP {
    @http:ResourceConfig {
        methods:["GET"],
        path:"/path/{foo}"
    }
    resource function params (http:Caller caller, http:Request req, string foo) {
        var bar = req.getQueryParamValue("bar");

        secureFunction(foo, foo);
        secureFunction(bar, bar);
    }
}

public function secureFunction (@sensitive any secureIn, any insecureIn) {

}

