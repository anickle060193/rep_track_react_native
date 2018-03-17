import * as React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { NavigationStackScreenOptions, NavigationScreenConfig, NavigationScreenProps } from 'react-navigation';
import ActionButton from 'react-native-action-button';
import { MKColor } from 'react-native-material-kit';
import Icon from 'react-native-vector-icons/MaterialIcons';

import EditButton from '@components/EditButton';
import NewExerciseModal from '@components/NewExerciseModal';

import { setWorkoutEditing } from '@store/reducers/navigation';
import { addExercise } from '@store/reducers/workouts';

import { WorkoutsMap, Exercise } from '@utils/workout';
import { isWorkoutRoute } from '@utils/routes';

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
}

type OwnProps = NavigationScreenProps;

type Props = PropsFromState & PropsFromDispatch & OwnProps;

interface State
{
  showNewExercise: boolean;
}

class WorkoutScreen extends React.Component<Props, State>
{
  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ( { navigation, screenProps } ) =>
  {
    if( !isWorkoutRoute( navigation.state ) )
    {
      throw new Error( 'Route is not a workout route.' );
    }
    return {
      title: navigation.state.params.workout.date.toDateString(),
      headerRight: navigation.state.params.editing ? ( undefined ) : ( <StartEditButton /> )
    };
  };

  constructor( props: Props )
  {
    super( props );

    this.state = {
      showNewExercise: true
    };
  }

  render()
  {
    let route = this.props.navigation.state;
    if( !isWorkoutRoute( route ) )
    {
      throw new Error( 'Route is not a workout route.' );
    }

    let workout = this.props.workouts[ route.params.workout.id ];

    return (
      <View style={{ flex: 1 }}>
        <FlatList
          style={styles.exercisesList}
          data={workout.exercises}
          keyExtractor={( item, i ) => i.toString()}
          renderItem={( { item } ) => <ExerciseListItem exercise={item} />}
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
    let route = this.props.navigation.state;
    if( !isWorkoutRoute( route ) )
    {
      throw new Error( 'Route is not a workout route.' );
    }

    let workout = this.props.workouts[ route.params.workout.id ];

    this.props.addExercise( { workoutId: workout.id, exercise } );
    this.onCloseNewExerciseModal();
  }
}

const ExerciseListItem: React.SFC<{ exercise: Exercise }> = ( { exercise } ) => (
  <View style={styles.exerciseListItem}>
    <View style={styles.excerciseListItemNameColumn}>
      <Text style={styles.exerciseListItemName}>{exercise.name}</Text>
    </View>
    <View style={styles.exerciseListItemDetailsColumn}>
      <Text style={styles.exerciseListItemDetail}>{exercise.sets} sets</Text>
      <Text style={styles.exerciseListItemDetail}>{exercise.reps} reps</Text>
    </View>
  </View>
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

export default connect<PropsFromState, PropsFromDispatch, OwnProps, RootState>(
  ( state, props ) =>
    ( {
      workouts: state.workouts.workouts
    } ),
  {
    addExercise
  }
)( WorkoutScreen );
