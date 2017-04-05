const express = require('express');

let app = express();

app.set('port', (process.env.PORT || 5000));

app.use('/node_modules', express.static(__dirname + "/node_modules"));
app.use('/', express.static(__dirname));

app.get('/', (req,res) => {
    res.send("It's working!");
});

app.listen(app.get('port'), () => console.log('App is running on port', app.get('port')));
