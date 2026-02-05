
const db = require("./db/queries");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcryptjs");

passport.use( new LocalStrategy( async (username, password, done) => {

    const user = await db.findUser(username);
    console.log(user);
    if(!user) {
       return done(null, false, {message: "user not found"});
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    if(!isMatch) {
        return done(null, false, {message: "password does not match"});
    }

    return done(null, user);
}))

passport.serializeUser((user,done) => {
    return done(null, user.id);
})

passport.deserializeUser(async (id, done) => {

    const user = await db.findUserById(id);

    return done(null, user);
});

module.exports = passport;

