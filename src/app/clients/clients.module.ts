import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ClientsComponent } from './clients.component';
import { ClientsRoutes } from './clients.routing';
import { ClientDetailsComponent } from 'app/client-details/client-details.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClientsRoutes),
        FormsModule,
    ],
    declarations: [
        ClientsComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClientsModule {}