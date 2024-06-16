var { Schema , model } = require('mongoose');

var courseContentSchema = new Schema({
    course:{
        type:String,
    },
    courseContents:{
        type:String,
        default:""
    },
    fees:{
        type:String,
        default:""
    },
    duration:{
        type:String,
        default:""
    }
});

const CourseContent = new model('CourseContent',courseContentSchema);

module.exports = CourseContent;