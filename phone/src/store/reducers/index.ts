import { combineReducers } from 'redux';

import { State as NavigationState, reducer as navigationReducer } from '@store/reducers/navigation';
import { State as WorkoutsState, reducer as workoutsReducer } from '@store/reducers/workouts';
import { State as ConnectIQState, reducer as connectIQReducer } from '@store/reducers/connectIQ';

declare global
{
  export interface RootState
  {
    navigation: NavigationState;
    workouts: WorkoutsState;
    connectIQ: ConnectIQState;
  }
}

export default combineReducers<RootState>( {
  navigation: navigationReducer,
  workouts: workoutsReducer,
  connectIQ: connectIQReducer
} );
