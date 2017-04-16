//returns the user after receiving the response from twitter api

module.exports = async(req, res) => {
    await req.isAuthenticated();
    res.send(req.user);
}

module.exports.logout = (req,res) => {
    req.logout();
    res.redirect('/');
}
