//returns the user after receiving the response from twitter api

module.exports.sendUser;

let userPromise = new Promise((resolve,reject) => {
    sendUser = resolve;
});

module.exports = async(req, res) => {
    userPromise.then(user => {
        res.send(user)
    });    
}

module.exports.logout = (req,res) => {
    req.logout();
    res.redirect('/');
}
