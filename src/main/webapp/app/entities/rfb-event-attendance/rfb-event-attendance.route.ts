import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRfbEventAttendance, RfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { RfbEventAttendanceComponent } from './rfb-event-attendance.component';
import { RfbEventAttendanceDetailComponent } from './rfb-event-attendance-detail.component';
import { RfbEventAttendanceUpdateComponent } from './rfb-event-attendance-update.component';

@Injectable({ providedIn: 'root' })
export class RfbEventAttendanceResolve implements Resolve<IRfbEventAttendance> {
  constructor(private service: RfbEventAttendanceService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfbEventAttendance> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rfbEventAttendance: HttpResponse<RfbEventAttendance>) => {
          if (rfbEventAttendance.body) {
            return of(rfbEventAttendance.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RfbEventAttendance());
  }
}

export const rfbEventAttendanceRoute: Routes = [
  {
    path: '',
    component: RfbEventAttendanceComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEventAttendances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RfbEventAttendanceDetailComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEventAttendances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RfbEventAttendanceUpdateComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEventAttendances',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RfbEventAttendanceUpdateComponent,
    resolve: {
      rfbEventAttendance: RfbEventAttendanceResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEventAttendances',
    },
    canActivate: [UserRouteAccessService],
  },
];
