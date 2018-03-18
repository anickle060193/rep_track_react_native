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
      createNewExercise( 'Testing 2', 20, 20, 20 ),
      createNewExercise( 'Testing', 1, 1, 20 )
    ]
  };
  id = uuid();
  initialState.workouts[ id ] = {
    id: id,
    date: new Date( 0 ),
    exercises: [
      createNewExercise( 'Testing', 1, 1, 20 ),
      createNewExercise( 'Testing 2', 20, 20, 20 )
    ]
  };
}

const actionCreator = actionCreatorFactory();

export const addWorkout = actionCreator<Workout>( 'ADD_WORKOUT' );
export const removeWorkout = actionCreator<string>( 'REMOVE_WORKOUT' );
export const addExercise = actionCreator<{ workoutId: string, exercise: Exercise }>( 'ADD_EXERCISE' );
export const removeExercise = actionCreator<{ workoutId: string, exerciseIndex: number }>( 'REMOVE_EXERCISE' );
export const markExerciseSetComplete = actionCreator<{ workoutId: string, exerciseIndex: number, setIndex: number }>( 'MARK_EXERCISE_SET_COMPLETE' );

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
  } )
  .case( markExerciseSetComplete, ( state, { workoutId, exerciseIndex, setIndex } ) =>
  {
    let exercises = [ ...state.workouts[ workoutId ].exercises ];
    let exercise = exercises[ exerciseIndex ];
    let sets = [ ...exercise.sets ];
    let set = sets[ setIndex ];

    sets[ setIndex ] = {
      ...set,
      completed: true
    };

    exercises[ exerciseIndex ] = {
      ...exercise,
      sets
    };

    return {
      ...state,
      workouts: {
        ...state.workouts,
        [ workoutId ]: {
          ...state.workouts[ workoutId ],
          exercises
        }
      }
    };
  } );
