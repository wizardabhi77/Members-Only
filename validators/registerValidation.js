const { body } = require("express-validator");
const db = require("../db/queries");

registerValidation = [
    body("firstname")
    .trim()
    .isAlpha()
    .withMessage("firstname should only contain letters"),

    body("lastname")
    .trim()
    .isAlpha()
    .withMessage("lastname should only contain letters"),

    body("username")
    .trim()
    .isLength({min: 4})
    .withMessage("username should atleast contain 4 letters")
    .custom (async (value) => {
        const user = await db.findUser(value);
        if(user){
            throw new Error("Username already exists");
        }
        return true;
    }),

    body("password")
    .trim()
    .isLength({min: 6})
    .withMessage("password should alteast contain 6 letters"),

    body("confirm-password")
    .trim()
    .isLength({min: 6})
    .withMessage("confirm password should alteast contain 6 letters")
    .custom ( async (value, {req}) => {
        if(value !== req.body.password){
            throw new Error("passwords do not match");
        }
        return true;
    })
]

module.exports = registerValidation;