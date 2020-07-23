import { Moment } from 'moment';

export interface IRfbEventAttendance {
  id?: number;
  attendanceDate?: Moment;
  rfbUserId?: number;
  rfbEventId?: number;
}

export class RfbEventAttendance implements IRfbEventAttendance {
  constructor(public id?: number, public attendanceDate?: Moment, public rfbUserId?: number, public rfbEventId?: number) {}
}
