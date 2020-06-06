const mysql = require('mysql');
const AWS = require('aws-sdk');
const constants = require("./constants");
const secretName = process.env.SECRETE;
const lambda = new AWS.Lambda();
const helper = require("./helper");

// Create a Secrets Manager client
const client = new AWS.SecretsManager();
const secret = client.getSecretValue({
    SecretId: secretName
}).promise();

let con;
let d = new Date();
exports.handler = async (event) => {
    if (!con || con.state == "disconnected" || con === "undefined") {
        await secret;
        con = secret
            .then((result) => {
                var data = JSON.parse(result.SecretString);
                var connection = mysql.createConnection(
                    {
                        "host": data.lims_host,
                        "user": data.lims_user,
                        "password": data.lims_password,
                        "database": data.lims_db
                    }
                );
                connection.connect();
                return connection;
            }).catch((err) => {
                throw err;
            });
    }
    try {
        con = await con;
    } catch (e) {
        return await response(200, 0, "error while fetching connection", null, new Error("error while fetching connection"));
    }
    // Check Method
    let userId = 0;
    const method = event.httpMethod;

    //Auth method
    let headers = event["headers"] ? (event["headers"]) : {};
    try {
        var auth = await invokeFunction("userAuth", headers);
        var authBody = JSON.parse(auth.body);
        const { status, err } = authBody;
        if (!status) {
            return await response(401, 0, "Authentication failure!", null, err);
        } else {
            const { data: { user: { id } } } = authBody;
            userId = id;
        }
    } catch (e) {
        return await response(500, 0, "Authentication Error!", null, new Error("Authentiaction Error!"));
    }

    if (method === 'GET') {
        let getQuery = "";
        getQuery = event['queryStringParameters'] ? event['queryStringParameters'] : {};

        let errors = [];
        if (errors.length) {
            return await response(
                constants.HTTP_STATUS.success,
                0,
                "You are missing something",
                null,
                errors
            );
        }
        // Fetching notes acoording to user_id
        try {
            let noteData = await getNotes(con, userId);
            return await response(
                constants.HTTP_STATUS.success,
                1,
                "To do listing",
                noteData,
                null
            );

        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while fetching to do list", null, error);
        }
    } else if (method === 'DELETE') {
        let deleteQuery = "";

        // delete notes
        deleteQuery = event['body'] ? JSON.parse(event['body']) : {};

        //  Check Validation
        let errors = [];
        if (!deleteQuery.id || deleteQuery.id <= 0) {
            errors.push("Id is missing");
        }
        if (errors.length) {
            return await response(
                constants.HTTP_STATUS.success,
                0,
                "You are missing something",
                null,
                errors
            );
        }

        // Check Is Id exist Valid
        try {
            let isIdValids = await isIdValid(con, deleteQuery.id);
            if (!isIdValids.length) {
                return await response(constants.HTTP_STATUS.success, 0, "Id does not exists", null, null);
            }
        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while deleting", null, error);
        }

        await deleteNotes(con, deleteQuery);
        return await response(
            constants.HTTP_STATUS.success,
            1,
            "Note is deleted!",
            [],
            null
        );
    } else if (method === 'POST') {
        let postQuery = "";

        // create notes
        postQuery = event['body'] ? JSON.parse(event['body']) : {};
        postQuery.user_id = userId;

        //  Check Validation
        let errors = [];
        if (!postQuery.user_id || postQuery.user_id <= 0) {
            errors.push("user id is missing");
        } if (!postQuery.notes || postQuery.notes <= 0) {
            errors.push("notes is missing");
        }
        if (!postQuery.time || postQuery.time <= 0) {
            errors.push("time is missing");
        }
        if (errors.length) {
            return await response(
                constants.HTTP_STATUS.success,
                0,
                "You are missing something",
                null,
                errors
            );
        }

        // Creating note
        try {
            let cnote = {
                user_id: postQuery.user_id,
                notes: postQuery.notes,
                done: postQuery.done ? postQuery.done : 0,
                time: postQuery.time,
                added_on: helper.formatDate(d),
                updated_on: helper.formatDate(d)
            };

            let noteid = await createNote(con, cnote);
            cnote['insertId'] = noteid.insertId;
            return await response(constants.HTTP_STATUS.success, 1, "note added", cnote, null);
        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while adding note", null, error);
        }
    } else if (method === 'PUT') {
        // Update notes
        let putQuery = "";

        try {
            putQuery = event['body'] ? JSON.parse(event['body']) : {};
        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while passing parameters", [], error.message);
        }

        let errors = [];
        if (!putQuery.id || putQuery.id <= 0) {
            errors.push("id is missing");
        }
        if (errors.length) {
            return await response(
                constants.HTTP_STATUS.success,
                0,
                "You are missing something",
                null,
                errors
            );
        }

        try {
            let isIdValids = await isIdValid(con, putQuery.id);
            if (!isIdValids.length) {
                return await response(constants.HTTP_STATUS.success, 0, "Id does not exists", [], null);
            }
        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while matching id", null, error);
        }

        try {
            let updateData = {
                id: putQuery.id,
                notes: putQuery.notes,
                time: putQuery.time,
                done: putQuery.done,
                updated_on: helper.formatDate(d)
            };
            await updateNotes(con, updateData);
            return await response(constants.HTTP_STATUS.success, 1, "Note updated!", [], null);
        } catch (error) {
            return await response(constants.HTTP_STATUS.error, 0, "Error while updating note", [], error.message);
        }
    } else {
        return await response(
            constants.HTTP_STATUS.success,
            1,
            "Undefined-Method!", method,
            [],
            null
        );
    }
};

