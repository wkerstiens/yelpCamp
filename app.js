const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const ejsMate = require('ejs-mate');
const ExpressError = require('./utils/expressError');
const path = require('path');
const methodOverride = require('method-override');

const campgrounds = require('./routes/campground');
const reviews = require('./routes/reviews');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(() => {
    console.log('Mongo Connection Open');
}).catch((err) => {
    console.log('Mongo Error:', err);
});

app.engine('ejs', ejsMate);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, '/public')));

/* All the middleware that this app will need */

app.use(morgan('common'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));
app.use(methodOverride('X-HTTP-Method'));
app.use(methodOverride('X-HTTP-Method-Override'));
app.use(methodOverride('X-Method-Override'));

app.use('/campgrounds', campgrounds);
app.use('/campgrounds/:id/reviews', reviews);
/* end of middle ware */

app.get('/', (req, res) => {
    res.render('home');
});

app.all('*', (req, res, next) => {
    next(new ExpressError('Resource not found', 404));
});

app.use((err, req, res, next) => {
    const { status = 500 } = err;
    if (!err.message) err.message = 'Oh no, something went wrong.';
    res.status(status).render('error', { err });
});

app.listen(3000, () => {
    console.log('Serving on port 3000');
});