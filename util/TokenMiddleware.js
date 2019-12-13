"use strict";
let jwt = require('jsonwebtoken');
const config = require('../config/config');

class TokenMiddleware {

  static checkToken(req, res, next) {

    let token = req.headers['x-access-token'] || req.headers['authorization'];
    if (token && token.startsWith('Bearer ')) token = token.slice(7, token.length);
    if (token) {
      jwt.verify(token, config.auth.jwdSecret, (err, decoded) => {
        if (err) {
          return res.status(400).json({
            success: false,
            message: 'Token is not valid'
          });
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      return res.status(400).json({
        success: false,
        message: 'Auth token is not supplied'
      });
    }
  }

  static generateToken(number) {
    return jwt.sign({number: number}, config.auth.jwdSecret,{ expiresIn: config.auth.tokenExpiry});             
  }

}

module.exports = TokenMiddleware;
