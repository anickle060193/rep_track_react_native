import { combineReducers } from 'redux';

import { State as WorkoutsState, reducer as workoutsReducer } from './workouts';

declare global
{
  export interface RootState
  {
    workouts: WorkoutsState;
  }
}

export default combineReducers<RootState>( {
  workouts: workoutsReducer
} );
