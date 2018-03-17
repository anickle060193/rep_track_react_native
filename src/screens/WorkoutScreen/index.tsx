import * as React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, View, TouchableNativeFeedback } from 'react-native';
import ActionButton from 'react-native-action-button';
import { MKColor } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EditButton from '@components/EditButton';
import NewExerciseModal from '@components/NewExerciseModal';

import { setWorkoutEditing, navigateToExercise } from '@store/reducers/navigation';
import { addExercise } from '@store/reducers/workouts';

import { WorkoutsMap, Exercise, Workout, formatWorkoutName } from '@utils/workout';
import { isWorkoutRoute } from '@utils/routes';
import { mapParamsToProps, ScreenConfig } from '@utils/navigation';

const StartEditButton = connect<{}, { setWorkoutEditing: typeof setWorkoutEditing }, {}, RootState>(
  null,
  { setWorkoutEditing }
)( ( { setWorkoutEditing } ) => (
  <EditButton onPress={() => setWorkoutEditing( true )} />
) );

interface PropsFromState
{
  workouts: WorkoutsMap;
}

interface PropsFromDispatch
{
  addExercise: typeof addExercise;
  navigateToExercise: typeof navigateToExercise;
}

interface OwnProps
{
  workout: Workout;
  editing: boolean;
}

type Props = PropsFromState & PropsFromDispatch & OwnProps;

interface State
{
  showNewExercise: boolean;
}

class WorkoutScreen extends React.Component<Props, State>
{
  static navigationOptions: ScreenConfig<OwnProps> = ( props ) => ( {
    title: formatWorkoutName( props.workout ),
    headerRight: props.editing ? ( undefined ) : ( <StartEditButton /> )
  } );

  constructor( props: Props )
  {
    super( props );

    this.state = {
      showNewExercise: false
    };
  }

  render()
  {
    let workout = this.props.workouts[ this.props.workout.id ];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.exercisesList}
          data={workout.exercises}
          keyExtractor={( exercise, i ) => i.toString()}
          renderItem={( { item: exercise, index } ) => (
            <ExerciseListItem
              exercise={exercise}
              onPress={() => this.onExerciseClick( index )}
            />
          )}
        />
        <ActionButton
          onPress={this.onNewExercisePress}
          buttonColor={MKColor.DeepOrange}
        >
          <Icon name="add" />
        </ActionButton>
        <NewExerciseModal
          show={this.state.showNewExercise}
          onClose={this.onCloseNewExerciseModal}
          onAddExercise={this.onAddExercise}
        />
      </View>
    );
  }

  private onNewExercisePress = () =>
  {
    this.setState( { showNewExercise: true } );
  }

  private onCloseNewExerciseModal = () =>
  {
    this.setState( { showNewExercise: false } );
  }

  private onAddExercise = ( exercise: Exercise ) =>
  {
    this.props.addExercise( { workoutId: this.props.workout.id, exercise } );
    this.onCloseNewExerciseModal();
  }

  private onExerciseClick = ( exerciseIndex: number ) =>
  {
    let workout = this.props.workouts[ this.props.workout.id ];

    this.props.navigateToExercise( {
      workout: workout,
      exerciseIndex: exerciseIndex
    } );
  }
}

const ExerciseListItem: React.SFC<{ exercise: Exercise, onPress: () => void }> = ( { exercise, onPress } ) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={onPress}
  >
    <View style={styles.exerciseListItem}>
      <View style={styles.excerciseListItemNameColumn}>
        <Text style={styles.exerciseListItemName}>{exercise.name}</Text>
      </View>
      <View style={styles.exerciseListItemDetailsColumn}>
        <Text style={styles.exerciseListItemDetail}>{exercise.setCount} sets</Text>
        <Text style={styles.exerciseListItemDetail}>{exercise.repCount} reps</Text>
      </View>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create( {
  exercisesList: {
    flex: 1
  },
  exerciseListItem: {
    flex: 1,
    flexDirection: 'row',
    padding: 8,
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  excerciseListItemNameColumn: {
    flex: 1,
    paddingLeft: 16,
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center'
  },
  exerciseListItemName: {
    fontSize: 32
  },
  exerciseListItemDetailsColumn: {
    flexDirection: 'column',
    alignItems: 'flex-end',
    paddingRight: 16
  },
  exerciseListItemDetail: {
    padding: 4,
    fontSize: 22
  }
} );

const ConnectedWorkoutScreen = connect<PropsFromState, PropsFromDispatch, OwnProps, RootState>(
  ( state, props ) =>
    ( {
      workouts: state.workouts.workouts
    } ),
  {
    addExercise,
    navigateToExercise
  }
)( WorkoutScreen );

export default mapParamsToProps<OwnProps>( ( route ) =>
{
  if( !isWorkoutRoute( route ) )
  {
    throw new Error( 'Route is invalid Workout route.' );
  }

  return {
    workout: route.params.workout,
    editing: route.params.editing
  };
} )( ConnectedWorkoutScreen );
