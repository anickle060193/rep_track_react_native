import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, Button, StyleSheet, FlatList, TouchableNativeFeedback } from 'react-native';
import { NavigationInjectedProps, NavigationScreenOptions } from 'react-navigation';

import { Routes } from '@utils/routes';
import { Workout } from '@utils/workout';

interface PropsFromState
{
  workouts: Workout[];
}

type OwnProps = NavigationInjectedProps;

type Props = PropsFromState & OwnProps;

class Home extends React.Component<Props>
{
  static navigationOptions: NavigationScreenOptions = {
  };

  render()
  {
    return (
      <View style={styles.column}>
        <FlatList
          style={styles.workoutsList}
          data={this.props.workouts}
          keyExtractor={( workout: Workout ) => workout.date.toString()}
          renderItem={( { item } ) => <WorkoutListItem workout={item} />}
        />
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

const WorkoutListItem: React.SFC<{ workout: Workout }> = ( { workout } ) => (
  <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
    <View style={styles.workoutListItem}>
      <Text>{workout.name}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create( {
  column: {
    flexDirection: 'column',
    flex: 1
  },
  workoutsList: {
    flex: 1
  },
  workoutListItem: {
    height: 40,
    padding: 8
  }
} );

export default connect<PropsFromState, {}, OwnProps, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
  }
)( Home );
