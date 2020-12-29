const fs = require("fs");
const getAllUsers = require('../helpers/getAllUsers');

const generateNewIdUsers = ()=>{
    const users = getAllUsers();
    if(users == ""){
        return 0;
    }
    return users.pop().id +1;
}

module.exports = generateNewIdUsers;