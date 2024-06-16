var Course = require('../model/courseModel');

exports.addCourse = async (req, res) => {
    try {
        const courseData = await Course.create(req.body);
        res.status(200).json(courseData);
    } catch (error) {
        console.log('Error from add course : ', error);
    }
};

exports.getAllCourse = async (req, res) => {
    try {
        const allCourse = await Course.find();
        res.status(200).json(allCourse);
    } catch (error) {
        console.log("Error from fetching course : ", error);
    }
};

exports.getCourse = async (req, res) => {
    try {
        var id = req.params.id;
        const singleCourse = await Course.findOne({ _id: id });
        res.status(200).json(singleCourse)
    } catch (error) {
        console.log("Error from get course : ", error);
    }
}

exports.updateCourse = async (req, res) => {
    try {
        var id = req.params.id;
        const updatedCourseData = await Course.findByIdAndUpdate({ _id:id }, { $set: req.body });
        res.status(200).json(updatedCourseData);
    } catch (error) {
        console.log("Error from updating course : ", error);
    }
};

exports.updateContentStatus = async (req,res) => {
    try {
        const course = req.params.course;
        const updateCourseContentStatus = await Course.findOneAndUpdate({course:course},{...req.body});
        res.status(200).json(updateCourseContentStatus)
    } catch (error) {
        console.log("Error From updating course content status : ",error);
    }
}

exports.deleteCourse = async (req, res) => {
    try {
        var id = req.params.id;
        const deleted = await Course.findByIdAndDelete({ _id: id });
        res.status(200).json(deleted)
    } catch (error) {
        console.log("Error from deleting course : ", error);
    }
}

exports.withoutContentCourse = async (req,res) => {
    try {
        const course = await Course.find({contentStatus:"0"});
        res.status(200).json(course)
    } catch (error) {
        console.log("Error from fetching without content course : ",error);
    }
}