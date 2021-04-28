import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';

const ADD_BOOKING = gql(`
  mutation addBooking($hotel_name: String!, $booking_date: String!, $booking_start: String!, $booking_end: String!, $user_email: String!){
   addBooking(hotel_name: $hotel_name, booking_date: $booking_date, booking_start: $booking_start, booking_end: $booking_end, user_email: $user_email){
    hotel_name
    booking_date
    booking_start
    booking_end
    user_email
    }
  }
`);

@Component({
  selector: 'app-book-hotel',
  templateUrl: './book-hotel.component.html',
  styleUrls: ['./book-hotel.component.css'],
})
export class BookHotelComponent implements OnInit {
  bookingForm = this.formBuilder.group({
    hotel_name: '',
    booking_start: '',
    booking_end: '',
  });

  user_email = localStorage.getItem('userEmail');
  date = new Date();
  booking_date = this.date.toISOString().split('T')[0];

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {}

  onSubmit(): void {
    this.apollo
      .mutate({
        mutation: ADD_BOOKING,
        variables: {
          hotel_name: this.bookingForm.value.hotel_name,
          booking_date: this.booking_date,
          booking_start: this.bookingForm.value.booking_start,
          booking_end: this.bookingForm.value.booking_end,
          user_email: this.user_email,
        },
      })
      .subscribe(
        (res) => {
          console.log('new booking:', res);
        },
        (err) => {
          console.log('Error:', err);
        }
      );
  }
}
