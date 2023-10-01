import React, {FC} from 'react';
import Screen from '../../components/Screen';
import {LoginNavigatorScreenProps} from './types';
import {Text} from 'react-native-paper';

const CreateAccountWizardScreen: FC<LoginNavigatorScreenProps<'CreateAccountWizard'>> = () => {
  return (
    <Screen safeArea>
      <Text>TO DO!</Text>
    </Screen>
  );
};

export default CreateAccountWizardScreen;
