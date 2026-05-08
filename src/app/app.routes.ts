import { Router, Routes } from '@angular/router';
import { InitialScreen } from './feature/pages/initial-screen/initial-screen';
import { MainLayout } from './feature/pages/auth/layout/main-layout/main-layout';
import { inject } from '@angular/core';

export const routes: Routes = [
  {
    path: '',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'login',
        pathMatch: 'full',
      },
      {
        path: 'login',
        loadComponent: () => import('./feature/pages/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./feature/pages/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'home',
    component: InitialScreen,
  },
];
