import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import LoginNavigator from './src/routes/LoginNavigator';
import {PaperProvider} from 'react-native-paper';
import AuthentificationProvider from './src/providers/AuthentificationProvider';

const App: FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AuthentificationProvider>
          <LoginNavigator />
        </AuthentificationProvider>
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
