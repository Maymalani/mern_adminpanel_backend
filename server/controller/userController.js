var User = require('../model/userModel');
var bcrypt = require('bcryptjs');

exports.register = async (req, res) => {
    try {
        var userExist = await User.findOne({ email: req.body.email });

        if (userExist) {
            res.status(400).json({ message: "User Exists ! Try Again" });
            return;
        }

        var userData = await User.create(req.body);
        res.status(200).json({ userData });
    } catch (error) {
        res.status(500).json({ error })
    }
};

exports.login = async (req, res) => {
    try {
        var user = await User.findOne({ email: req.body.email });
        if (!user) {
            res.status(400).json({ message: "Invalid Credential" });
            return;
        }

        var isVerified = await bcrypt.compare(req.body.password, user.password)

        if (isVerified) {
            res.status(200).json({ user, token: await user.genToken(), userId: user._id });
        }

    } catch (error) {
        res.status(500).json({ error })
    }
};

exports.user = async (req, res) => {
    try {
        const userData = req.user;
        res.status(200).json({ userData });
    } catch (error) {
        console.log(`Error From User Routes ${error}`);
    }
}

exports.allUser = async (req, res) => {
    try {
        const allUserData = await User.find().select({ password: 0 });
        res.status(200).json(allUserData);
    } catch (error) {
        console.log(`Error from fetching all users`);
    }
}

exports.getUser = async (req, res) => {
    try {
        var id = req.params.id;
        const user = await User.find({ _id: id });
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error from fetching single user`);
    }
}

exports.updateUser = async (req, res) => {
    try {
        var id = req.params.id;

        const user = await User.findByIdAndUpdate({ _id: id }, { $set: req.body });
        console.log(user);
        res.status(200).json(user);
    } catch (error) {
        console.log(`Error from updating single user`);
    }
}

exports.deleteUser = async (req,res) => {
    try {
        var id = req.params.id;
        const deletedUser = await User.findByIdAndDelete({_id:id});
        res.status(200).json({message:"User Deleted",deletedUser})
    } catch (error) {
        console.log("Error From deleting single user");
    }
}