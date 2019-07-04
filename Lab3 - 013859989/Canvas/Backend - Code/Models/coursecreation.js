const mongoose = require("mongoose");
var Schema = mongoose.Schema;

var course_details =new Schema({

    'courseid' : {
        type: String
    },
    'coursename' : {
        type: String
    },
    'coursedept' : {
        type: String
    },
    'coursedesc' : {
        type : String
    },
    'courseroom' : {
        type : String
    },  
    'coursecapacity' : {
        type: String
    },
    'coursewaitlist' : {
        type : String
    },
    'courseterm' : {
        type : String
    }

});

module.exports = mongoose.model("course_details", course_details);
