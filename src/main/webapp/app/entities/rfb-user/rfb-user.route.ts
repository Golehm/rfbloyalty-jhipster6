import { Injectable } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { Resolve, ActivatedRouteSnapshot, Routes, Router } from '@angular/router';
import { Observable, of, EMPTY } from 'rxjs';
import { flatMap } from 'rxjs/operators';

import { Authority } from 'app/shared/constants/authority.constants';
import { UserRouteAccessService } from 'app/core/auth/user-route-access-service';
import { IRfbUser, RfbUser } from 'app/shared/model/rfb-user.model';
import { RfbUserService } from './rfb-user.service';
import { RfbUserComponent } from './rfb-user.component';
import { RfbUserDetailComponent } from './rfb-user-detail.component';
import { RfbUserUpdateComponent } from './rfb-user-update.component';

@Injectable({ providedIn: 'root' })
export class RfbUserResolve implements Resolve<IRfbUser> {
  constructor(private service: RfbUserService, private router: Router) {}

  resolve(route: ActivatedRouteSnapshot): Observable<IRfbUser> | Observable<never> {
    const id = route.params['id'];
    if (id) {
      return this.service.find(id).pipe(
        flatMap((rfbUser: HttpResponse<RfbUser>) => {
          if (rfbUser.body) {
            return of(rfbUser.body);
          } else {
            this.router.navigate(['404']);
            return EMPTY;
          }
        })
      );
    }
    return of(new RfbUser());
  }
}

export const rfbUserRoute: Routes = [
  {
    path: '',
    component: RfbUserComponent,
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/view',
    component: RfbUserDetailComponent,
    resolve: {
      rfbUser: RfbUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: 'new',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbUsers',
    },
    canActivate: [UserRouteAccessService],
  },
  {
    path: ':id/edit',
    component: RfbUserUpdateComponent,
    resolve: {
      rfbUser: RfbUserResolve,
    },
    data: {
      authorities: [Authority.USER],
      pageTitle: 'RfbUsers',
    },
    canActivate: [UserRouteAccessService],
  },
];
