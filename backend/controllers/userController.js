const userModel = require('../models/userModel');
const bcrypt = require("bcrypt");

exports.getUsers = async (req, res) => {
    try {
        const users = await userModel.find({});
        if (!users) {
            return res.status(400).send({
                message: "No users found"
            })
        }
        if (users) {
            return res.status(200).send({
                user_count: users.length,
                users,
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send({
            message: 'Error getting all users',
            error: error,
        })
    }
}

exports.getUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findById(id);
        if (!user) {
            return res.status(400).send({
                message: "User not found",
            })
        }
        if (user) {
            return res.status(200).send({
                user,
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).end({
            message: 'Error getting user',
            error: error,
        })
    }
}

exports.newUser = async (req, res) => {
    try {
        const {firstName, lastName, email, role, location, password, active} = req.body;
        if (!firstName || !lastName || !email || !role || !location || !password) {
            return res.status(400).send({
                message: "All fields required",
            })
        }
        const existingUser = await userModel.findOne({email})
        if (existingUser) {
            return res.status(400).send({error: 'User already exists'});
        }
        const hashedPassword = await bcrypt.hash(password, 14)
        const user = new userModel({firstName, lastName, email, role, location, password: hashedPassword, active});
        await user.save();
        return res.status(200).send({
            message: "User saved successfully",
            user,
        })
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: 'Error saving user',
            error: error,
        })
    }
}

exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "Email & Password are required"
            })
        }

        const user = await userModel.findOne({email})
        if (!user) {
            return res.send({
                message: "User not registered",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.send({
                message: 'Credentials do not match'
            })
        }

        return res.send({
            message: 'Successful login',
        })

    } catch (error) {
        return res.status(500).send({
            message: "logging in a user callback error.",
            error: 'Login failed'
        })
    }
}

exports.updateUser = async (req, res) => {
    try {
        const {id} = req.params;
        const {firstName, lastName, email, role, location, active} = req.body;
        const user = await userModel.findByIdAndUpdate(id, req.body, {new: true});
        if (!user) {
            return res.status(400).send({
                message: "User wasn't found"
            })
        } else {
            return res.status(200).send({
                message: "User saved successfully",
                user,
            })
        }
    } catch (error) {
        console.error(error)
        return res.status(500).send({
            message: "Error updating user",
            error: error,
        })
    }
}

exports.deleteUser = async (req, res) => {
    try {
        const {id} = req.params;
        const user = await userModel.findByIdAndDelete(id);
        if (!user) {
            return res.status(400).send({
                message: "User not found",
            })
        } else {
            return res.status(200).send({
                message: "User deleted successfully",
            })
        }
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: 'Error deleting user',
            error: error,
        })
    }
}


/*exports.login = async (req, res) => {
    try {
        const {email, password} = req.body;
        if (!email || !password) {
            return res.status(400).send({
                message: "Both fields are required",
            })
        }
        const user = await userModel.findOne({email});
        if (!user) {
            return res.status(400).send({
                message: "User is not registered",
            })
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).send({
                message: "Credentials do not match",
            })
        }
        return res.status(200).send({
            message: `user is logged in.`,
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).send({
            message: "Error: callback error",
            error: error,
        })
    }
}*/
