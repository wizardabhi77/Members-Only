
const pool = require("./pool");

async function createUser(firstname,lastname, username, password) {
    await pool.query("insert into users (firstname,lastname, username, password) values ( $1, $2, $3, $4)",[firstname,lastname,username,password]);

}

async function getAllUsers(){
    const { rows } = await pool.query("select username from users");
    return rows;
}

async function getAllMembers(){
    const { rows } = await pool.query("select username from users where membership = 'member'");
    return rows;
}

async function findUser(username) {
    const { rows } = await pool.query("select * from users where username = $1",[username]);
    return rows[0];
}

async function findUserById(id){
    const {rows} = await pool.query("select * from users where id = $1", [id]);
    return rows[0];
}

async function setMemberShip(id) {
    console.log(id);
   const result = await pool.query("update users set membership = 'member' where id = $1",[id]);
   console.log(result.rows);
}


module.exports = {
    createUser,
    getAllUsers,
    getAllMembers,
    findUser,
    findUserById,
    setMemberShip
}