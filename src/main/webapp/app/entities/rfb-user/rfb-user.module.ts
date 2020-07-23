import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RfbloyaltySharedModule } from 'app/shared/shared.module';
import { RfbUserComponent } from './rfb-user.component';
import { RfbUserDetailComponent } from './rfb-user-detail.component';
import { RfbUserUpdateComponent } from './rfb-user-update.component';
import { RfbUserDeleteDialogComponent } from './rfb-user-delete-dialog.component';
import { rfbUserRoute } from './rfb-user.route';

@NgModule({
  imports: [RfbloyaltySharedModule, RouterModule.forChild(rfbUserRoute)],
  declarations: [RfbUserComponent, RfbUserDetailComponent, RfbUserUpdateComponent, RfbUserDeleteDialogComponent],
  entryComponents: [RfbUserDeleteDialogComponent],
})
export class RfbloyaltyRfbUserModule {}
