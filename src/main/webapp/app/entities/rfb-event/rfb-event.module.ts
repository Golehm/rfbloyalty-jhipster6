import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from 'app/shared/shared.module';
import { RfbEventComponent } from './rfb-event.component';
import { RfbEventDetailComponent } from './rfb-event-detail.component';
import { RfbEventUpdateComponent } from './rfb-event-update.component';
import { RfbEventDeleteDialogComponent } from './rfb-event-delete-dialog.component';
import { rfbEventRoute } from './rfb-event.route';

@NgModule({
  imports: [RfbloyaltySharedModule, RouterModule.forChild(rfbEventRoute)],
  declarations: [RfbEventComponent, RfbEventDetailComponent, RfbEventUpdateComponent, RfbEventDeleteDialogComponent],
  entryComponents: [RfbEventDeleteDialogComponent],
})
export class RfbloyaltyRfbEventModule {}
