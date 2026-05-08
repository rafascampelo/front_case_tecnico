import { Routes } from '@angular/router';
import { InitialScreen } from './features/home/pages/initial-screen/initial-screen';
import { MainLayout } from './features/auth/pages/components/layout/main-layout/main-layout';
import { authGuard } from './core/guards/auth';
import { publicGuard } from './core/guards/public.guard';

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
        canActivate: [publicGuard],
        loadComponent: () =>
          import('./features/auth/login/login').then((m) => m.Login),
      },
      {
        path: 'register',
        canActivate: [publicGuard],
        loadComponent: () =>
          import('./features/auth/register/register').then((m) => m.Register),
      },
    ],
  },
  {
    path: 'home',
    component: InitialScreen,
    canActivate: [authGuard],
  },
];