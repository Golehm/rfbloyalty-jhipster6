import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from 'app/shared/shared.module';
import { RfbLocationComponent } from './rfb-location.component';
import { RfbLocationDetailComponent } from './rfb-location-detail.component';
import { RfbLocationUpdateComponent } from './rfb-location-update.component';
import { RfbLocationDeleteDialogComponent } from './rfb-location-delete-dialog.component';
import { rfbLocationRoute } from './rfb-location.route';

@NgModule({
  imports: [RfbloyaltySharedModule, RouterModule.forChild(rfbLocationRoute)],
  declarations: [RfbLocationComponent, RfbLocationDetailComponent, RfbLocationUpdateComponent, RfbLocationDeleteDialogComponent],
  entryComponents: [RfbLocationDeleteDialogComponent],
})
export class RfbloyaltyRfbLocationModule {}
