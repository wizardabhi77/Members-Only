
const pool = require("./pool");

async function createUser(firstname,lastname, username, password) {
    await pool.query("insert into users (firstname,lastname, username, password) values ( $1, $2, $3, $4)",[firstname,lastname,username,password]);

}

async function getAllUsers(){
    const { rows } = await pool.query("select username from users");
    return rows;
}

async function findUser(username) {
    const { rows } = await pool.query("select username from users where username = $1",[username]);
    return rows[0];
}

module.exports = {
    createUser,
    getAllUsers,
    findUser
}