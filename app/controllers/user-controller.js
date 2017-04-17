//returns the user after receiving the response from twitter api

module.exports.fetchUser = (req, res, next) => {
    res.send(req.user);
}

module.exports.logout = (req,res) => {
    req.logout();
    res.redirect('/');
}
