const fs = require("fs");
const path = require("path");
const usersFilePath = path.join(__dirname, '../database/users.json');
const getAllUsers = require('../helpers/getAllUsers');


const writeUsers = (newUser)=>{
    const users = getAllUsers();
    const newUsersToWrite = JSON.stringify([...users, newUser], null, " ");
    return fs.writeFileSync(usersFilePath, newUsersToWrite);
}

module.exports = writeUsers;