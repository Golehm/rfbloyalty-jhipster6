import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from 'app/shared/shared.module';
import { RfbEventAttendanceComponent } from './rfb-event-attendance.component';
import { RfbEventAttendanceDetailComponent } from './rfb-event-attendance-detail.component';
import { RfbEventAttendanceUpdateComponent } from './rfb-event-attendance-update.component';
import { RfbEventAttendanceDeleteDialogComponent } from './rfb-event-attendance-delete-dialog.component';
import { rfbEventAttendanceRoute } from './rfb-event-attendance.route';

@NgModule({
  imports: [RfbloyaltySharedModule, RouterModule.forChild(rfbEventAttendanceRoute)],
  declarations: [
    RfbEventAttendanceComponent,
    RfbEventAttendanceDetailComponent,
    RfbEventAttendanceUpdateComponent,
    RfbEventAttendanceDeleteDialogComponent,
  ],
  entryComponents: [RfbEventAttendanceDeleteDialogComponent],
})
export class RfbloyaltyRfbEventAttendanceModule {}
