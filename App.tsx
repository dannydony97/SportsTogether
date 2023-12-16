import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import AuthentificationProvider from './src/providers/AuthentificationProvider';
import MainNavigator from './src/routes/MainNavigator';

const App: FC = () => {
  return (
    <NavigationContainer>
      <AuthentificationProvider>
        <MainNavigator />
      </AuthentificationProvider>
    </NavigationContainer>
  );
};

export default App;
