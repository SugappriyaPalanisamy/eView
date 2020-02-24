import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClientDetailsComponent } from './client-details.component';
import { ClientDetailsRoutes } from './client-details.routing';
import { TagInputModule } from 'ngx-chips';
import { JwBootstrapSwitchNg2Module } from 'jw-bootstrap-switch-ng2';
import { EqualValidator } from '../forms/equal-validator.directive';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ClientDetailsRoutes),
        TagInputModule,
        JwBootstrapSwitchNg2Module,
        FormsModule

    ],
    declarations: [
        ClientDetailsComponent,
        EqualValidator
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ClientDetailsModule {}