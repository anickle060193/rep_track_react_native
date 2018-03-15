import { combineReducers } from 'redux';

import { State as NavigationState, reducer as navigationReducer } from '@store/reducers/navigation';
import { State as WorkoutsState, reducer as workoutsReducer } from '@store/reducers/workouts';

declare global
{
  export interface RootState
  {
    navigation: NavigationState;
    workouts: WorkoutsState;
  }
}

export default combineReducers<RootState>( {
  navigation: navigationReducer,
  workouts: workoutsReducer
} );
