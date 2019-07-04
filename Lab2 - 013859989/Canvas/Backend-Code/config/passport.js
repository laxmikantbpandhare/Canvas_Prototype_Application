'use strict';
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
//var db = require('../app/db');
var Model = require('../DataBaseConnection');
//var config = require('./settings');
const secret = "secret";

// Setup work and export for the JWT passport strategy
module.exports = function (passport) {
    
    var opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    };
    passport.use(new JwtStrategy(opts, function (jwt_payload, callback) {

        Model.Userdetails.findOne({ 
            'sjsuId': jwt_payload.sjsuId 
        }, (err, res) => {

                if (res) {
                    console.log("in passport");
                    var user = res;
                    delete user.Password;
                    callback(null, user);
                }
                else {
                    callback(err, false);
                }
            });
    }));
};