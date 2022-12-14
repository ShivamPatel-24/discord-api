const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postRegister = async (req, res) => {
    try {
        const { username, password, email } = req.body;

        // check if email is already registered
        const userExists = await User.findOne({ email: email.toLowerCase() });
        if (userExists) {
            return res.status(409).send("Email already in use.");
        }

        // encrypt the password
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Create user to the database
        const user = await User.create({
            username,
            email: email.toLowerCase(),
            password: encryptedPassword,
        });

        // create JWT token
        const token = jwt.sign(
            {
                email,
                userId: user._id,
            },
            process.env.TOKEN_KEY,
            {
                expiresIn: "24h",
            }
        );

        // sending success response status
        console.log("reaching 201!");
        return res.status(201).send({
            userDetails: {
                username: user.username,
                email: user.email,
                token: token,
            },
        });
    } catch (err) {
        return res.status(500).send("Error Occured, Please Try Again!");
    }
};
