import {NativeStackScreenProps} from '@react-navigation/native-stack';

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
 * List of params for the Login navigator
 */
export type LoginNavigatorParamsList = {
  Login: LoginScreenProps;
  MobileNumber: MobileNumberScreenProps;
  CountryCodes: CountryCodesScreenProps;
  ConfirmNumber: ConfirmNumberScreenProps;
};

export type LoginNavigatorScreenProps<RouteName extends keyof LoginNavigatorParamsList> = NativeStackScreenProps<
  LoginNavigatorParamsList,
  RouteName
>;

/**
 * Properties for the Login navigator
 */
export interface LoginNavigatorProps {}
