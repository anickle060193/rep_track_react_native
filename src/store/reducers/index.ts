import { combineReducers } from 'redux';

import { State as WorkoutsState, reducer as workoutsReducer } from '@store/reducers/workouts';

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
