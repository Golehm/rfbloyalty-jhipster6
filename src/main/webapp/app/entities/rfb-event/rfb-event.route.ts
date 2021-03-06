import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, Router, Routes } from '@angular/router';
import { EMPTY, Observable, of } from 'rxjs';
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
      authorities: [Authority.ORGANIZER, Authority.ADMIN],
      defaultSort: 'id,asc',
      pageTitle: 'Events',
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
      authorities: [Authority.ORGANIZER, Authority.ADMIN],
      pageTitle: 'Events',
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
      authorities: [Authority.ORGANIZER, Authority.ADMIN],
      pageTitle: 'Events',
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
      authorities: [Authority.ORGANIZER, Authority.ADMIN],
      pageTitle: 'Events',
    },
    canActivate: [UserRouteAccessService],
  },
];
