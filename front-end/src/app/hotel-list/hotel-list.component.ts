import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from 'apollo-angular';
import { Router } from '@angular/router';
import { Hotel } from '../model/hotel';

@Component({
  selector: 'app-hotel-list',
  templateUrl: './hotel-list.component.html',
  styleUrls: ['./hotel-list.component.css'],
})
export class HotelListComponent implements OnInit {
  hotels: Hotel[] | undefined;
  searchForm = this.formBuilder.group({
    hotel_name: '',
    hotel_city: '',
    hotel_search: '',
  });

  constructor(
    private formBuilder: FormBuilder,
    private apollo: Apollo,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          {
            getHotels {
              hotel_id
              hotel_name
              street
              city
              postal_code
              price
              email
            }
          }
        `,
      })
      .valueChanges.subscribe((result: any) => {
        this.hotels = result.data.getHotels;
        console.log('Hotel list:', result);
      });
  }

  onSubmit(): void {
    if (this.searchForm.value.hotel_name != '') {
      this.apollo
        .watchQuery({
          query: gql`
          query($hotel_name: String!){
            getHotelByName(hotel_name: $hotel_name) {
              hotel_id
              hotel_name
              street
              city
              postal_code
              price
              email
            }
          }
        `,
          variables: {
            hotel_name: this.searchForm.value.hotel_search,
          },
        })
        .valueChanges.subscribe((result: any) => {
          this.hotels = result.data.getHotelByName;
          console.log('Hotel list:', result);
        });
    }
    if (this.searchForm.value.hotel_city != ''){
      this.apollo
        .watchQuery({
          query: gql`
          query($city: String!){
            getHotelByCity(city: $city) {
              hotel_id
              hotel_name
              street
              city
              postal_code
              price
              email
            }
          }
        `,
          variables: {
            city: this.searchForm.value.hotel_search,
          },
        })
        .valueChanges.subscribe((result: any) => {
          this.hotels = result.data.getHotelByCity;
          console.log('Hotel list:', result);
        });
    }
  }
}
