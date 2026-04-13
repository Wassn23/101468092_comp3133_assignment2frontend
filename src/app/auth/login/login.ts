import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  email = '';
  password = '';
  error = '';

  constructor(private apollo: Apollo, private router: Router) {}

  login() {
    this.error = '';

    this.apollo.mutate<any>({
      mutation: gql`
        mutation Login($email: String, $password: String) {
          login(email: $email, password: $password) {
            token
          }
        }
      `,
      variables: {
        email: this.email,
        password: this.password
      }
    }).subscribe({
      next: (result) => {
        const token = result.data?.login?.token;
        if (token) {
          localStorage.setItem('token', token);
          this.router.navigate(['/employees']);
        }
      },
      error: (err) => {
        this.error = err.message || 'Login failed';
      }
    });
  }
}