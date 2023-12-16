import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {LoginNavigatorProps} from '../LoginNavigator/types';
import {MenuNavigatorProps} from '../MenuNavigator/types';

/**
 * List of params for the Main navigator
 */
export type MainNavigatorParamsList = {
  LoginNavigator: LoginNavigatorProps;
  MenuNavigator: MenuNavigatorProps;
};

export interface MainNavigatorProps {}

export type MainNavigatorScreenProps<RouteName extends keyof MainNavigatorParamsList> = NativeStackScreenProps<
  MainNavigatorParamsList,
  RouteName
>;
