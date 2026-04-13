import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './signup.html',
  styleUrl: './signup.css'
})
export class Signup {
  username = '';
  email = '';
  password = '';
  error = '';

  constructor(private apollo: Apollo, private router: Router) {}

  signup() {
    this.error = '';

    this.apollo.mutate<any>({
      mutation: gql`
        mutation Signup($username: String, $email: String, $password: String) {
          signup(username: $username, email: $email, password: $password) {
            username
            email
            token
          }
        }
      `,
      variables: {
        username: this.username,
        email: this.email,
        password: this.password
      }
    }).subscribe({
      next: (result) => {
        const token = result.data?.signup?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        }
      },
      error: (err) => {
        this.error = err.message || 'Signup failed';
      }
    });
  }
}