async function getNotes(con, uid = 0) {
    return new Promise(
        function (resolve, reject) {
            let query = `
                SELECT
                    c.id,
                    c.notes,
                    c.time,
                    c.done,
                   DATE_FORMAT(c.added_on, "%d-%m-%Y") as added_on ,
                    c.updated_on,
                    u.name as user_name,
                    u.id as user_id
                FROM
                    ${constants.DB.USER_NOTES} c
                INNER JOIN ${constants.DB.USER} u on u.id = c.user_id
                WHERE c.user_id='${uid}'`;
            con.query(query, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });
        }
    );
}

async function isIdValid(con, id = 0) {
    return new Promise(
        function (resolve, reject) {
            let q = `SELECT 
                    id
                    FROM ${constants.DB.USER_NOTES}
                    WHERE id='${id}'  limit 1`;
            con.query(q, function (err, rows) {
                if (err) {
                    reject(err);
                } else {
                    resolve(rows);
                }
            });

        }
    );
}

async function createNote(con, params = []) {
    return new Promise(
        function (resolve, reject) {
            con
                .query(
                    ` INSERT INTO ${constants.DB.USER_NOTES} SET ?
                    `, [params],
                    function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
        }
    );
}
async function updateNotes(con, params = []) {
    return new Promise(
        function (resolve, reject) {
            con
                .query(
                    ` UPDATE ${constants.DB.USER_NOTES} SET ? WHERE id='${params.id}'
                    `, [params],
                    function (err, data) {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
        }
    );
}
async function deleteNotes(con, params = []) {
    return new Promise(
        function (resolve, reject) {
            let q = con
                .query(
                    ` DELETE FROM ${constants.DB.USER_NOTES} WHERE id='${params.id}'
            `,
                    function (err, data) {
                        console.log(q.sql);
                        if (err) {
                            reject(err);
                        } else {
                            resolve(data);
                        }
                    }
                );
        }
    );
}

// promise function to invoke other lambda function 
async function invokeFunction(functionName = "", payload = {}) {
    const lambdaParams = {
        FunctionName: functionName,
        Payload: JSON.stringify(payload)
    };
    return new Promise(
        function (resolve, reject) {
            lambda
                .invoke(
                    lambdaParams,
                    async function (err, authData) {
                        if (err) {
                            reject(await response(0, "error in auth!", null, err));
                        } else {
                            resolve(JSON.parse(authData.Payload));
                        }
                    }
                );
        }
    );
}

async function response(statusCode = 200, status = 0, msg = "Command executed", data = {}, err = {}, mobile_msg = "") {
    return new Promise(
        function (resolve, reject) {
            let r = {
                "status": Number(status),
                "msg": msg,
                "mobile_msg": mobile_msg != "" ? mobile_msg : msg,
                "data": data,
                "err": err
            };

            let response = {
                "statusCode": statusCode,
                "headers": {},
                "body": JSON.stringify(r),
                "isBase64Encoded": false
            };
            resolve(response);
        }
    );
}
