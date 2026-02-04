
const { Router } = require("express");

const userRouter = Router();

userRouter.get("/", (req,res) => {
    res.send("MEMBERS ONLY");
})

module.exports = userRouter;