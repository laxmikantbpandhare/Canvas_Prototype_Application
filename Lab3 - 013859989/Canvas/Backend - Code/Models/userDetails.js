
const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var userDetails = new Schema({ 

    'sjsuid' : {
        type: String
    },
    'password' : {
        type: String
    },
    'name' : {
        type: String
    },
    'emailid' : {
        type : String
    },
    'user_flag' : {
        type : String
    }

});

module.exports = mongoose.model("userDetails", userDetails);