let Ebate = require('../models/ebate');

//function that validates the uniqueness of a vote
let uniqueVote = (votes, ip, user ) => {
    return votes.every ( vote => vote.IP != ip && vote.user != user)
};

//helper function that helps to avoid counting 2 unauthenticated users as not unique
let uniqueUser = user => {
    if( user === undefined) {
        return null;
    }
    return user;
}

module.exports = async(req,res) => {
    console.log(req.body.option)
    try {
        //find the ebate in the database using the id
        let ebate = await Ebate.findById(req.params.ebate_id);

        //identify the proper vote list
        let voteArray = ebate.options[parseInt(req.body.option)].votes;

        //validate the uniqueness of the vote
        if(!uniqueVote(voteArray, req.connection.remoteAddress, req.body.userId) ) {
            res.json({ error: "not unique!" });
            return
        }

        //insert the user that just voted
        voteArray.push({
            IP: req.connection.remoteAddress,
            user: uniqueUser(req.body.userId)
        });

        //try updating the ebate
        await ebate.save();

        //return a succesfull message upon update
        res.json({ message: "Ebate updated!" });

    }
    catch(err) {
        //Send any errors
        err => res.status(500).json({ error: err });
    }

};
