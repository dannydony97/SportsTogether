import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * Properties for the Home screen
 */
export interface HomeScreenProps {}

/**
 * List of params for the Home navigator
 */
export type HomeNavigatorParamsList = {
  Home: HomeScreenProps;
};

export type HomeNavigatorScreenProps<RouteName extends keyof HomeNavigatorParamsList> = NativeStackScreenProps<
  HomeNavigatorParamsList,
  RouteName
>;

/**
 * Properties for the Home navigator
 */
export interface HomeNavigatorProps {}
