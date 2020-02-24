import { Routes } from '@angular/router';
import { ClientDetailsComponent } from '../client-details/client-details.component';

export const ClientDetailsRoutes: Routes = [{

    path: '',
    children: [ {
      path: 'clientdetails/:id',
      component: ClientDetailsComponent
  }
]
}];