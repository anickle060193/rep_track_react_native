import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Workout } from '@utils/workout';

export interface State
{
  workouts: Workout[];
}

const initialState: State = {
  workouts: [
    { name: 'Testing', date: new Date(), sets: 1, reps: 1, weight: 120 },
    { name: 'Testing 2', date: new Date( 0 ), sets: 123, reps: 12345, weight: 134520 }
  ]
};

const actionCreator = actionCreatorFactory( 'workouts' );

export const addWorkout = actionCreator<Workout>( 'ADD_WORKOUT' );

export const reducer = reducerWithInitialState( initialState )
  .case( addWorkout, ( state, workout ) =>
    ( {
      ...state,
      workouts: [ ...state.workouts, workout ]
    } ) );
