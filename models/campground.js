const mongoose=require('mongoose');
const Review = require('./review')
const User=require('./user')
const Schema=mongoose.Schema;


// https://res.cloudinary.com/douqbebwk/image/upload/w_300/v1600113904/YelpCamp/gxgle1ovzd2f3dgcpass.png

const ImageSchema = new Schema({
    url: String,
    filename: String
});

ImageSchema.virtual('thumbnail').get(function () {
    return this.url.replace('/upload', '/upload/w_200');
});

const campgroundSchema= new Schema({
    title:String,
    images: [ImageSchema],
    price:Number,
    description:String,
    location:String,
    author:{
        type: Schema.Types.ObjectId,
        ref:'User'
    },
    reviews: [  // To Store multiple review of multiple users in single campground
        {
            type: Schema.Types.ObjectId,
            ref:'Review'
        }
    ]
});
// Delete middleware
campgroundSchema.post('findOneAndDelete', async function (doc) {
    if (doc) {
        await Review.deleteMany({
            _id: {
                $in: doc.reviews
            }
        })
    }
})

module.exports=mongoose.model('Campground',campgroundSchema);