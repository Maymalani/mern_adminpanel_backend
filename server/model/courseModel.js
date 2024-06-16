var { Schema , model } = require('mongoose');

var courseSchema = new Schema({
    addedBy:{
        type:String,
        required:true
    },
    course:{
        type:String,
        required:true
    },
    contentStatus:{
        type:String,
        default:"0"
    }
});

var Course = new model("Course",courseSchema);

module.exports = Course;