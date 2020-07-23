export interface IRfbUser {
  id?: number;
  username?: string;
  homeLocationId?: number;
}

export class RfbUser implements IRfbUser {
  constructor(public id?: number, public username?: string, public homeLocationId?: number) {}
}
