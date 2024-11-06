import React from 'react';
import 'react-native-gesture-handler';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';
import Routes from './src/Routes';
import { Provider } from 'react-redux';
import store from './src/store';
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Sending `onAnimatedValueUpdate` with no listeners registered']);
LogBox.ignoreAllLogs(true);



const App = () => {
  const theme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      background: '#000',
    },
  };
  return (
    <Provider store={store}>
    <NavigationContainer theme={theme}>
      <Routes />
    </NavigationContainer>
    </Provider>
  );
}

export default App;
