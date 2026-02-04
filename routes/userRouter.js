
const { Router } = require("express");
const userController = require("../controllers/userController");
const registerValidation = require("../validators/registerValidation");

const userRouter = Router();

userRouter.get("/",userController.getLogin)

userRouter.get("/home", userController.getUserList);

userRouter.get("/sign-up",userController.getSignUp);



userRouter.post("/sign-up",registerValidation,userController.postSignUp);

module.exports = userRouter;