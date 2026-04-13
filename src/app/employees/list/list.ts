import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './list.html',
  styleUrl: './list.css'
})
export class ListComponent {
  employees: any[] = [];
  searchText = '';

  constructor(
    private apollo: Apollo,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {
    this.loadEmployees();
  }

  loadEmployees() {
    this.apollo.query<any>({
      query: gql`
        query {
          employees {
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
    }).subscribe({
      next: (result) => {
        this.employees = result.data?.employees || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  searchEmployees() {
    if (!this.searchText.trim()) {
      this.loadEmployees();
      return;
    }

    this.apollo.query<any>({
      query: gql`
        query SearchEmployees($department: String, $position: String) {
          searchEmployees(department: $department, position: $position) {
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
        department: this.searchText,
        position: this.searchText
      },
      fetchPolicy: 'no-cache'
    }).subscribe({
      next: (result) => {
        this.employees = result.data?.searchEmployees || [];
        this.cdr.detectChanges();
      },
      error: (error) => {
        console.error(error);
      }
    });
  }

  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  deleteEmployee(id: string) {
    this.apollo.mutate({
      mutation: gql`
        mutation DeleteEmployee($id: ID!) {
          deleteEmployee(id: $id)
        }
      `,
      variables: { id }
    }).subscribe(() => {
      this.loadEmployees();
    });
  }

  goToUpdate(id: string) {
    this.router.navigate(['/employees/update', id]);
  }

  goToView(id: string) {
    this.router.navigate(['/employees/view', id]);
  }

  goToAdd() {
    this.router.navigate(['/employees/add']);
  }
}