import { createStore, Middleware, applyMiddleware } from 'redux';
import * as ReduxLogger from 'redux-logger';

import { navigationMiddleware } from '@components/AppNav';

import rootReducer from '@store/reducers';

const middleWares: Middleware[] = [];

middleWares.push( navigationMiddleware );

if( __DEV__ )
{
  const { createLogger } = require( 'redux-logger' ) as typeof ReduxLogger;
  middleWares.unshift( createLogger( {
    colors: false,
    collapsed: false,
    diff: false,
    duration: true,
  } ) );
}

const store = createStore<RootState>( rootReducer, applyMiddleware( ...middleWares ) );

export default store;
