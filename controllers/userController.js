const db = require("../db/queries");
const { validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
require("dotenv").config();

function getSignUp (req,res) {
    res.render("sign-up-form", {errors : null});
}

function getLogin (req, res) {
    res.render("login");
}

function getMembers (req, res) {
    res.render("members");
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
    const members = await db.getAllMembers();
    const membership = req.user.membership;
    
    res.render("index", {users: users, membership : membership, members : members});
}

async function postMembers(req, res) {
    
    const id = req.user.id;

    const code = req.body.secret;
   
    if(code === process.env.PASSCODE){
        console.log("true");
        await db.setMemberShip(id);
        req.user.membership = 'member';
        return res.redirect("/home");
    }
    
   return res.status(403).send("WRONG SECRET CODE");

}

module.exports = {
    getSignUp,
    getUserList,
    getLogin,
    getMembers,
    postMembers,
    postSignUp
}