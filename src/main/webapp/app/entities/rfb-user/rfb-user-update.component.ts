import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRfbUser, RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { IRfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from 'app/entities/rfb-location/rfb-location.service';

@Component({
  selector: 'jhi-rfb-user-update',
  templateUrl: './rfb-user-update.component.html',
})
export class RfbUserUpdateComponent implements OnInit {
  isSaving = false;
  homelocations: IRfbLocation[] = [];

  editForm = this.fb.group({
    id: [],
    username: [],
    homeLocationId: [],
  });

  constructor(
    protected rfbUserService: RfbUserService,
    protected rfbLocationService: RfbLocationService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rfbUser }) => {
      this.updateForm(rfbUser);

      this.rfbLocationService
        .query({ filter: 'rfbuser-is-null' })
        .pipe(
          map((res: HttpResponse<IRfbLocation[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRfbLocation[]) => {
          if (!rfbUser.homeLocationId) {
            this.homelocations = resBody;
          } else {
            this.rfbLocationService
              .find(rfbUser.homeLocationId)
              .pipe(
                map((subRes: HttpResponse<IRfbLocation>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRfbLocation[]) => (this.homelocations = concatRes));
          }
        });
    });
  }

  updateForm(rfbUser: IRfbUser): void {
    this.editForm.patchValue({
      id: rfbUser.id,
      username: rfbUser.username,
      homeLocationId: rfbUser.homeLocationId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rfbUser = this.createFromForm();
    if (rfbUser.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbUserService.update(rfbUser));
    } else {
      this.subscribeToSaveResponse(this.rfbUserService.create(rfbUser));
    }
  }

  private createFromForm(): IRfbUser {
    return {
      ...new RfbUser(),
      id: this.editForm.get(['id'])!.value,
      username: this.editForm.get(['username'])!.value,
      homeLocationId: this.editForm.get(['homeLocationId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbUser>>): void {
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

  trackById(index: number, item: IRfbLocation): any {
    return item.id;
  }
}
