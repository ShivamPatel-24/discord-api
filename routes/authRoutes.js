const express = require("express");
const router = express.Router();
const authController = require("../controllers/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});
const auth = require("../middleware/auth");

const registerSchema = Joi.object({
    username: Joi.string().min(3).max(12).required(),
    password: Joi.string()
        .min(6)
        .max(15)
        // .pattern(new RegExp("^[a-zA-Z0-9]{3,30}$"))
        .required(),
    // repeat_password: Joi.ref("password"),
    email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(15).required(),
});

router.post(
    "/register",
    validator.body(registerSchema),
    authController.controllers.postRegister
);
router.post(
    "/login",
    validator.body(loginSchema),
    authController.controllers.postLogin
);

// Test route to verify token
router.get("/test", auth, (req, res) => {
    res.send("request passed");
});

module.exports = router;
