const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.postLogin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email: email.toLowerCase() });

        if (user && (await bcrypt.compare(password, user.password))) {
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

            return res.status(201).json({
                userDetails: {
                    username: user.username,
                    email: user.email,
                    token: token,
                },
            });
        } else {
            return res
                .status(400)
                .send("Invalid creditials, please try again.");
        }
    } catch (err) {
        return res.status(500).send("Something went wrong. Please try again.");
    }
};
