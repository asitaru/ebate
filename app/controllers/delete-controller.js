let Ebate = require('../models/ebate');

module.exports = async(req,res) => {

    try {
        //try deleting the ebate
        await Ebate.findByIdAndRemove(req.params.ebate_id);

        //return a succesfull message upon deletion
        res.json({ message: 'Succesfully deleted' });
    }
    catch(err) {
        //if there is an error with deletion, send the error
        err => res.status(500).json({ error: err});
    }

};
