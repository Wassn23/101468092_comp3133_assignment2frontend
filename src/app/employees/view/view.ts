import { Component, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-view',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './view.html',
  styleUrl: './view.css'
})
export class View {
  employee: any = null;
  loading = true;
  error = '';

  constructor(
    private route: ActivatedRoute,
    private apollo: Apollo,
    private router: Router,
    private cdr: ChangeDetectorRef
  ) {
    const id = this.route.snapshot.params['id'];

    this.apollo.query<any>({
      query: gql`
        query {
          employee(id: "${id}") {
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
        this.employee = result.data?.employee || null;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load employee details';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goBack() {
    this.router.navigate(['/employees']);
  }
}