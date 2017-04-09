let Ebate = require('../models/ebate');

//function that validates the uniqueness of a vote
let uniqueVote = (votersArray, ip, user ) => {
    if(user){
        return votersArray.indexOf(ip) === -1 && votersArray.indexOf(user) === -1
    }
    return votersArray.indexOf(ip) === -1;
};

//helper function that stores the IPs and Users that voted
let storeVoters = (votersArray, ip, user) => {
    votersArray.push(ip);
    if(user) {
        votersArray.push(user);
    }
}

module.exports = async(req,res) => {
    try {
        //find the ebate in the database using the id
        let ebate = await Ebate.findById(req.params.ebate_id);

        //validate the uniqueness of the vote
        if(!uniqueVote(ebate.ipAndUsersVoted, req.connection.remoteAddress, req.body.userId) ) {
            res.json({ error: "not unique!" });
            return
        }

        //identify the proper vote list and increment it
        ebate.options[parseInt(req.body.option)].votes += 1;
        console.log(ebate.options[parseInt(req.body.option)])

        //insert the ip/user that just voted
        storeVoters(ebate.ipAndUsersVoted, req.connection.remoteAddress, req.body.userId);


        //try updating the ebate
        await ebate.save();
        console.log("Saved!");

        //return a succesfull message upon update
        res.json({ message: "Ebate updated!" });

    }
    catch(err) {
        //Send any errors
        err => res.status(500).json({ error: err });
    }

module.exports.addOption = async(req,res) => {
    try{
        //find the ebate in the database using the id
        let ebate = await Ebate.findById(req.params.ebate_id);

        //add the option
        ebate.options.push({ name:req.body.option , votes: 0 );



    }
}

};
