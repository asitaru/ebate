let Ebate = require('../models/ebate');

module.exports = (req,res) => {

    //we prepare the new ebate to be inserted in db
    let ebate = new Ebate();
    ebate.name = req.body.name;
    ebate.ownerId = req.body.userId;
    req.body.options.forEach( option => ebate.options.push({name: option, votes: 0}));
    console.log(ebate);

    //try saving the ebate
     ebate.save().then(
         data => {
            //redirect to the newly created ebate
            res.redirect('/#!/ebate/' + data._id);
         },
         //if there is an error creating, send the error
         err => {
             res.status(500).json({ error: err})
         }
     )

}
