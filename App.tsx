import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import AuthentificationProvider from './src/providers/AuthentificationProvider';
import MainNavigator from './src/routes/MainNavigator';
import UserProvider from './src/providers/UserProvider';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

const App: FC = () => {
  return (
    <GestureHandlerRootView style={{flex: 1}}>
      <NavigationContainer>
        <AuthentificationProvider>
          <UserProvider>
            <MainNavigator />
          </UserProvider>
        </AuthentificationProvider>
      </NavigationContainer>
    </GestureHandlerRootView>
  );
};

export default App;
