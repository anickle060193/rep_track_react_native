import * as React from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { range } from '@utils';
import { isExerciseRoute } from '@utils/routes';
import { ScreenConfig, mapParamsToProps } from '@utils/navigation';
import { Workout, WorkoutsMap, Exercise, formatWorkoutName } from '@utils/workout';

interface PropsFromState
{
  workouts: WorkoutsMap;
}

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
}

type Props = PropsFromState & OwnProps;

class ExerciseScreen extends React.Component<Props>
{
  static navigationOptions: ScreenConfig<OwnProps> = ( { workout, exerciseIndex } ) => ( {
    title: `${workout.exercises[ exerciseIndex ].name} - ${formatWorkoutName( workout )}`
  } );

  render()
  {
    let workout = this.props.workouts[ this.props.workout.id ];
    let exercise = workout.exercises[ this.props.exerciseIndex ];

    return (
      <FlatList
        style={styles.setsList}
        data={range( exercise.sets, 1 )}
        keyExtractor={( setNumber ) => setNumber}
        renderItem={( { item: setNumber } ) => (
          <SetListItem
            setNumber={setNumber}
            exercise={exercise}
          />
        )}
      />
    );
  }
}

const SetListItem: React.SFC<{ setNumber: number, exercise: Exercise }> = ( { setNumber, exercise } ) => (
  <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}>
    <View style={styles.setListItem}>
      <Text style={styles.setListItemTitle}>
        Set {setNumber}: {exercise.reps} reps @ {exercise.weight} lbs
      </Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create( {
  setsList: {
    flex: 1
  },
  setListItem: {
    padding: 16,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  setListItemTitle: {
    fontSize: 22
  }
} );

const ConnectedExerciseScreen = connect<PropsFromState, {}, OwnProps, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
  }
)( ExerciseScreen );

export default mapParamsToProps<OwnProps>( ( route ) =>
{
  if( !isExerciseRoute( route ) )
  {
    throw new Error( 'Route is invalid Exercise route.' );
  }

  return {
    workout: route.params.workout,
    exerciseIndex: route.params.exerciseIndex
  };
} )( ConnectedExerciseScreen );
