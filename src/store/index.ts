import { createStore, Middleware, applyMiddleware } from 'redux';
import * as ReduxLoggerModule from 'redux-logger';
import * as ReduxImmutableStateInvariantModule from 'redux-immutable-state-invariant';

import { navigationMiddleware } from '@components/AppNav';

import rootReducer from '@store/reducers';

const middleWares: Middleware[] = [];

middleWares.push( navigationMiddleware );

if( __DEV__ )
{
  const { default: reduxImmutableStateInvariantModule } = require( 'redux-immutable-state-invariant' ) as typeof ReduxImmutableStateInvariantModule;
  middleWares.push( reduxImmutableStateInvariantModule() );

  const { createLogger } = require( 'redux-logger' ) as typeof ReduxLoggerModule;
  middleWares.unshift( createLogger( {
    colors: false,
    collapsed: false,
    diff: false,
    duration: true,
    predicate: ( getState, action ) => action.type !== 'Navigation/COMPLETE_TRANSITION'
  } ) );
}

const store = createStore<RootState>( rootReducer, applyMiddleware( ...middleWares ) );

if( module.hot )
{
  module.hot.accept( '@store/reducers', () =>
  {
    store.replaceReducer( rootReducer );
  } );
}

export default store;
