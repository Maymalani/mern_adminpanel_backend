var express = require('express');
var router = express.Router();
var courseContent = require('../controller/courseContentController');
var { courseContentSchema } = require('../validator/validate');
var validator = require("../middleware/validateMiddleware");
var authMiddleware = require('../middleware/authMiddleware');

router.get('/getAllCourseContent',authMiddleware,courseContent.getAllCourseContent);
router.get('/getCourseContent/:id',authMiddleware,courseContent.getCourseContent);
router.post('/updateCourseContent/:id',authMiddleware,validator(courseContentSchema),courseContent.upadateCourseContent)
router.post('/addCourseContent/:id',authMiddleware,validator(courseContentSchema),courseContent.addCourseContent);
router.post('/deleteCourseContent/:id',authMiddleware,courseContent.deleteCourseContent);

module.exports = router;