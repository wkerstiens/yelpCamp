const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');
const Review = require('../models/review');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then();

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('Database connected');
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    await Review.deleteMany({});
    const authors = [
        '60a02e2991ef7f124a4f2d09',
        '60a04381337ad2179e82ddfa',
        '60a04721ebb4261bc654ac2f'
    ];
    for (let i = 0; i < 10; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = parseFloat(((Math.random() * 30) + 20).toFixed(2));
        const camp = new Campground({
            author: authors[random1000 % 3],
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            images: {
                url: 'https://res.cloudinary.com/wak/image/upload/v1621561996/YelpCamp/fasrdplpwcybzor1akj7.jpg',
                filename: 'YelpCamp/fasrdplpwcybzor1akj7'
            },
            description: `Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, similique sed aut vero repudiandae voluptatum quos consequuntur nostrum id quasi quia, commodi odit maiores, recusandae magni minima veritatis earum fugit?
            Sapiente dolorum ea, totam accusantium quisquam necessitatibus maiores optio sequi molestiae inventore dignissimos quibusdam doloremque error magnam at. Quasi veniam odit quas praesentium sapiente, aspernatur dolores ullam architecto doloribus facere.
            Minima rerum eum qui dolorem pariatur, culpa nihil iure perferendis aspernatur dolor dolore illum consectetur vel alias. Expedita, amet quia deserunt maiores iste nesciunt, quaerat ipsa dolor praesentium dolorem quo?
            Eaque, sunt reiciendis. Nulla, minus iusto sed esse consequuntur fuga optio ipsam deleniti enim tempore alias aut totam harum ducimus quod et tempora quis incidunt at. Doloremque dolorum quibusdam a!`,
            price
        });
        await camp.save();
    }
};

seedDB().then(async () => {
    await mongoose.connection.close();
});