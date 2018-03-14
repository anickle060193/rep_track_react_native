import * as React from 'react';
import { connect } from 'react-redux';
import { Text, FlatList, StyleSheet, View } from 'react-native';
import { NavigationStackScreenOptions, NavigationScreenConfig, NavigationScreenProps } from 'react-navigation';

import EditButton from '@components/EditButton';

import { WorkoutsMap, Exercise } from '@utils/workout';
import { isWorkoutRoute } from '@utils/routes';
import { navParams } from '@utils';

interface PropsFromState
{
  workouts: WorkoutsMap;
}

type OwnProps = NavigationScreenProps;

type Props = PropsFromState & OwnProps;

class WorkoutScreen extends React.Component<Props>
{
  static navigationOptions: NavigationScreenConfig<NavigationStackScreenOptions> = ( { navigation } ) => ( {
    title: isWorkoutRoute( navigation.state.params ) && navigation.state.params.workout.date.toDateString() || 'Workout',
    headerRight: navParams( navigation.state.params, ( p ) => p.editing, false ) ? undefined : <EditButton onPress={() => navigation.setParams( { ...navigation.state.params, editing: true } )} />
  } );

  render()
  {
    let { params } = this.props.navigation.state;
    if( !isWorkoutRoute( params ) )
    {
      throw new Error( 'No workoutID in params.' );
    }

    let workout = this.props.workouts[ params.workout.id ];

    return (
      <FlatList
        style={styles.exercisesList}
        data={workout.exercises}
        keyExtractor={( item, i ) => i.toString()}
        renderItem={( { item } ) => <ExerciseListItem exercise={item} />}
      />
    );
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

export default connect<PropsFromState, {}, OwnProps, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
  }
)( WorkoutScreen );
