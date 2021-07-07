const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Create new user
exports.create = async (req, res) => {

    // Validate request
    if (!req.body.password) {
        return res.status(400).send({
            message: "User password can not be empty"
        });
    }

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(req.body.password, salt);

    const user = new User({
        id: Math.random().toString(26).slice(2),
        name: req.body.name,
        email: req.body.email,
        password: hashPassword
    });

    user.save().then(data => {
        res.send(data);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while creating the User."
        });
    });
};

//Login a user
exports.login = async (req, res) => {
    const dbUser = await User.findOne({ email: req.body.email });

    const validatePassword = await bcrypt.compare(req.body.password, dbUser.password);
    if (validatePassword) {
        // Create token
        const token = jwt.sign({ _id: dbUser._id, email: dbUser.email }, process.env.TOKEN_SECRET);
        res.header('auth-token', token).send({ success: 1, token: token, user: dbUser });
        res.send(dbUser);
    } else {
        res.status(400).send('Password does not match');
    }
}