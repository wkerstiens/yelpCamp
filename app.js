const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

// mongoose.connect('mongodb://localhost:27017/farmStand', {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//     useFindAndModify: false
// }).then(() => {
//     console.log('Mongo Connection Open');
// }).catch((err) => {
//     console.log('Mongo Error:', err);
// });

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/* All the middleware that this app will need */
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));
/* end of middle ware */

app.get('/', (req, res) => {
    res.render('home');
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});