import {NativeStackScreenProps} from '@react-navigation/native-stack';

/**
 * Properties for the Create Account Wizard screen
 */
export interface CreateAccountWizardProps {}

/**
 * List of params for the Login navigator
 */
export type MenuNavigatorParamsList = {
  CreateAccountWizard: CreateAccountWizardProps;
};

/**
 * Properties for the Menu navigator
 */
export interface MenuNavigatorProps {}

export type MenuNavigatorScreenProps<RouteName extends keyof MenuNavigatorParamsList> = NativeStackScreenProps<
  MenuNavigatorParamsList,
  RouteName
>;
