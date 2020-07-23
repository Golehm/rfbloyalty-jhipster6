import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';

@Component({
  templateUrl: './rfb-user-delete-dialog.component.html',
})
export class RfbUserDeleteDialogComponent {
  rfbUser?: IRfbUser;

  constructor(protected rfbUserService: RfbUserService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rfbUserService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rfbUserListModification');
      this.activeModal.close();
    });
  }
}
