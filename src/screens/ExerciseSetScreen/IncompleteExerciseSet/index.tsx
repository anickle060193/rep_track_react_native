import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, Button } from 'react-native';

import { markExerciseSetComplete } from '@store/reducers/workouts';

import { Workout } from '@utils/workout';

interface PropsFromDispatch
{
  markExerciseSetComplete: typeof markExerciseSetComplete;
}

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
  setIndex: number;
}

type Props = PropsFromDispatch & OwnProps;

class IncompleteExerciseSet extends React.Component<Props>
{
  render()
  {
    return (
      <View style={styles.column}>
        <View style={styles.column}>
          <Text>Incomplete</Text>
        </View>

        <View style={styles.markSetCompletedButton}>
          <Button
            title="Mark Set Completed"
            onPress={this.onMarkSetCompletedPress}
          />
        </View>
      </View>
    );
  }

  private onMarkSetCompletedPress = () =>
  {
    this.props.markExerciseSetComplete( {
      workoutId: this.props.workout.id,
      exerciseIndex: this.props.exerciseIndex,
      setIndex: this.props.setIndex
    } );
  }
}

const styles = StyleSheet.create( {
  column: {
    flex: 1,
    flexDirection: 'column'
  },
  markSetCompletedButton: {
    flexDirection: 'column',
    margin: 16
  }
} );

export default connect<{}, PropsFromDispatch, OwnProps, RootState>(
  ( state ) => ( {} ),
  {
    markExerciseSetComplete
  }
)( IncompleteExerciseSet );
