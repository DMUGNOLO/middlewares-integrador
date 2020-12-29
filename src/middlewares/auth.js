const auth = (req, res, next) => {
    if(req.session.userLogged){
        return next();
    }
    return res.redirect('/user/login');
}

module.exports = auth;