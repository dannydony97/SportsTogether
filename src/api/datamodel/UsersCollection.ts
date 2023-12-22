import {Collection} from './Collection';
import {UserData} from './types';

export class UsersCollection extends Collection<UserData> {
  /**
   * Public constructor
   */
  public constructor() {
    super('users');
  }
}
