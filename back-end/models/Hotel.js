const mongoose = require('mongoose');

const HotelSchema = new mongoose.Schema({
    hotel_id: {
        type: Number,
        required: true,
        trim: true,
        unique: true
    },
    hotel_name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    street: {
        type: String,
        required: true,
        trim: true,
    },
    city: {
        type: String,
        required: true,
        trim: true,
    },
    postal_code: {
        type: String,
        required: true,
        trim: true,
    },
    price: {
        type: Number,
        default: 0.0,
        required: true,
        trim: true,
        validate(value) {
            if (value < 0.0) {
                throw new Error("Negative prices are not allowed.");
            }
        }
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        validate: function (value) {
            let emailRegex = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
            return emailRegex.test(value);
        }
    }
});

const Hotel = mongoose.model("Hotel", HotelSchema);
module.exports = Hotel;
