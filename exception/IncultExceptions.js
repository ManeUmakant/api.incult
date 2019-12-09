"use strict";

var exceptionType = {};

exceptionType.PageNotFound = (err, request, response, next)=> {
    return response.status(500).send({ error: new Error(err).stack });
};

exceptionType.InternalServerError = (request, response, next)=> {
    return response.status(404).send({ message: `Route ${request.url} Not found.` });
};

module.exports = exceptionType;
