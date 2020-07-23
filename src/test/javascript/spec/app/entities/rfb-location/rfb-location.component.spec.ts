import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { ActivatedRoute, convertToParamMap } from '@angular/router';

import { RfbloyaltyTestModule } from '../../../test.module';
import { RfbLocationComponent } from 'app/entities/rfb-location/rfb-location.component';
import { RfbLocationService } from 'app/entities/rfb-location/rfb-location.service';
import { RfbLocation } from 'app/shared/model/rfb-location.model';

describe('Component Tests', () => {
  describe('RfbLocation Management Component', () => {
    let comp: RfbLocationComponent;
    let fixture: ComponentFixture<RfbLocationComponent>;
    let service: RfbLocationService;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbLocationComponent],
        providers: [
          {
            provide: ActivatedRoute,
            useValue: {
              data: of({
                defaultSort: 'id,asc',
              }),
              queryParamMap: of(
                convertToParamMap({
                  page: '1',
                  size: '1',
                  sort: 'id,desc',
                })
              ),
            },
          },
        ],
      })
        .overrideTemplate(RfbLocationComponent, '')
        .compileComponents();

      fixture = TestBed.createComponent(RfbLocationComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbLocationService);
    });

    it('Should call load all on init', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfbLocation(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.ngOnInit();

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfbLocations && comp.rfbLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should load a page', () => {
      // GIVEN
      const headers = new HttpHeaders().append('link', 'link;link');
      spyOn(service, 'query').and.returnValue(
        of(
          new HttpResponse({
            body: [new RfbLocation(123)],
            headers,
          })
        )
      );

      // WHEN
      comp.loadPage(1);

      // THEN
      expect(service.query).toHaveBeenCalled();
      expect(comp.rfbLocations && comp.rfbLocations[0]).toEqual(jasmine.objectContaining({ id: 123 }));
    });

    it('should calculate the sort attribute for an id', () => {
      // WHEN
      comp.ngOnInit();
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['id,desc']);
    });

    it('should calculate the sort attribute for a non-id attribute', () => {
      // INIT
      comp.ngOnInit();

      // GIVEN
      comp.predicate = 'name';

      // WHEN
      const result = comp.sort();

      // THEN
      expect(result).toEqual(['name,desc', 'id']);
    });
  });
});
