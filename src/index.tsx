import * as React from 'react';
import { StatusBar, View } from 'react-native';
import { Provider } from 'react-redux';
import { StackNavigator } from 'react-navigation';

import Workouts from '@screens/Workouts';
import NewWorkout from '@screens/NewWorkout';
import WorkoutScreen from '@screens/WorkoutScreen';

import store from '@store';

import { Routes } from '@utils/routes';

const RootStack = StackNavigator(
  {
    [ Routes.Workouts ]: { screen: Workouts },
    [ Routes.NewWorkout ]: { screen: NewWorkout },
    [ Routes.Workout ]: { screen: WorkoutScreen }
  },
  {
    initialRouteName: Routes.Workouts,

    navigationOptions: {
      title: 'Rep Tracker' + ( __DEV__ ? ` ${new Date().toTimeString()}` : '' ),
      headerStyle: {
        backgroundColor: '#FF5722'
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      }
    }
  }
);

export default class App extends React.Component
{
  render()
  {
    return (
      <View style={{ width: '100%', height: '100%' }}>
        <StatusBar backgroundColor="#BF360C" />
        <Provider store={store}>
          <RootStack />
        </Provider>
      </View>
    );
  }
}
