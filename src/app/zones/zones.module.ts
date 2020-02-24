import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ZonesRoutes } from './zones.routing';
import { ZonesComponent } from './zones.component';

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(ZonesRoutes),
        FormsModule,
    ],
    declarations: [
        ZonesComponent
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class ZonesModule {}