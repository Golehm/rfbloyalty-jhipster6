import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
  templateUrl: './rfb-location-delete-dialog.component.html',
})
export class RfbLocationDeleteDialogComponent {
  rfbLocation?: IRfbLocation;

  constructor(
    protected rfbLocationService: RfbLocationService,
    public activeModal: NgbActiveModal,
    protected eventManager: JhiEventManager
  ) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rfbLocationService.delete(id).subscribe(() => {
      this.eventManager.broadcast('rfbLocationListModification');
      this.activeModal.close();
    });
  }
}
