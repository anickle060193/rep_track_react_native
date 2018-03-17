import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import uuid from 'uuid/v4';

import { Workout, WorkoutsMap, Exercise, createNewExercise } from '@utils/workout';

export interface State
{
  workouts: WorkoutsMap;
}

const initialState: State = {
  workouts: {}
};

{
  let id = uuid();
  initialState.workouts[ id ] = {
    id: id,
    date: new Date(),
    exercises: [
      createNewExercise( 'Testing 2', 123, 12345, 134520 ),
      createNewExercise( 'Testing', 1, 1, 120 )
    ]
  };
  id = uuid();
  initialState.workouts[ id ] = {
    id: id,
    date: new Date( 0 ),
    exercises: [
      createNewExercise( 'Testing', 1, 1, 120 ),
      createNewExercise( 'Testing 2', 123, 12345, 134520 )
    ]
  };
}

const actionCreator = actionCreatorFactory( 'workouts' );

export const addWorkout = actionCreator<Workout>( 'ADD_WORKOUT' );
export const removeWorkout = actionCreator<string>( 'REMOVE_WORKOUT' );
export const addExercise = actionCreator<{ workoutId: string, exercise: Exercise }>( 'ADD_EXERCISE' );
export const removeExercise = actionCreator<{ workoutId: number, exerciseIndex: number }>( 'REMOVE_EXERCISE' );

export const reducer = reducerWithInitialState( initialState )
  .case( addWorkout, ( state, workout ) =>
    ( {
      ...state,
      workouts: {
        ...state.workouts,
        [ workout.id ]: workout
      }
    } ) )
  .case( removeWorkout, ( state, workoutId ) =>
  {
    let workouts = { ...state.workouts };
    delete workouts[ workoutId ];
    return {
      ...state,
      workouts
    };
  } )
  .case( addExercise, ( state, { workoutId, exercise } ) => ( {
    ...state,
    workouts: {
      ...state.workouts,
      [ workoutId ]: {
        ...state.workouts[ workoutId ],
        exercises: [
          ...state.workouts[ workoutId ].exercises,
          exercise
        ]
      }
    }
  } ) )
  .case( removeExercise, ( state, { workoutId, exerciseIndex } ) =>
  {
    let exercises = [ ...state.workouts[ workoutId ].exercises ];
    exercises.splice( exerciseIndex, 1 );
    return {
      ...state,
      workouts: {
        ...state.workouts,
        [ workoutId ]: {
          ...state.workouts[ workoutId ],
          exercises: exercises
        }
      }
    };
  } );
