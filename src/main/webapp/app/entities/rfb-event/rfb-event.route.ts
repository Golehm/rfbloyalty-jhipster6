import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRfbEvent, RfbEvent } from 'app/shared/model/rfb-event.model';
import { RfbEventService } from './rfb-event.service';
import { RfbEventComponent } from './rfb-event.component';
import { RfbEventDetailComponent } from './rfb-event-detail.component';
import { RfbEventUpdateComponent } from './rfb-event-update.component';

@Injectable({ providedIn: 'root' })
export class RfbEventResolve implements Resolve<IRfbEvent> {
  constructor(private service: RfbEventService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfbEvent> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rfbEvent: HttpResponse<RfbEvent>) => {
          if (rfbEvent.body) {
            return of(rfbEvent.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RfbEvent());
  }
}

export const rfbEventRoute: Routes = [
  {
    path: '',
    component: RfbEventComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'RfbEvents',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RfbEventDetailComponent,
    resolve: {
      rfbEvent: RfbEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEvents',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RfbEventUpdateComponent,
    resolve: {
      rfbEvent: RfbEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEvents',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RfbEventUpdateComponent,
    resolve: {
      rfbEvent: RfbEventResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbEvents',
    },
    canActivate: [UserRouteAccessService],
  },
];
