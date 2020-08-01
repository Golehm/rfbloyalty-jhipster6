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
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

type SelectableEntity = IRfbLocation | IUser;

@Component({
  selector: 'jhi-rfb-user-update',
  templateUrl: './rfb-user-update.component.html',
})
export class RfbUserUpdateComponent implements OnInit {
  isSaving = false;
  homelocations: IRfbLocation[] = [];
  users: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    username: [],
    homeLocationId: [],
    userId: [],
  });

  constructor(
    protected rfbUserService: RfbUserService,
    protected rfbLocationService: RfbLocationService,
    protected userService: UserService,
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

      this.userService.query().subscribe((res: HttpResponse<IUser[]>) => (this.users = res.body || []));
    });
  }

  updateForm(rfbUser: IRfbUser): void {
    this.editForm.patchValue({
      id: rfbUser.id,
      username: rfbUser.username,
      homeLocationId: rfbUser.homeLocationId,
      userId: rfbUser.userId,
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
      userId: this.editForm.get(['userId'])!.value,
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

  trackById(index: number, item: SelectableEntity): any {
    return item.id;
  }
}
