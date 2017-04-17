let Ebate = require('../models/ebate');

//returns all ebates for frontpage
module.exports = async(req, res) => {

    try {
        //use mongoose to get all ebates from db
        let ebates = await Ebate.find();

        //if there are no ebates in db, return that to the server
        if(!ebates) res.status(400).json({ error : "No ebates in the database yet!" });

        //return all ebates in json format
        res.json(ebates);
    }
    catch(err) {
        //if there is an error retrieving, send the error
        err => res.status(500).json({ error: err});
    }

}

//selects one ebate based on id
module.exports.singleQuery = async(req, res) => {
    //APPARENTLY, USING AWAIT ON findById WITH AN INEXISTENT ID MAKES THE REQUEST RUN FOREVER
    //TODO RESEARCH THE REASON , WILL USE PROMISE UNTILL THEN

    // try {
    //     console.log(0);
    //     //use mongoose to find the ebate with the provided id
    //     let ebate = await Ebate.findById(req.params.ebate_id);
    //     console.log(1);
    //     //return the ebate to frontend if there is one
    //     if(!ebate){
    //         res.status(400).json({ error: "no ebate with this id!"});
    //     }
    //     else {
    //         res.json(ebate);
    //         console.log(ebate);
    //     }
    // }
    // catch(err) {
    //     //Send any errors
    //     err => res.status(500).json({ error: err});
    // }

    //search the ebate in the db
    Ebate.findById(req.params.ebate_id)
        //return if any ebate could be found
        .then(ebate => {
            if(!ebate){
                res.status(400).json({ error: "no ebate with this id!"});
            }
            else {
                res.json(ebate);
                console.log(ebate);
            }
        //return any db error
        }).catch( err => res.status(500).json({ error: err }))

}

//selects all ebates created by an user
module.exports.userQuery = (req, res) => {


    Ebate.find({'ownerId': req.body.userId})
        .then(ebates => {
            if(!ebates){
                res.status(400).json({ error : "No ebates in the database yet!" });
            }
            else {
                res.json(ebates);
            }
        }).catch( err=> res.status(500).json({ error: err }))

}
