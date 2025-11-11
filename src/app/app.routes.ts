import { Routes } from '@angular/router';
import {authPublicGuard} from "./core/guards/auth-public.guard";
import {authPrivateGuard} from "./core/guards/auth-private.guard";

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./modules/auth/pages/layout-auth/layout-auth.component'),
    loadChildren: () => import('./modules/auth/auth.routes'),
    canActivate: [authPublicGuard],
  },
  {
    path: 'notes',
    loadComponent: () => import('./modules/note/pages/note-layout/note-layout.component'),
    loadChildren: () => import('./modules/note/note.routes'),
    canActivate: [authPrivateGuard],
    //providers: [NoteService],
  },
  {
    path:"user",
    canActivate: [authPrivateGuard],
    children: [
      {
        path: 'dashboard',
        loadComponent: () => import('./modules/user/pages/user-dashboard/user-dashboard.component'),
        //loadChildren: () => import('./user-dashboard/user.routes'),
      },
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ],
  },
  {path: "**", redirectTo: "", pathMatch: 'full'}

];
