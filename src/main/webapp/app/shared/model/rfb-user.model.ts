export interface IRfbUser {
  id?: number;
  username?: string;
  homeLocationId?: number;
  userLogin?: string;
  userId?: number;
}

export class RfbUser implements IRfbUser {
  constructor(
    public id?: number,
    public username?: string,
    public homeLocationId?: number,
    public userLogin?: string,
    public userId?: number
  ) {}
}
