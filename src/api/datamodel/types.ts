import {FirebaseAuthTypes} from '@react-native-firebase/auth';

/**
 * List of supported sports
 */
export type Sport = 'Calisthenics' | 'Football';

/**
 * User data interface
 */
export interface IUserDocument {
  preferredSports: Sport[];
}

/**
 * User's properties
 */
export type UserProps = IUserDocument & Pick<FirebaseAuthTypes.User, 'displayName'>;
