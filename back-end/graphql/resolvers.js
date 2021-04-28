const Booking = require('../models/Booking')
const Hotel = require('../models/Hotel');
const User = require('../models/User')

const HotelResolver = {
    Query: {
        getHotels: async (parent, args) => {
            return await Hotel.find({});
        },
        getHotelByName: async (parent, args) => {
            return await Hotel.find({ "hotel_name": args.hotel_name });
        },
        getHotelByCity: async (parent, args) => {
            return await Hotel.find({ "city": args.city });
        }
    },
    Mutation: {
        addHotel: async (parent, args) => {
            console.log(args)

            let newHotel = new Hotel({
                hotel_id: args.hotel_id,
                hotel_name: args.hotel_name,
                street: args.street,
                city: args.city,
                postal_code: args.postal_code,
                price: args.price,
                email: args.email,
            });
            return await newHotel.save();
        }
    }
};

const UserResolver = {
    Query: {
        getUsers: async (parent, args) => {
            return await User.find({});
        },
        getUserByEmail: async (parent, args) => {
            return await User.find({ "email": args.email });
        },

    },
    Mutation: {
        addUser: async (parent, args) => {
            console.log(args)

            let newUser = new User({
                username: args.username,
                password: args.password,
                email: args.email,
            });
            return await newUser.save();
        },
    }
};

const BookingResolver = {
    Query: {
        getBookings: async (parent, args) => {
            return await Booking.find({});
        },
        getBookingsByEmail: async (parent, args) => {
            return await Booking.find({ "user_email": args.user_email });
        },
    },
    Mutation: {
        addBooking: async (parent, args) => {
            console.log(args)

            let newBooking = new Booking({
                hotel_name: args.hotel_name,
                booking_date: args.booking_date,
                booking_start: args.booking_start,
                booking_end: args.booking_end,
                user_email: args.user_email,
            });
            return await newBooking.save();
        },
    }
};

module.exports = {
    HotelResolver,
    UserResolver,
    BookingResolver
}

