import { Routes } from '@angular/router';
import { RootComponent } from 'src/root/root.component';

export const routes: Routes = [
  {
    path: '',
    component: RootComponent
  },
  {
    path: 'home',
    loadChildren: () => import('../home/routes')
  },
  {
    path: 'about',
    loadChildren: () =>
      import('../about/routes')
  },
];
