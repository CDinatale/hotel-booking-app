import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from "apollo-angular";
import { Router } from '@angular/router';

const ADD_USER = gql(`
  mutation adduser($username: String!, $password: String!, $email: String!){
   addUser(username: $username, password: $password, email: $email){
      username
      password
      email
    }
  }
`);

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {

  registrationForm = this.formBuilder.group({
    username: '',
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apollo.mutate({
      mutation: ADD_USER,
      variables: {
        username: this.registrationForm.value.username,
        password: this.registrationForm.value.password,
        email: this.registrationForm.value.email
      }
    }).subscribe((res) => {
      console.log('registration:', res);
    }, (err) => {
      console.log('Error:', err);
    });
  }

}
