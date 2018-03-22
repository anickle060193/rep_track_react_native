import * as React from 'react';
import { connect } from 'react-redux';

import CompletedExerciseSet from './CompletedExerciseSet';
import IncompleteExerciseSet from './IncompleteExerciseSet';

import { mapParamsToProps, ScreenConfig } from '@utils/navigation';
import { isExerciseSetRoute } from '@utils/routes';
import { Workout, WorkoutsMap } from '@utils/workout';

interface PropsFromState
{
  workouts: WorkoutsMap;
}

interface OwnProps
{
  workout: Workout;
  exerciseIndex: number;
  setIndex: number;
}

type Props = PropsFromState & OwnProps;

class ExerciseSetScreen extends React.Component<Props>
{
  static navigationOptions: ScreenConfig<OwnProps> = ( { workout, exerciseIndex, setIndex } ) => ( {
    title: `${workout.exercises[ exerciseIndex ].name}: Set ${setIndex + 1} - ${workout.name}`
  } )

  render()
  {
    let workout = this.props.workouts[ this.props.workout.id ];
    let exercise = workout.exercises[ this.props.exerciseIndex ];
    let set = exercise.sets[ this.props.setIndex ];

    if( set.completed )
    {
      return (
        <CompletedExerciseSet
          workout={workout}
          exerciseIndex={this.props.exerciseIndex}
          setIndex={this.props.setIndex}
        />
      );
    }
    else
    {
      return (
        <IncompleteExerciseSet
          workout={workout}
          exerciseIndex={this.props.exerciseIndex}
          setIndex={this.props.setIndex}
        />
      );
    }
  }
}

const ConnectedExerciseSetScreen = connect<PropsFromState, {}, OwnProps, RootState>(
  ( state ) => ( {
    workouts: state.workouts.workouts
  } ),
  {
  }
)( ExerciseSetScreen );

export default mapParamsToProps<OwnProps>(
  ( route ) =>
  {
    if( !isExerciseSetRoute( route ) )
    {
      throw new Error( 'Route is invalid Exercise Set route.' );
    }

    return {
      workout: route.params.workout,
      exerciseIndex: route.params.exerciseIndex,
      setIndex: route.params.setIndex
    };
  }
)( ConnectedExerciseSetScreen );
