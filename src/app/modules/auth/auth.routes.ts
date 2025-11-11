import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.component'),
  },
  /*{
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  }*/
] satisfies Route[];
