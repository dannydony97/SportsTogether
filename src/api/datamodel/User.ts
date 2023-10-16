import {UserData} from './types';
import {Document} from './Document';

export class UserDocument extends Document<UserData> {
  /**
   * Public constructor
   * @param uid user UID
   */
  public constructor(uid: string) {
    super('users', uid);
  }
}
