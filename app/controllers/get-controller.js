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

};

//selects one ebate based on id
module.exports.singleQuery = async(req, res) => {

    try {

        //use mongoose to find the ebate with the provided id
        let ebate = await Ebate.findById(req.params.ebate_id);

        //return the ebate to frontend
        res.json(ebate);
    }
    catch(err) {

        err => res.status(500).json({ error: err});
    }
};

//selects all ebates created by an user
module.exports.userQuery = async(req, res) => {

    try {

    }
    catch(err) {

        err => res.status(500).json({ error: err});
    }
};
