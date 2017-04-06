let Ebate = require('../models/ebate');

module.exports = async(req,res) => {

    //we prepare the new ebate to be inserted in db
    let ebate = new Ebate();
    ebate.name = req.body.name;
    ebate.ownerId = req.body.userId;
    req.body.options.forEach( option => ebate.options.push({name: option, votes: []}));
    console.log(ebate);
    
    try {

        //try saving the ebate
        await ebate.save();

        //return a succesfull message upon insertion
        res.json({ message: 'Ebate created!'});

    }
    catch(err) {

        //if there is an error creating, send the error
        err => res.status(500).json({ error: err});
    }
};
