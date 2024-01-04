import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {HomeNavigatorProps} from '../HomeDrawer/types';

/**
 * Properties for the Login screen
 */
export interface LoginScreenProps {}

/**
 * Properties for the Phone Number screen
 */
export interface MobileNumberScreenProps {
  countryCallingCode: string;
}

/**
 * Properties for the Country Codes screen
 */
export interface CountryCodesScreenProps {}

/**
 * Properties for the Confirm Number screen
 */
export interface ConfirmNumberScreenProps {
  phoneNumber: string;
}

/**
 * Properties for the Create Account Wizard screen
 */
export interface CreateAccountWizardScreenProps {}

/**
 * List of params for the Login navigator
 */
export type LoginNavigatorParamsList = {
  Login: LoginScreenProps;
  MobileNumber: MobileNumberScreenProps;
  CountryCodes: CountryCodesScreenProps;
  ConfirmNumber: ConfirmNumberScreenProps;
  HomeNavigator: HomeNavigatorProps;
  CreateAccountWizard: CreateAccountWizardScreenProps;
};

export type LoginNavigatorScreenProps<RouteName extends keyof LoginNavigatorParamsList> = NativeStackScreenProps<
  LoginNavigatorParamsList,
  RouteName
>;

/**
 * Properties for the Login navigator
 */
export interface LoginNavigatorProps {}
