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
export type UserProps = UserData & Pick<FirebaseAuthTypes.User, 'displayName'>;

/**
 * Place document data interface
 */
export interface PlaceData {
  sport: Sport;
  coordinate: FirebaseFirestoreTypes.GeoPoint;
  images: string[];
}
