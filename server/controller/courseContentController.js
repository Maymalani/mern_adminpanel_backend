var CourseContent = require('../model/CourseContentModel');

exports.addCourseContent = async (req,res) => {
    try {
        var courseContent = await CourseContent.create(req.body);
        res.status(200).json(courseContent);
    } catch (error) {
        console.log("Error from Adding Course Content");
    }
};

exports.getAllCourseContent = async (req,res) => {
    try {
        var allCourseContent = await CourseContent.find();
        res.status(200).json(allCourseContent)
    } catch (error) {
        console.log("Error from fetching course content : ",error);
    }
}

exports.getCourseContent = async (req,res) => {
    try {
        var id = req.params.id;
        var courseContent = await CourseContent.find({_id:id});
        res.status(200).json(courseContent);
    } catch (error) {
        console.log("Error from getting course content : ",error);
    }
}

exports.upadateCourseContent = async (req,res) => {
    try {
        var id = req.params.id;
        var courseContent = await CourseContent.findByIdAndUpdate({_id:id},{$set:req.body});
        res.status(200).json(courseContent);    
    } catch (error) {
        console.log("Error from deleting course content : ",error);
    }
}

exports.deleteCourseContent = async (req,res) => {
    try {
        var id = req.params.id;
        var deletedContent = await CourseContent.findByIdAndDelete({_id:id});
        res.status(200).json(deletedContent);        
    } catch (error) {
        console.log("Error from deleting Course Content : ",error);
    }
}