import { AboutComponent } from './about.component';

export default [
  { path: '', component: AboutComponent },
  {
    path: 'customers/:id',
    loadChildren: () =>
      import('./customers/routes')
  },
];
