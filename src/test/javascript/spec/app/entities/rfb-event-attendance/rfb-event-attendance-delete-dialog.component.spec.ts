import { ComponentFixture, TestBed, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { of } from 'rxjs';
import { JhiEventManager } from 'ng-jhipster';

import { RfbloyaltyTestModule } from '../../../test.module';
import { MockEventManager } from '../../../helpers/mock-event-manager.service';
import { MockActiveModal } from '../../../helpers/mock-active-modal.service';
import { RfbEventAttendanceDeleteDialogComponent } from 'app/entities/rfb-event-attendance/rfb-event-attendance-delete-dialog.component';
import { RfbEventAttendanceService } from 'app/entities/rfb-event-attendance/rfb-event-attendance.service';

describe('Component Tests', () => {
  describe('RfbEventAttendance Management Delete Component', () => {
    let comp: RfbEventAttendanceDeleteDialogComponent;
    let fixture: ComponentFixture<RfbEventAttendanceDeleteDialogComponent>;
    let service: RfbEventAttendanceService;
    let mockEventManager: MockEventManager;
    let mockActiveModal: MockActiveModal;

    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [RfbloyaltyTestModule],
        declarations: [RfbEventAttendanceDeleteDialogComponent],
      })
        .overrideTemplate(RfbEventAttendanceDeleteDialogComponent, '')
        .compileComponents();
      fixture = TestBed.createComponent(RfbEventAttendanceDeleteDialogComponent);
      comp = fixture.componentInstance;
      service = fixture.debugElement.injector.get(RfbEventAttendanceService);
      mockEventManager = TestBed.get(JhiEventManager);
      mockActiveModal = TestBed.get(NgbActiveModal);
    });

    describe('confirmDelete', () => {
      it('Should call delete service on confirmDelete', inject(
        [],
        fakeAsync(() => {
          // GIVEN
          spyOn(service, 'delete').and.returnValue(of({}));

          // WHEN
          comp.confirmDelete(123);
          tick();

          // THEN
          expect(service.delete).toHaveBeenCalledWith(123);
          expect(mockActiveModal.closeSpy).toHaveBeenCalled();
          expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
        })
      ));

      it('Should not call delete service on clear', () => {
        // GIVEN
        spyOn(service, 'delete');

        // WHEN
        comp.cancel();

        // THEN
        expect(service.delete).not.toHaveBeenCalled();
        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
      });
    });
  });
});
