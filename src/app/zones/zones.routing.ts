import { Routes } from '@angular/router';
import { ZonesComponent } from './zones.component';

export const ZonesRoutes: Routes = [{

    path: '',
    children: [ {
      path: '',
      component: ZonesComponent
  }]
}];
