import {Collection} from './Collection';
import {PlaceData} from './types';

export class PlacesCollection extends Collection<PlaceData> {
  /**
   * Public constructor
   */
  public constructor() {
    super('places');
  }
}
