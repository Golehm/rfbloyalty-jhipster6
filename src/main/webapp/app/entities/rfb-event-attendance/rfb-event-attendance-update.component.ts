import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { IRfbEventAttendance, RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { IRfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from 'app/entities/rfb-user/rfb-user.service';
import { IRfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from 'app/entities/rfb-event/rfb-event.service';

type SelectableEntity = IRfbUser | IRfbEvent;

@Component({
  selector: 'jhi-rfb-event-attendance-update',
  templateUrl: './rfb-event-attendance-update.component.html',
})
export class RfbEventAttendanceUpdateComponent implements OnInit {
  isSaving = false;
  rfbusers: IRfbUser[] = [];
  rfbevents: IRfbEvent[] = [];
  attendanceDateDp: any;

  editForm = this.fb.group({
    id: [],
    attendanceDate: [],
    rfbUserId: [],
    rfbEventId: [],
  });

  constructor(
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    protected rfbUserService: RfbUserService,
    protected rfbEventService: RfbEventService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rfbEventAttendance }) => {
      this.updateForm(rfbEventAttendance);

      this.rfbUserService
        .query({ filter: 'rfbeventattendance-is-null' })
        .pipe(
          map((res: HttpResponse<IRfbUser[]>) => {
            return res.body || [];
          })
        )
        .subscribe((resBody: IRfbUser[]) => {
          if (!rfbEventAttendance.rfbUserId) {
            this.rfbusers = resBody;
          } else {
            this.rfbUserService
              .find(rfbEventAttendance.rfbUserId)
              .pipe(
                map((subRes: HttpResponse<IRfbUser>) => {
                  return subRes.body ? [subRes.body].concat(resBody) : resBody;
                })
              )
              .subscribe((concatRes: IRfbUser[]) => (this.rfbusers = concatRes));
          }
        });

      this.rfbEventService.query().subscribe((res: HttpResponse<IRfbEvent[]>) => (this.rfbevents = res.body || []));
    });
  }

  updateForm(rfbEventAttendance: IRfbEventAttendance): void {
    this.editForm.patchValue({
      id: rfbEventAttendance.id,
      attendanceDate: rfbEventAttendance.attendanceDate,
      rfbUserId: rfbEventAttendance.rfbUserId,
      rfbEventId: rfbEventAttendance.rfbEventId,
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rfbEventAttendance = this.createFromForm();
    if (rfbEventAttendance.id !== undefined) {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.update(rfbEventAttendance));
    } else {
      this.subscribeToSaveResponse(this.rfbEventAttendanceService.create(rfbEventAttendance));
    }
  }

  private createFromForm(): IRfbEventAttendance {
    return {
      ...new RfbEventAttendance(),
      id: this.editForm.get(['id'])!.value,
      attendanceDate: this.editForm.get(['attendanceDate'])!.value,
      rfbUserId: this.editForm.get(['rfbUserId'])!.value,
      rfbEventId: this.editForm.get(['rfbEventId'])!.value,
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRfbEventAttendance>>): void {
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
