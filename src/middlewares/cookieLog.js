const getAllUsers = require('../helpers/getAllUsers');

const cookieLog = (req, res, next) => {
    if(req.session.userLogged && req.cookies.user){
        const users = getAllUsers();
        const userToLog = users.find(user=>req.cookies.user == user.id);
        req.session.userLogged = userToLog;
    }
    return next();
}

module.exports = cookieLog;