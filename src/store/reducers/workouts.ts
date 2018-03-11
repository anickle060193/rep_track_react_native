import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { Workout } from '../../utils/workout';

export interface State
{
  workouts: Workout[];
}

const initialState: State = {
  workouts: []
};

const actionCreator = actionCreatorFactory( 'workouts' );

export const addWorkout = actionCreator<Workout>( 'ADD_WORKOUT' );

export const reducer = reducerWithInitialState( initialState )
  .case( addWorkout, ( state, workout ) =>
    ( {
      ...state,
      workouts: [ ...state.workouts, workout ]
    } ) );
