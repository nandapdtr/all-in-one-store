const express = require('express');
const app = express();

app.use(express.static(process.cwd() + '/dist/all-in-one-store'));

// set the port

app.set('port', 3000);

//Configuring routes

app.get('/', (req, res) => {
    res.render('index.html');
});

// listen on port

app.listen(app.get('port'), () => {
    console.log("app is running at localhost:" + app.get('port'));
});