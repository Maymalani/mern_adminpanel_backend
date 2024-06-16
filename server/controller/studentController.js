var Student = require('../model/studentModel');

exports.studentUpload = async (req, res) => {
    // console.log("file",req.file);
    // const data = {
    //     ...req.body.student,...req.body.other
    // }
    // console.log("Data",data);
    try {
        // const data = new Student(req.body.student)
        const studentData = await Student.create(req.body);
        res.status(200).json(studentData)
    } catch (error) {
        console.log("Error from adding student : ", error);
    }
};

exports.uploadPic = async (req, res) => {
    try {
        const id = req.params.id;
        console.log(id);
        const image = await Student.findByIdAndUpdate({ _id: id }, { $set: { image: req.file.filename } });
        res.status(200).json(image)
    } catch (error) {
        console.log("Error from uploading images : ", error);
    }
}

exports.deletePic = async (req,res) => {
    try {
        const id = req.params.id;
        const deletedImage = await Student.findByIdAndUpdate({_id:id},{$set : {image : ""}});
        res.status(200).json(deletedImage);
    } catch (error) {
        console.log("Error From deleting Images : ",error);
    }
}

exports.getAllStudents = async (req, res) => {
    try {
        const allStudents = await Student.find();
        res.status(200).json(allStudents);
    } catch (error) {
        console.log("Error from getting all students : ", error);
    }
}

exports.getStudentById = async (req, res) => {
    try {
        const id = req.params.id;
        const singleStudent = await Student.findOne({ _id: id });
        res.status(200).json(singleStudent)
    } catch (error) {
        console.log("Error from get specified student : ", error);
    }
}

exports.searchStudents = async (req, res) => {
    var { search } = req.params;
    try {
        var regex = new RegExp(["^", search, "$"].join(""), "i");
        const searchStudents = await Student.find({ 'studentname': regex });
        res.status(200).json(searchStudents)
    } catch (error) {
        console.log(error);
    }
}

exports.updateStudendById = async (req, res) => {
    var { id } = req.params;
    try {
        const updatedCourse = await Student.findOneAndUpdate({ _id: id }, { $set: req.body });
        res.status(200).json(updatedCourse);
    } catch (error) {
        console.log("Error From Updating STudents : ", error);
    }
}
