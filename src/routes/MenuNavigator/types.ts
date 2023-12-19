import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeNavigatorProps} from '../HomeNavigator/types';

/**
 * List of params for the Login navigator
 */
export type MenuNavigatorParamsList = {
  HomeNavigator: HomeNavigatorProps;
};

/**
 * Properties for the Menu navigator
 */
export interface MenuNavigatorProps {}

export type MenuNavigatorScreenProps<RouteName extends keyof MenuNavigatorParamsList> = NativeStackScreenProps<
  MenuNavigatorParamsList,
  RouteName
>;
