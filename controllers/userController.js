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

function getMessages (req, res) {
    res.render("message-form");
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
    const messages = await db.getAllMessages();
    
    const membership = req.user.membership;
    
    res.render("index", {
        users: users, 
        membership : membership, 
        members : members, 
        messages : messages
    });
}

async function postMembers(req, res) {
    
    const id = req.user.id;

    const code = req.body.secret;
   
    if(code === process.env.PASSCODE){
        
        await db.setMemberShip(id);
        req.user.membership = 'member';
        return res.redirect("/home");
    }
    else if(code === 'dattaisgay'){
        
        await db.setAdmin(id);
        req.user.membership = 'admin';
        return res.redirect("/home");
    }
    
   return res.status(403).send("WRONG SECRET CODE");

}

async function postMessages(req, res) {
    
    const uid = req.user.id;
    
    const { title, message } = req.body;
    
    await db.postMessages(title, message, uid);

    res.redirect("/home");
}

async function deleteMessages (req, res) {

    const mid = req.params.mid;
    

    await db.deleteMessage(mid);

    res.redirect("/home");
}

async function logout (req, res, next) {

    req.logout(function (error) {
        if(error){
            return next(err);
        }
        res.redirect("/");
    })
}



module.exports = {
    getSignUp,
    getUserList,
    getLogin,
    getMembers,
    getMessages,
    postMembers,
    postMessages,
    deleteMessages,
    postSignUp,
    logout
}