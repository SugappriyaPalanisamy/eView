import { Routes } from '@angular/router';
import { ClientsComponent } from './clients.component';

export const ClientsRoutes: Routes = [{

    path: '',
    children: [ {
      path: '',
      component: ClientsComponent
  }]
}];
