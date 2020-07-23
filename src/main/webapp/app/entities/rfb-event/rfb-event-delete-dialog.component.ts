import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from './rfb-event.service';

@Component({
  templateUrl: './rfb-event-delete-dialog.component.html',
})
export class RfbEventDeleteDialogComponent {
  rfbEvent?: IRfbEvent;

  constructor(protected rfbEventService: RfbEventService, public activeModal: NgbActiveModal, protected eventManager: JhiEventManager) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rfbEventService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rfbEventListModification');
      this.activeModal.close();
    });
  }
}
