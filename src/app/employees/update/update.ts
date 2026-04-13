import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-update',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './update.html',
  styleUrl: './update.css'
})
export class Update {
  id = '';
  firstName = '';
  lastName = '';
  email = '';
  department = '';
  position = '';
  imageUrl = '';

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    this.id = this.route.snapshot.params['id'];
    this.loadEmployee();
  }

  loadEmployee() {
    this.apollo.query<any>({
      query: gql`
        query {
          employee(id: "${this.id}") {
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
      fetchPolicy: 'no-cache'
    }).subscribe((result) => {
      const emp = result.data?.employee;
      if (emp) {
        this.firstName = emp.firstName;
        this.lastName = emp.lastName;
        this.email = emp.email;
        this.department = emp.department || '';
        this.position = emp.position || '';
        this.imageUrl = emp.imageUrl || '';
        this.cdr.detectChanges();
      }
    });
  }

  updateEmployee() {
    this.apollo.mutate({
      mutation: gql`
        mutation {
          updateEmployee(
            id: "${this.id}",
            firstName: "${this.firstName}",
            lastName: "${this.lastName}",
            email: "${this.email}",
            department: "${this.department}",
            position: "${this.position}",
            imageUrl: "${this.imageUrl}"
          ) {
            id
          }
        }
      `
    }).subscribe(() => {
      this.router.navigate(['/employees']);
    });
  }

  cancel() {
    this.router.navigate(['/employees']);
  }
}