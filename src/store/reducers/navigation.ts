import { actionCreatorFactory } from 'typescript-fsa';
import { reducerWithInitialState } from 'typescript-fsa-reducers';
import { NavigationActions, NavigationLeafRoute } from 'react-navigation';

import { Routes, RouteParams, isWorkoutRoute } from '@utils/routes';
import { Workout } from '@utils/workout';

interface RouteLeaf extends NavigationLeafRoute
{
  routeName: Routes;
  params: RouteParams;
}

export interface State
{
  index: number;
  routes: RouteLeaf[];
}

const initialState: State = {
  index: 0,
  routes: [ { key: Routes.Workouts, routeName: Routes.Workouts, params: { route: Routes.Workouts } } ]
}

const actionCreator = actionCreatorFactory();

export const navigateBack = actionCreator( NavigationActions.BACK );
export const navigateToNewWorkout = actionCreator( 'NAVIGATE_TO_NEW_WORKOUT' );
export const navigateToWorkout = actionCreator<Workout>( 'NAVIGATE_TO_WORKOUT' );
export const setWorkoutEditing = actionCreator<boolean>( 'SET_WORKOUT_EDITING' );

const getCurrentRoute = ( state: State ) => state.routes[ state.index ];

const addRoute = ( state: State, route: RouteLeaf ): State => ( {
  ...state,
  index: state.index + 1,
  routes: [
    ...state.routes,
    route
  ]
} );

export const reducer = reducerWithInitialState<State>( initialState )
  .case( navigateToNewWorkout, ( state ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( currentRoute.routeName === Routes.NewWorkout )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: Routes.NewWorkout,
        routeName: Routes.NewWorkout,
        params: { route: Routes.NewWorkout }
      } );
    }
  } )
  .case( navigateToWorkout, ( state, workout ) =>
  {
    let currentRoute = getCurrentRoute( state );
    if( isWorkoutRoute( currentRoute )
      && currentRoute.params.workout.id === workout.id )
    {
      return state;
    }
    else
    {
      return addRoute( state, {
        key: workout.id,
        routeName: Routes.Workout,
        params: { route: Routes.Workout, workout: workout, editing: false }
      } );
    }
  } )
  .case( setWorkoutEditing, ( state, editing ) =>
  {
    if( isWorkoutRoute( state.routes[ state.index ] ) )
    {
      let routes = [ ...state.routes ];
      routes[ state.index ] = {
        ...state.routes[ state.index ],
        params: {
          ...state.routes[ state.index ].params,
          editing
        }
      };
      return {
        ...state,
        routes
      };
    }
    else
    {
      return state;
    }
  } )
  .case( navigateBack, ( state ) =>
  {
    if( state.index === 0 )
    {
      return state;
    }
    else
    {
      return {
        index: state.index - 1,
        routes: state.routes.slice( 0, state.index - 2 )
      }
    }
  } );
