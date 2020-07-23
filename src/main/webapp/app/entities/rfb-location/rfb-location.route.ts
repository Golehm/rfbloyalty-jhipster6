import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRfbLocation, RfbLocation } from 'app/shared/model/rfb-location.model';
import { RfbLocationService } from './rfb-location.service';
import { RfbLocationComponent } from './rfb-location.component';
import { RfbLocationDetailComponent } from './rfb-location-detail.component';
import { RfbLocationUpdateComponent } from './rfb-location-update.component';

@Injectable({ providedIn: 'root' })
export class RfbLocationResolve implements Resolve<IRfbLocation> {
  constructor(private service: RfbLocationService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfbLocation> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rfbLocation: HttpResponse<RfbLocation>) => {
          if (rfbLocation.body) {
            return of(rfbLocation.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RfbLocation());
  }
}

export const rfbLocationRoute: Routes = [
  {
    path: '',
    component: RfbLocationComponent,
    data: {
      authorities: [Authority.USER],
      defaultSort: 'id,asc',
      pageTitle: 'RfbLocations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RfbLocationDetailComponent,
    resolve: {
      rfbLocation: RfbLocationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbLocations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RfbLocationUpdateComponent,
    resolve: {
      rfbLocation: RfbLocationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbLocations',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RfbLocationUpdateComponent,
    resolve: {
      rfbLocation: RfbLocationResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbLocations',
    },
    canActivate: [UserRouteAccessService],
  },
];
