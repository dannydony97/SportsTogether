import {DrawerScreenProps} from '@react-navigation/drawer';

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

export type HomeNavigatorScreenProps<RouteName extends keyof HomeNavigatorParamsList> = DrawerScreenProps<
  HomeNavigatorParamsList,
  RouteName
>;

/**
 * Properties for the Home navigator
 */
export interface HomeNavigatorProps {}
