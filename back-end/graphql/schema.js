const { gql } = require("apollo-server-express");

exports.typeDefs = gql`
  type Hotel {
    hotel_id: ID!
    hotel_name: String!
    street: String!
    city: String!
    postal_code: String!
    price: Float!
    email: String!
  }

  type User {
    username: String!
    password: String!
    email: String!
  }

  type Booking {
    booking_id: ID!
    hotel_name: String!
    booking_date: String!
    booking_start: String!
    booking_end: String!
    user_email: String!
  }

  type Query {
    getHotels: [Hotel]
    getHotelByName(hotel_name: String!): [Hotel]
    getHotelByCity(city: String!): [Hotel]
    getUsers: [User]
    getUserByEmail(email: String!): [User]
    getBookings: [Booking]
    getBookingsByEmail(user_email:String): [Booking]
  }

  type Mutation {
    addHotel(
      hotel_id: ID!
      hotel_name: String!
      street: String!
      city: String!
      postal_code: String!
      price: Float!
      email: String!
    ): Hotel

    addUser(
      username: String!
      password: String!
      email: String!
    ): User

    addBooking(
      hotel_name: String!
      booking_date: String!
      booking_start: String!
      booking_end: String!
      user_email: String!
    ): Booking
  }
`;
