import { Route } from '@angular/router';

export default [
  {
    path: '',
    loadComponent: () => import('./pages/my-notes/my-notes.component'),
  },
  {
    path: 'add',
    loadComponent: () => import('./pages/add-or-edit-note/add-or-edit-note.component'),
    pathMatch: 'full',
  },
  {
    path: ':id/edit',
    loadComponent: () => import('./pages/add-or-edit-note/add-or-edit-note.component'),
  },
  {
    path: 'archived',
    loadComponent: () => import('./pages/archived-notes/archived-notes.component'),
  }
] satisfies Route[];
