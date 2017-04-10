const getController = require('./controllers/get-controller');
const postController = require('./controllers/post-controller');
const deleteController = require('./controllers/delete-controller');
const voteController = require('./controllers/vote-controller');

module.exports = function(app) {
    //get all ebates
    app.get('/api/ebates', getController);

    //get one ebate
    app.get('/api/ebates/:ebate_id', getController.singleQuery)

    //get ebates by user TODO
    app.get('/api/ebates/user/:username', getController.userQuery);

    //create an ebate
    app.post('/api/ebates/', postController);

    //vote in the ebate
    app.put('/api/ebates/:ebate_id', voteController);

    //add an option
    app.put('api/ebates/:ebate_id/new', voteController.newOption);

    //delete the ebate
    app.delete('/api/ebates/:ebate_id', deleteController);

    app.get('*', (req,res) => {
        res.sendFile('/views/index.html');
    });
}
