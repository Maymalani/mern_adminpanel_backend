var express = require('express');
var router = express.Router();
var user = require('../controller/userController');
var validator = require("../middleware/validateMiddleware");
var { loginSchema, signUpSchema , updateUserSchema } = require('../validator/validate');
var authMiddleware = require('../middleware/authMiddleware');

/* GET users listing. */
router.post('/register', validator(signUpSchema), user.register);
router.post('/login', validator(loginSchema), user.login);
router.get('/user', authMiddleware, user.user);
router.get("/alluser", authMiddleware, user.allUser);
router.get('/getuser/:id', authMiddleware, user.getUser);
router.post('/updateuser/:id', authMiddleware,validator(updateUserSchema), user.updateUser);
router.delete('/deleteuser/:id', authMiddleware, user.deleteUser)


module.exports = router;
