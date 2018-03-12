import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationInjectedProps, NavigationScreenOptions } from 'react-navigation';

import { Routes } from '@utils/routes';

type Props = NavigationInjectedProps;

export default class Home extends React.Component<Props>
{
  static navigationOptions: NavigationScreenOptions = {
  };

  render()
  {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Workouts</Text>
        <Button
          title="New Workout"
          onPress={this.onNewWorkoutPress}
        />
      </View>
    );
  }

  private onNewWorkoutPress = () =>
  {
    this.props.navigation.navigate( Routes.NewWorkout );
  }
}
