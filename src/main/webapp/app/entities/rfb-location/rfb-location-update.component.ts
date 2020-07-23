import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';

import { IRfbLocation, RfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';

@Component({
  selector: 'jhi-rfb-location-update',
  templateUrl: './rfb-location-update.component.html',
})
export class RfbLocationUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    locationName: [],
    runDayOfWeek: [],
  });

  constructor(protected rfbLocationService: RfbLocationService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rfbLocation }) => {
      this.updateForm(rfbLocation);
    });
  }

  updateForm(rfbLocation: IRfbLocation): void {
    this.editForm.patchValue({
      id: rfbLocation.id,
      locationName: rfbLocation.locationName,
      runDayOfWeek: rfbLocation.runDayOfWeek,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rfbLocation = this.createFromForm();
    if (rfbLocation.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbLocationService.update(rfbLocation));
    } else {
      this.subscribeToSaveResponse(this.rfbLocationService.create(rfbLocation));
    }
  }

  private createFromForm(): IRfbLocation {
    return {
      ...new RfbLocation(),
      id: this.editForm.get(['id'])!.value,
      locationName: this.editForm.get(['locationName'])!.value,
      runDayOfWeek: this.editForm.get(['runDayOfWeek'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbLocation>>): void {
    result.subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError(): void {
    this.isSaving = false;
  }
}
