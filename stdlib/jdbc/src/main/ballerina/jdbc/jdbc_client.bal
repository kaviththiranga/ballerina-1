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

# Represents the base JDBC Client
public type JdbcClient client object {

    # The call remote function implementation for JDBC client to invoke stored procedures/functions.
    #
    # + sqlQuery - The SQL stored procedure to execute
    # + recordType - Array of record types of the returned tables if there is any
    # + parameters - The parameters to be passed to the procedure/function call. The number of parameters is variable
    # + return - A `table[]` if there are tables returned by the call remote function and else nil,
    #            `JdbcClientError` will be returned if there is any error
    public remote function call(@untainted string sqlQuery, typedesc[]? recordType, Param... parameters)
        returns @tainted table<record {}>[]|()|JdbcClientError {
        return nativeCall(self, sqlQuery, recordType, ...parameters);
    }

    # The select remote function implementation for JDBC Client to select data from tables.
    #
    # + sqlQuery - SQL query to execute
    # + recordType - Type of the returned table
    # + parameters - The parameters to be passed to the select query. The number of parameters is variable
    # + return - A `table` returned by the sql query statement else `JdbcClientError` will be returned if there
    # is any error
    public remote function select(@untainted string sqlQuery, typedesc? recordType,
    Param... parameters) returns @tainted table<record {}>|JdbcClientError {
        return nativeSelect(self, sqlQuery, recordType, ...parameters);
    }

    # The update remote function implementation for JDBC Client to update data and schema of the database.
    #
    # + sqlQuery - SQL statement to execute
    # + keyColumns - Names of auto generated columns for which the auto generated key values are returned
    # + parameters - The parameters to be passed to the update query. The number of parameters is variable
    # + return - A `UpdateResult` with the updated row count and key column values,
    #            else `JdbcClientError` will be returned if there is any error
    public remote function update(@untainted string sqlQuery, string[]? keyColumns = (), Param... parameters)
                               returns UpdateResult|JdbcClientError {
        return nativeUpdate(self, sqlQuery, keyColumns = keyColumns, ...parameters);
    }

    # The batchUpdate remote function implementation for JDBC Client to batch data insert.
    #
    # + sqlQuery - SQL statement to execute
    # + parameters - Variable number of parameter arrays each representing the set of parameters of belonging to each
    #                individual update
    # + return - An `int[]` - The elements in the array returned by the operation may be one of the following  or else
    #            an `JdbcClientError` will be returned if there is any error.
    #            A number greater than or equal to zero - indicates that the command was processed successfully
    #                                                     and is an update count giving the number of rows
    #            A value of -2 - Indicates that the command was processed successfully but that the number of rows affected
    #                            is unknown
    #            A value of -3 - Indicates that the command failed to execute successfully and occurs only if a driver
    #                            continues to process commands after a command fails
    public remote function batchUpdate(@untainted string sqlQuery, Param?[]... parameters)
                                    returns int[]|JdbcClientError {
        return nativeBatchUpdate(self, sqlQuery, ...parameters);
    }
};

function nativeSelect(JdbcClient sqlClient, @untainted string sqlQuery, typedesc? recordType,
   Param... parameters) returns @tainted table<record {}>|JdbcClientError = external;

function nativeCall(JdbcClient sqlClient, @untainted string sqlQuery, typedesc[]? recordType, Param... parameters)
   returns @tainted table<record {}>[]|()|JdbcClientError = external;

function nativeUpdate(JdbcClient sqlClient, @untainted string sqlQuery, string[]? keyColumns = (),
                             Param... parameters) returns UpdateResult|JdbcClientError = external;

function nativeBatchUpdate(JdbcClient sqlClient, @untainted string sqlQuery, Param?[]... parameters)
    returns int[]|JdbcClientError = external;

function createClient(ClientEndpointConfig config, PoolOptions globalPoolOptions) returns JdbcClient = external;

# An internal function used by clients to shutdown the connection pool.
#
# + jdbcClient - The Client object which represents the connection pool.
# + return - Possible error during closing
public function close(JdbcClient jdbcClient) returns error? = external;

