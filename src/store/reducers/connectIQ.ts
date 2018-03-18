import actionCreatorFactory from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';

import { IQDevice } from '@utils/connectIQ';

export interface State
{
  device: IQDevice | null;
}

const initialState: State = {
  device: null
};

const actionCreator = actionCreatorFactory();

export const setConnectIQDevice = actionCreator<IQDevice>( 'SET_CONNECT_IQ_DEVICE' );

export const reducer = reducerWithInitialState<State>( initialState )
  .case( setConnectIQDevice, ( state, device ) =>
    ( {
      ...state,
      device
    } ) );
