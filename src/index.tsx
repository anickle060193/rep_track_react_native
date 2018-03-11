import * as React from 'react';
import { StackNavigator } from 'react-navigation';

import Workouts from './screens/Workouts';
import NewWorkout from './screens/NewWorkout';

import { Routes } from './routes';

const RootStack = StackNavigator(
  {
    [ Routes.Workouts ]: { screen: Workouts },
    [ Routes.NewWorkout ]: { screen: NewWorkout }
  },
  {
    initialRouteName: Routes.Workouts,

    navigationOptions: {
      title: 'Rep Tracker',
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
      <RootStack />
    );
  }
}
