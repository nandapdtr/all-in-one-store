const express = require('express');
const app = express();
const request = require('request');
const bodyParser = require('body-parser');

const router = express.Router();

app.use(express.static(process.cwd() + '/dist/all-in-one-store'));
app.use(bodyParser.json());
app.use('/', router);

// set the port

app.set('port', 3000);

//Configuring routes

router.get('/', (req, res) => {
    res.render('index.html');
});

router.get('/products', (req, res) => {
    request.get(
        'http://localhost:8090/products',
        (error, response) => {
            if (error) {
                res.send(error);
            } else {
                res
                    .status(response.statusCode)
                    .json(JSON.parse(response.body));
            }
        }
    );
});

router.post('/initShoppingCart', (req, res) => {
    request.post({
        url: 'http://localhost:8090/shoppingCart/create',
        json: true
    },
        (error, response) => {
            if (error) {
                res.send(error);
            } else {
                res.status(response.statusCode)
                    .json(response.body);
            }
        }
    );
});

router.post('/addProduct', (req, res) => {
    request.post({
        url: 'http://localhost:8090/shoppingCart/addProduct',
        json: true,
        body: req.body
    },
        (error, response) => {
            if (error) {
                res.send(error);
            } else {
                res.status(response.statusCode)
                    .json(response.body);
            }
        }
    );
});


router.delete('/deleteProduct', (req, res) => {
    console.log(req.query);
    request.delete({
        url: 'http://localhost:8090/shoppingCart/deleteProduct',
        json: true,
        body: req.query
    },
        (error, response) => {
            if (error) {
                res.send(error);
            } else {
                res.status(response.statusCode)
                    .json(response.body);
            }
        }
    );
});

router.put('/updateProduct', (req, res) => {
    request.put({
        url: 'http://localhost:8090/shoppingCart/updateProduct',
        json: true,
        body: req.body
    },
        (error, response) => {
            if (error) {
                res.send(error);
            } else {
                res.status(response.statusCode)
                    .json(response.body);
            }
        }
    );
});
// listen on port

app.listen(app.get('port'), () => {
    console.log("app is running at localhost:" + app.get('port'));
});