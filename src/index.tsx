import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import KeepAwake from 'react-native-keep-awake';

import AppNav from '@components/AppNav';

import store from '@store';

export default class App extends React.Component
{
  render()
  {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <StatusBar backgroundColor="#BF360C" />
        <Provider store={store}>
          <AppNav />
        </Provider>
        {__DEV__ && <KeepAwake />}
      </View>
    );
  }
}
