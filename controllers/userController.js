const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

function getSignUp (req,res) {
    res.render("sign-up-form", {errors : null});
}

function getLogin (req, res) {
    res.render("login");
}

async function postSignUp (req,res) {

    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).render("sign-up-form", {
            errors : errors.array(),
            data : req.body,
        });
    }
    const { firstname, lastname, username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);
    await db.createUser(firstname, lastname, username, hashedPassword);
    res.redirect("/");
}

async function getUserList(req, res) {
    const users = await db.getAllUsers();
    
    res.render("index", {users: users});
}

module.exports = {
    getSignUp,
    getUserList,
    getLogin,
    postSignUp
}