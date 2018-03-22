import * as React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, View, TouchableNativeFeedback } from 'react-native';

import Fab from '@components/Fab';
import DoneButton from '@components/DoneButton';
import NewExerciseModal from '@components/NewExerciseModal';
import OverflowMenu from '@components/OverflowMenu';

import { setWorkoutEditing, navigateToExercise } from '@store/reducers/navigation';
import { addExercise } from '@store/reducers/workouts';

import { WorkoutsMap, Exercise, Workout, formatWorkoutName } from '@utils/workout';
import { isWorkoutRoute } from '@utils/routes';
import { mapParamsToProps, ScreenConfig } from '@utils/navigation';

interface MenuPropsFromDispatch
{
  setWorkoutEditing: typeof setWorkoutEditing;
}

interface MenuOwnProps
{
  editing: boolean;
}

type MenuProps = MenuPropsFromDispatch & MenuOwnProps;

const ConnectedMenu = connect<{}, MenuPropsFromDispatch, MenuOwnProps, RootState>(
  null,
  { setWorkoutEditing }
)( ( props: MenuProps ) => (
  props.editing ?
    (
      <DoneButton onPress={() => props.setWorkoutEditing( false )} />
    ) :
    (
      <OverflowMenu
        items={[
          { text: 'Edit', onPress: () => props.setWorkoutEditing( true ) },
          { text: 'Send to Watch', onPress: () => null }
        ]}
      />
    )
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
    headerRight: <ConnectedMenu editing={props.editing} />
  } )

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
        <Fab
          iconName="add"
          onPress={this.onNewExercisePress}
          show={this.props.editing}
        />
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
      <Text style={styles.exerciseListItemName}>{exercise.name}</Text>
      <Text style={styles.exerciseListItemDetail}>{exercise.sets.length} sets</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create( {
  exercisesList: {
    flex: 1
  },
  exerciseListItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  exerciseListItemName: {
    flex: 1,
    fontSize: 24
  },
  exerciseListItemDetail: {
    paddingRight: 4,
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
