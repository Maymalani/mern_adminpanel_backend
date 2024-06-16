var jwt = require('jsonwebtoken');
var User = require('../model/userModel');

var authMiddleware = async (req,res,next) => {
    var token = req.header('Authorization');

    if(!token){
        return res.status(400).json({message:"Unauthorised HTTP ! Token Not Provided"});
    }

    try {
        const isVerified = await jwt.verify(token,process.env.JWT_SEC_KEY);
        if(isVerified){
            const userData = await User.findOne({email:isVerified.email}).select({password:0});

            req.user = userData;
            token = token;
            req.userId = userData._id
        }
    } catch (error) {
        return res.status(500).json({ error })
    }
    next();
};

module.exports = authMiddleware;