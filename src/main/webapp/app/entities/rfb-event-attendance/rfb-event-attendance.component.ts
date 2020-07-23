import { Component, OnInit, OnDestroy } from '@angular/core';
import { HttpHeaders, HttpResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';
import { JhiEventManager, JhiParseLinks } from 'ng-jhipster';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

import { ITEMS_PER_PAGE } from 'app/shared/constants/pagination.constants';
import { RfbEventAttendanceService } from './rfb-event-attendance.service';
import { RfbEventAttendanceDeleteDialogComponent } from './rfb-event-attendance-delete-dialog.component';

@Component({
  selector: 'jhi-rfb-event-attendance',
  templateUrl: './rfb-event-attendance.component.html',
})
export class RfbEventAttendanceComponent implements OnInit, OnDestroy {
  rfbEventAttendances: IRfbEventAttendance[];
  eventSubscriber?: Subscription;
  itemsPerPage: number;
  links: any;
  page: number;
  predicate: string;
  ascending: boolean;

  constructor(
    protected rfbEventAttendanceService: RfbEventAttendanceService,
    protected eventManager: JhiEventManager,
    protected modalService: NgbModal,
    protected parseLinks: JhiParseLinks
  ) {
    this.rfbEventAttendances = [];
    this.itemsPerPage = ITEMS_PER_PAGE;
    this.page = 0;
    this.links = {
      last: 0,
    };
    this.predicate = 'id';
    this.ascending = true;
  }

  loadAll(): void {
    this.rfbEventAttendanceService
      .query({
        page: this.page,
        size: this.itemsPerPage,
        sort: this.sort(),
      })
      .subscribe((res: HttpResponse<IRfbEventAttendance[]>) => this.paginateRfbEventAttendances(res.body, res.headers));
  }

  reset(): void {
    this.page = 0;
    this.rfbEventAttendances = [];
    this.loadAll();
  }

  loadPage(page: number): void {
    this.page = page;
    this.loadAll();
  }

  ngOnInit(): void {
    this.loadAll();
    this.registerChangeInRfbEventAttendances();
  }

  ngOnDestroy(): void {
    if (this.eventSubscriber) {
      this.eventManager.destroy(this.eventSubscriber);
    }
  }

  trackId(index: number, item: IRfbEventAttendance): number {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
    return item.id!;
  }

  registerChangeInRfbEventAttendances(): void {
    this.eventSubscriber = this.eventManager.subscribe('rfbEventAttendanceListModification', () => this.reset());
  }

  delete(rfbEventAttendance: IRfbEventAttendance): void {
    const modalRef = this.modalService.open(RfbEventAttendanceDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.rfbEventAttendance = rfbEventAttendance;
  }

  sort(): string[] {
    const result = [this.predicate + ',' + (this.ascending ? 'asc' : 'desc')];
    if (this.predicate !== 'id') {
      result.push('id');
    }
    return result;
  }

  protected paginateRfbEventAttendances(data: IRfbEventAttendance[] | null, headers: HttpHeaders): void {
    const headersLink = headers.get('link');
    this.links = this.parseLinks.parse(headersLink ? headersLink : '');
    if (data) {
      for (let i = 0; i < data.length; i++) {
        this.rfbEventAttendances.push(data[i]);
      }
    }
  }
}
