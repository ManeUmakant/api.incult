"use strict";

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8081;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/uploads'));

app.use('', require('./resources/index'));

/** PAGE NOT FOUND
 * 404 response config
*/
app.use((request, response, next)=> {
    return response.status(404).send({ message: `Route ${request.url} Not found.` });
});

/** INTERNAL SERVER ERROR
 * 500 response config
*/
app.use((err, request, response, next)=> {
    return response.status(500).send({ error: new Error(err).stack });
});


app.listen(PORT, ()=>console.log(`Server running on http://127.0.0.1:${PORT}`));



