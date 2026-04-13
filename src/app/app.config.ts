import { ApplicationConfig, inject } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient } from '@angular/common/http';

import { routes } from './app.routes';

import { provideApollo } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    provideHttpClient(),

    provideApollo(() => {
      const httpLink = inject(HttpLink);

      return {
        cache: new InMemoryCache(),
        link: httpLink.create({
         uri: 'https://one01468092-comp3133-assignment2backend.onrender.com/graphql'
        }),
      };
    }),
  ],
};