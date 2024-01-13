import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

/**
 * List of supported sports
 */
export type Sport = 'Calisthenics' | 'Football';

/**
 * User document data interface
 */
export type UserData = {
  preferredSports: Sport[];
};

/**
 * User's properties
 */
export type UserProps = UserData & Pick<FirebaseAuthTypes.User, 'displayName' | 'photoURL'>;

/**
 * Place document data interface
 */
export interface PlaceData {
  name: string;
  sport: Sport;
  coordinate: FirebaseFirestoreTypes.GeoPoint;
  images: string[];
}

/**
 * Data with its document id
 */
export type WithID<T> = T & {
  id: string;
};
