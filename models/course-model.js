const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const courseSchema = new Schema({
    title: {
        type: String,
        required: true,
        trim: true,
        minlength: 3,
    },
    price: {
        type: Number,
        required: true,
        trim: true,
        minlength: 1,
    },
})

const Course = mongoose.model("courses", courseSchema);  
module.exports = Course;