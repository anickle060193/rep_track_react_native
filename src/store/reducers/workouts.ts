import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import uuid from 'uuid/v4';

import { Workout, WorkoutsMap } from '@utils/workout';

export interface State
{
  workouts: WorkoutsMap;
}

const initialState: State = {
  workouts: {}
};

{
  let id = uuid();
  initialState.workouts[ id ] = { id: id, name: 'Testing', date: new Date(), sets: 1, reps: 1, weight: 120 };
  id = uuid();
  initialState.workouts[ id ] = { id: id, name: 'Testing 2', date: new Date( 0 ), sets: 123, reps: 12345, weight: 134520 };
}

const actionCreator = actionCreatorFactory( 'workouts' );

export const addWorkout = actionCreator<Workout>( 'ADD_WORKOUT' );
export const removeWorkout = actionCreator<string>( 'REMOVE_WORKOUT' );

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
  } );
