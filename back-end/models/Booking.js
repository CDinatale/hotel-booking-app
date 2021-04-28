const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
   
    hotel_name: {
        type: String,
        ref: 'Hotel',
        required: true,
        trim: true
    },
    booking_date: {
        type: String,
        required: true,
        trim: true
    },
    booking_start: {
        type: String,
        required: true,
        trim: true
    },
    booking_end: {
        type: String,
        required: true,
        trim: true
    },
    user_email: {
        type: String,
        ref: 'User',
        required: true,
        trim: true
    },
});

const Booking = mongoose.model("Booking", BookingSchema);
module.exports = Booking;