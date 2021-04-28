import { Component, OnInit } from '@angular/core';
import { Booking } from '../model/booking';
import { Apollo, gql } from "apollo-angular";

@Component({
  selector: 'app-booking-list',
  templateUrl: './booking-list.component.html',
  styleUrls: ['./booking-list.component.css']
})
export class BookingListComponent implements OnInit {

  bookings: Booking[] | undefined;
  user_email = localStorage.getItem('userEmail');

  constructor(private apollo: Apollo) {}

  ngOnInit(): void {
    this.apollo
    .watchQuery({
      query: gql`
        query($user_email: String!){
          getBookingsByEmail(user_email: $user_email) {
            hotel_name
            booking_date
            booking_start
            booking_end
            user_email
          }
        }
      `,
      variables: {
        user_email: this.user_email
      }
    })
      .valueChanges.subscribe((result: any) => {
        this.bookings = result.data.getBookingsByEmail;
        console.log('Booking list:', result);
      });
  }
}
