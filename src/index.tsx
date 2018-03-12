import * as React from 'react';
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
      title: 'Rep Tracker' + ( __DEV__ ? new Date().toTimeString() : '' ),
      headerStyle: {
        backgroundColor: '#f4511e'
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
      <Provider store={store}>
        <RootStack />
      </Provider>
    );
  }
}
