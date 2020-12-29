const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../database/users.json');


const getAllUsers = ()=>{
    const users = fs.readFileSync(usersFilePath, 'utf-8');
    const usersParsed = JSON.parse(users);
    return usersParsed;
}

module.exports = getAllUsers;
