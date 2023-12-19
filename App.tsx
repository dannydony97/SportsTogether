import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import AuthentificationProvider from './src/providers/AuthentificationProvider';
import MainNavigator from './src/routes/MainNavigator';
import UserProvider from './src/providers/UserProvider';

const App: FC = () => {
  return (
    <NavigationContainer>
      <AuthentificationProvider>
        <UserProvider>
          <MainNavigator />
        </UserProvider>
      </AuthentificationProvider>
    </NavigationContainer>
  );
};

export default App;
