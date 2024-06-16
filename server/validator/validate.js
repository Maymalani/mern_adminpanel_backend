var { z } = require('zod');

var loginSchema = z.object({
    email: z.string({ required_error: "Email Required" }).email({ message: "Invalid Email Address" }).trim().min(3, { message: "Email Should be 3 char" }),
    password: z.string({ required_error: "Password Required" }).min(3, { message: "Password must have 3 char" })
})

var signUpSchema = loginSchema.extend({
    firstname: z.string({ required_error: "firstname Required" }).trim().min(3, { message: "Firstname Should be 3 char" }),
    lastname: z.string({ required_error: "lastname Required" }).trim().min(3, { message: "Lastname Should be 3 char" }),
    phone: z.string({ required_error: "Mobile Number Required" }).trim().min(10, { message: "Mobile Number have minimun 10 digits" }),
});

var updateUserSchema = signUpSchema.extend({
    email: z.string({ required_error: "Email Required" }).email({ message: "Invalid Email Address" }).trim().min(3, { message: "Email Should be 3 char" })
})

var courseContentSchema = z.object({
    course: z.string({ required_error: "Select Course" }).min(3,{message:"Select Course"}),
    courseContents: z.string({ required_error: "Course Content Required" }).trim().min(5, { message: "Course Content have 5 or more char" }),
    fees: z.string({ required_error: "Fees Required" }).trim().min(3, { message: "Enter Fees Completely" }),
    duration: z.string({ required_error: "Course Duration Required" }).trim().min(1, { message: "Fill Course Duration Completely" })
});

var addCourseSchema = z.object({
    addedBy: z.string({ required_error: "" }),
    course: z.string({ required_error: "Course Name Required" }).trim().min(3, { message: "Fill Course Name Completely" })
})



module.exports = { loginSchema, signUpSchema, courseContentSchema, addCourseSchema, updateUserSchema };