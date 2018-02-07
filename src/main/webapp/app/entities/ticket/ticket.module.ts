import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { BugTrackerSharedModule } from '../../shared';
import { BugTrackerAdminModule } from '../../admin/admin.module';
import {
    TicketService,
    TicketPopupService,
    TicketComponent,
    TicketDetailComponent,
    TicketDialogComponent,
    TicketPopupComponent,
    TicketDeletePopupComponent,
    TicketDeleteDialogComponent,
    ticketRoute,
    ticketPopupRoute,
    TicketResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...ticketRoute,
    ...ticketPopupRoute,
];

@NgModule({
    imports: [
        BugTrackerSharedModule,
        BugTrackerAdminModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        TicketComponent,
        TicketDetailComponent,
        TicketDialogComponent,
        TicketDeleteDialogComponent,
        TicketPopupComponent,
        TicketDeletePopupComponent,
    ],
    entryComponents: [
        TicketComponent,
        TicketDialogComponent,
        TicketPopupComponent,
        TicketDeleteDialogComponent,
        TicketDeletePopupComponent,
    ],
    providers: [
        TicketService,
        TicketPopupService,
        TicketResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class BugTrackerTicketModule {}
