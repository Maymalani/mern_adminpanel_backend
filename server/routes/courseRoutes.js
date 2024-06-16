var express = require('express');
var router = express.Router();
var course = require('../controller/courseController');
var authMiddleware = require('../middleware/authMiddleware');
var { addCourseSchema } = require('../validator/validate');
var validator = require("../middleware/validateMiddleware");

router.post('/addCourse',authMiddleware,validator(addCourseSchema),course.addCourse);
router.get('/getAllCourse',authMiddleware,course.getAllCourse);
router.get('/getCourse/:id',authMiddleware,course.getCourse)
router.post('/updateCourse/:id',authMiddleware,validator(addCourseSchema),course.updateCourse);
router.post('/deleteCourse/:id',authMiddleware,course.deleteCourse);
router.post('/updateCourseContentStatus/:course',authMiddleware,course.updateContentStatus);
router.get('/withoutContentCourse',authMiddleware,course.withoutContentCourse)

module.exports = router;