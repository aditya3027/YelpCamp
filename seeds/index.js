const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp');

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 50; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price=Math.floor(Math.random()*20)+10;
        const camp = new Campground({
            author:"65b0bf690d3cd9b1ac7532a0",
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description:'Lorem ipsum dolor sit amet consectetur adipisicing elit. Nisi ullam vitae soluta, quisquam itaque nesciunt suscipit omnis maiores neque eveniet enim laboriosam facilis et dicta asperiores porro inventore voluptatibus distinctio.',
            price,
            images : [
                {
                  url: 'https://res.cloudinary.com/dy3hvnjb6/image/upload/v1706578939/YelpCamp/whkxjv8po8zz7gmpteye.jpg',        
                  filename: 'YelpCamp/whkxjv8po8zz7gmpteye',
                }
             ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})
