import mongoose from "mongoose";

const {Schema} = mongoose;

const movieSchema = new Schema({
    name : {type : String, require : true},
    time : Number,
    year : {type: Number, require: true},
    image : {
        url : String,
        publicId : String
    },
    introduce : String
})

const movieModel = mongoose.model('movies', movieSchema)

export {movieModel}