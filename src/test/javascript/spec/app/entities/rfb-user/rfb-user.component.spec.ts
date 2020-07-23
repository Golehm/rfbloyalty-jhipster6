import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbUserComponent } from 'app/entities/rfb-user/rfb-user.component';
import { RfbUserService } from 'app/entities/rfb-user/rfb-user.service';
import { RfbUser } from 'app/shared/model/rfb-user.model';

describe('Component Tests', () => {
  describe('RfbUser Management Component', () => {
    let comp: RfbUserComponent;
    let fixture: ComponentFixture<RfbUserComponent>;
    let service: RfbUserService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbUserComponent],
      })
        .overrideTemplate(RfbUserComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfbUserComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbUserService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfbUser(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfbUsers && comp.rfbUsers[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });
  });
});
