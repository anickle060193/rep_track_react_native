import * as React from 'react';
import { connect } from 'react-redux';
import { FlatList, Text, StyleSheet, TouchableNativeFeedback, View } from 'react-native';

import { navigateToExerciseSet } from '@store/reducers/navigation';

import { range } from '@utils';
import { isExerciseRoute } from '@utils/routes';
import { ScreenConfig, mapParamsToProps } from '@utils/navigation';
import { Workout, WorkoutsMap, Exercise, formatWorkoutName } from '@utils/workout';

interface PropsFromState
{
  workouts: WorkoutsMap;
}

interface PropsFromDispatch
{
  navigateToExerciseSet: typeof navigateToExerciseSet;
}

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
}

type Props = PropsFromState & PropsFromDispatch & OwnProps;

class ExerciseScreen extends React.Component<Props>
{
  static navigationOptions: ScreenConfig<OwnProps> = ( { workout, exerciseIndex } ) => ( {
    title: `${workout.exercises[ exerciseIndex ].name} - ${formatWorkoutName( workout )}`
  } )

  render()
  {
    let workout = this.props.workouts[ this.props.workout.id ];
    let exercise = workout.exercises[ this.props.exerciseIndex ];

    return (
      <FlatList
        style={styles.setsList}
        data={range( exercise.sets.length )}
        keyExtractor={( setIndex: number ) => setIndex.toString()}
        renderItem={( { item: setIndex } ) => (
          <SetListItem
            setIndex={setIndex}
            exercise={exercise}
            onPress={() => this.onExerciseSetPress( setIndex )}
          />
        )}
      />
    );
  }

  private onExerciseSetPress = ( setIndex: number ) =>
  {
    let workout = this.props.workouts[ this.props.workout.id ];
    this.props.navigateToExerciseSet( {
      workout,
      exerciseIndex: this.props.exerciseIndex,
      setIndex
    } );
  }
}

const SetListItem: React.SFC<{ setIndex: number, exercise: Exercise, onPress: () => void }> = ( { setIndex, exercise, onPress } ) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={onPress}
  >
    <View style={styles.setListItem}>
      <Text
        style={[
          styles.setListItemTitle,
          exercise.sets[ setIndex ].completed ? styles.setListItemCompleted : {}
        ]}
      >
        Set {setIndex + 1}: {exercise.sets[ setIndex ].repCount} reps @ {exercise.sets[ setIndex ].weight} lbs
      </Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create( {
  setsList: {
    flex: 1
  },
  setListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  setListItemTitle: {
    fontSize: 22
  },
  setListItemCompleted: {
    textDecorationLine: 'line-through'
  }
} );

const ConnectedExerciseScreen = connect<PropsFromState, PropsFromDispatch, OwnProps, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
    navigateToExerciseSet
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
