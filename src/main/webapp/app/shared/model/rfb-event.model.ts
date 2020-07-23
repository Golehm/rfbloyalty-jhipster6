import { Moment } from 'moment';
import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

export interface IRfbEvent {
  id?: number;
  eventDate?: Moment;
  eventCode?: string;
  rfbEventAttendances?: IRfbEventAttendance[];
  rfbLocationId?: number;
}

export class RfbEvent implements IRfbEvent {
  constructor(
    public id?: number,
    public eventDate?: Moment,
    public eventCode?: string,
    public rfbEventAttendances?: IRfbEventAttendance[],
    public rfbLocationId?: number
  ) {}
}
