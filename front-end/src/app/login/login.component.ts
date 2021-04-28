import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Apollo, gql } from "apollo-angular";
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm = this.formBuilder.group({
    email: '',
    password: ''
  });

  constructor(private formBuilder: FormBuilder, private apollo: Apollo, private router:Router) { }

  ngOnInit(): void {
  }

  onSubmit(): void {
    this.apollo
      .watchQuery({
        query: gql`
          query($email: String!){
            getUserByEmail(email: $email) {
              username
              email
              password
            }
          }
        `,
        variables: {
          email: this.loginForm.value.email
        }
      })
      .valueChanges.subscribe((result: any) => {
        if(result.data.getUserByEmail.length == 0){
          alert("User not found.");
        }
        else if(this.loginForm.value.password != result.data.getUserByEmail[0].password){
          alert("Incorrect password. Please try again.");
          localStorage.setItem('loggedIn', 'false');
        }
        else{
          this.router.navigate(['/home']);
          localStorage.setItem('loggedIn', 'true');
          localStorage.setItem('userEmail', this.loginForm.value.email)
        }
        console.log('User:', result);
      });
  }

}
