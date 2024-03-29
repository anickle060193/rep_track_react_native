import { createStore, Middleware, applyMiddleware } from 'redux';
import * as ReduxLoggerModule from 'redux-logger';

import { navigationMiddleware } from '@components/AppNav';

import rootReducer from '@store/reducers';

const middleWares: Middleware[] = [];

middleWares.push( navigationMiddleware );

if( __DEV__ )
{
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

if( __DEV__ )
{
  if( module.hot )
  {
    module.hot.accept( () =>
    {
      const newRootReducer = require( '@store/reducers' ).default;
      store.replaceReducer( newRootReducer );
    } );
  }
}

export default store;
