
const { Router } = require("express");
const userController = require("../controllers/userController");
const registerValidation = require("../validators/registerValidation");
const passport = require("../passport");

const userRouter = Router();

userRouter.get("/",userController.getLogin);

userRouter.post("/login",
    passport.authenticate("local",{
        successRedirect: "/home",
        failureRedirect: "/"
    }));

function isAuthenticated(req, res, next) {
    if(req.isAuthenticated()) return next();
    res.redirect("/");
}

userRouter.get("/home", isAuthenticated, userController.getUserList);

userRouter.get("/sign-up", userController.getSignUp);

userRouter.get("/members", isAuthenticated, userController.getMembers);



userRouter.post("/sign-up",registerValidation,userController.postSignUp);
userRouter.post("/members", userController.postMembers);

module.exports = userRouter;