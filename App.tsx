import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import LoginNavigator from './src/routes/LoginNavigator';
import AuthentificationProvider from './src/providers/AuthentificationProvider';

const App: FC = () => {
  return (
    <NavigationContainer>
      <AuthentificationProvider>
        <LoginNavigator />
      </AuthentificationProvider>
    </NavigationContainer>
  );
};

export default App;
