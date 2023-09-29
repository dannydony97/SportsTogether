import {NavigationContainer} from '@react-navigation/native';
import React, {FC} from 'react';
import LoginNavigator from './src/routes/LoginNavigator';
import {PaperProvider} from 'react-native-paper';

const App: FC = () => {
  return (
    <PaperProvider>
      <NavigationContainer>
        <LoginNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
};

export default App;
