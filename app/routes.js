let Ebate = require('./models/ebate');

module.exports = function(app) {

    //get all ebates
    app.get('/api/ebates', async(req,res) => {

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
            err => res.status(500).json({ error: err})
        }

    });

    //create an ebate

    app.get('*', (req,res) => {
        res.send("WORKING!");
        //res.sendFile('./public/views/index.html');
    });
}
