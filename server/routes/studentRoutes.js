var express = require('express');
var router = express.Router();
var student = require('../controller/studentController')
var authMiddleware = require('../middleware/authMiddleware')
var multer = require('multer');
var path = require('path');

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "public/Images");
    },
    filename: (req, file, cb) => {
        cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({ storage });

router.post('/studentUpload', authMiddleware, student.studentUpload);
router.post('/student/uploadPic/:id', authMiddleware, upload.single('file'), student.uploadPic);
router.get('/student/deletePic/:id',authMiddleware,student.deletePic);
router.get('/getAllStudent', authMiddleware, student.getAllStudents);
router.get('/singleStudent/:id', authMiddleware, student.getStudentById);
router.get('/searchStudent/:search',authMiddleware,student.searchStudents);
router.post('/updateStudent/:id',authMiddleware,student.updateStudendById);

module.exports = router;