import * as React from 'react';
import { connect } from 'react-redux';
import { View, Text, StyleSheet, TouchableNativeFeedback } from 'react-native';
import { NavigationScreenOptions } from 'react-navigation';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ActionButton from 'react-native-action-button';
import { MKColor } from 'react-native-material-kit';
import { SwipeListView, RowsMap } from 'react-native-swipe-list-view';
import uuid from 'uuid/v4';

import { removeWorkout, addWorkout } from '@store/reducers/workouts';
import { navigateToWorkout, setWorkoutEditing } from '@store/reducers/navigation';

import { Workout, WorkoutsMap, workoutsMapToArray } from '@utils/workout';

interface PropsFromState
{
  workouts: WorkoutsMap;
}

interface PropsFromDispatch
{
  addWorkout: typeof addWorkout;
  removeWorkout: typeof removeWorkout;
  navigateToWorkout: typeof navigateToWorkout;
  setWorkoutEditing: typeof setWorkoutEditing;
}

type Props = PropsFromState & PropsFromDispatch;

class Home extends React.Component<Props>
{
  static navigationOptions: NavigationScreenOptions = {
  };

  render()
  {
    let workouts = workoutsMapToArray( this.props.workouts )
      .sort( ( a, b ) => a.date.getTime() - b.date.getTime() )
      .reverse();

    return (
      <View style={styles.column}>
        <SwipeListView
          style={styles.workoutsList}
          useFlatList={true}
          stopLeftSwipe={0}
          rightOpenValue={-200}
          closeOnRowBeginSwipe={true}
          closeOnRowPress={true}
          closeOnScroll={true}
          data={workouts}
          keyExtractor={( workout: Workout ) => workout.id}
          renderItem={( { item: workout } ) => (
            <WorkoutListItem
              workout={workout}
              onPress={() => this.onWorkoutPress( workout )}
              onLongPress={() => this.onWorkoutLongPress( workout )}
            />
          )}
          renderHiddenItem={( { item: workout } ) => (
            <View style={styles.workListItemSwipeBack}>
              <Icon style={styles.workoutListItemDelete} name="delete" />
            </View>
          )}
          onRowOpen={this.onRowOpen}
        />
        <ActionButton
          onPress={this.onNewWorkoutPress}
          buttonColor={MKColor.DeepOrange}
        >
          <Icon name="add" />
        </ActionButton>
      </View>
    );
  }

  private onNewWorkoutPress = () =>
  {
    let workout: Workout = {
      id: uuid(),
      date: new Date(),
      exercises: []
    };
    this.props.addWorkout( workout );
    this.props.navigateToWorkout( workout );
    this.props.setWorkoutEditing( true );
  }

  private onRowOpen = ( workoutId: string, rows: RowsMap ) =>
  {
    rows[ workoutId ].closeRow();
    this.props.removeWorkout( workoutId );
  }

  private onWorkoutPress = ( workout: Workout ) =>
  {
    this.props.navigateToWorkout( workout );
  }

  private onWorkoutLongPress = ( workout: Workout ) =>
  {
    this.props.addWorkout( {
      ...workout,
      id: uuid(),
      date: new Date()
    } );
  }
}

const WorkoutListItem: React.SFC<{
  workout: Workout;
  onPress: () => void;
  onLongPress: () => void;
}> = ( { workout, onPress, onLongPress } ) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.SelectableBackground()}
    onPress={onPress}
    onLongPress={onLongPress}
  >
    <View style={styles.workoutListItem}>
      <Text style={styles.workoutListItemTitle}>
        {workout.date.toDateString()}
      </Text>
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
    padding: 16,
    backgroundColor: 'white',
    borderBottomColor: 'lightgray',
    borderBottomWidth: 1
  },
  workoutListItemTitle: {
    fontSize: 22
  },
  workListItemSwipeBack: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    backgroundColor: 'red'
  },
  workoutListItemDelete: {
    width: 75,
    fontSize: 36,
    textAlign: 'center',
    color: 'white'
  }
} );

export default connect<PropsFromState, PropsFromDispatch, {}, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
    addWorkout,
    removeWorkout,
    navigateToWorkout,
    setWorkoutEditing
  }
)( Home );
