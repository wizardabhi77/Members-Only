
const pool = require("./pool");

async function createUser(firstname,lastname, username, password) {
    await pool.query("insert into users (firstname,lastname, username, password) values ( $1, $2, $3, $4)",[firstname,lastname,username,password]);

}

async function getAllUsers(){
    const { rows } = await pool.query("select * from users");
    return rows;
}

async function getAllMembers(){
    const { rows } = await pool.query("select username from users where membership = 'member'");
    return rows;
}

async function getAllMessages(){
    const { rows } = await pool.query("select * from messages");
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
    
   await pool.query("update users set membership = 'member' where id = $1",[id]);
   
}

async function setAdmin(id) {
    await pool.query("update users set membership = 'admin' where id = $1",[id]);
}
    


async function postMessages(title, message, uid) {
    
    const added = new Date();
    await pool.query("insert into messages (title, text, added, uid) values ( $1, $2, $3, $4)", [title, message, added, uid]);
}

async function deleteMessage(mid) {
    await pool.query("delete from messages where mid = $1",[mid]);
}

module.exports = {
    createUser,
    getAllUsers,
    getAllMembers,
    getAllMessages,
    findUser,
    findUserById,
    setMemberShip,
    setAdmin,
    postMessages,
    deleteMessage
}