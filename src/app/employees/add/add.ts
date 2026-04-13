import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add.html',
  styleUrl: './add.css'
})
export class Add {
  firstName = '';
  lastName = '';
  email = '';
  department = '';
  position = '';
  imageUrl = '';

  constructor(private apollo: Apollo, private router: Router) {}

  addEmployee() {
    this.apollo.mutate({
      mutation: gql`
        mutation AddEmployee(
          $firstName: String
          $lastName: String
          $email: String
          $department: String
          $position: String
          $imageUrl: String
        ) {
          addEmployee(
            firstName: $firstName
            lastName: $lastName
            email: $email
            department: $department
            position: $position
            imageUrl: $imageUrl
          ) {
            id
            firstName
            lastName
            email
            department
            position
            imageUrl
          }
        }
      `,
      variables: {
        firstName: this.firstName,
        lastName: this.lastName,
        email: this.email,
        department: this.department,
        position: this.position,
        imageUrl: this.imageUrl
      }
    }).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}