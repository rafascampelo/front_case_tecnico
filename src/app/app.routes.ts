import { Router, Routes } from '@angular/router';
import { InitialScreen } from './features/home/pages/initial-screen/initial-screen';
import { MainLayout } from './features/auth/pages/components/layout/main-layout/main-layout';
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
        loadComponent: () => import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        loadComponent: () => import('./features/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'home',
    component: InitialScreen,
  },
];
