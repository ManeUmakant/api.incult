"use strict";

const app = require('express')();
const PORT = process.env.PORT || 8081;
const AuthRouter = require('./resources/auth/AuthResource');


app.use('', AuthRouter);


app.listen(PORT, ()=>console.log(`Server running on http://127.0.0.1:${PORT}`));



