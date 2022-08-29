const express = require("express");
const path = require("path");
const app = express();
const port = 8000;
const mongoose = require('mongoose');
const bodyParser=require("body-parser");

mongoose.connect('mongodb://localhost/contactDanceDB',{useNewUrlParser:true});

const contactSchema = new mongoose.Schema({
    name: String,
    phone: String,
    email: String,
    address: String
});

const Contact = mongoose.model('Contact', contactSchema);

app.use(bodyParser.urlencoded({ extended: false }));
// EXPRESS SPECIFIC STUFF
app.use('/static', express.static('static')) // For serving static files
app.use(express.urlencoded())

// PUG SPECIFIC STUFF
app.set('view engine', 'pug') // Set the template engine as pug
app.set('views', path.join(__dirname, 'views')) // Set the views directory

// ENDPOINTS
app.get('/', (req, res) => {
    const params = {}
    res.status(200).render('index.pug', params);
})

app.get("/contact", (req, res) => {
    res.status(200).render('./contact.pug');
});

app.post('/contact', (req, res) => {
    var myData = new Contact(req.body);
    console.log(req.body);
    myData.save().then(() => {
        res.send("This item has been saved to the database");
    }).catch(() => {
        res.status(400).send("item was not saved to the databse");
    })
})

// START THE SERVER
app.listen(port, () => {
    console.log(`The application started successfully on port ${port}`);
});

