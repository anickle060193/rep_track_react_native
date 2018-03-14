import { createStore, Middleware, applyMiddleware } from 'redux';
import * as ReduxLogger from 'redux-logger';

import rootReducer from 'store/reducers';

const middleWares: Middleware[] = [];

if( __DEV__ )
{
  const { createLogger } = require( 'redux-logger' ) as typeof ReduxLogger;
  middleWares.unshift( createLogger( {
    collapsed: true,
    diff: false,
    duration: true,
  } ) );
}

const store = createStore<RootState>( rootReducer, applyMiddleware( ...middleWares ) );

export default store;
