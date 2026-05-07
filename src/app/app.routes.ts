import { Routes } from '@angular/router';
import { InitialScreen } from './feature/pages/initial-screen/initial-screen';
import { MainLayout } from './shared/components/layout/main-layout/main-layout';


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
        loadComponent: () =>
          import('./shared/auth/login/login')
            .then(m => m.Login),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('./shared/auth/register/register')
            .then(m => m.Register),
      },
    ],
  },
  {
    path: 'home',
    component: InitialScreen,
  },
];
