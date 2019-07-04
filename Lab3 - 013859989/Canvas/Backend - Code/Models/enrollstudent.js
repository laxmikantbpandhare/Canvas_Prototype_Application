const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var enroll_students = new Schema({

    'sjsucourseid' : {
        type: String
    },
    'coursedept' : {
        type: String
    },
    'coursename' : {
        type: String
    },
    'sjsuid' : {
        type : String
    },
    'courseid' : {
        type : String
    }
});

module.exports = mongoose.model("enroll_students", enroll_students);