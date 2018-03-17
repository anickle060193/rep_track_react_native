import { NavigationLeafRoute } from 'react-navigation';

import { Workout } from '@utils/workout';

export const enum Routes
{
  Workouts = 'Workouts',
  Workout = 'Workout',
  Exercise = 'Exercise'
}

export interface WorkoutRouteParams
{
  workout: Workout;
  editing: boolean;
}

export interface ExerciseRouteParams
{
  workout: Workout;
  exerciseIndex: number;
}

export type RouteParams = (
  {} |
  WorkoutRouteParams |
  ExerciseRouteParams
);

interface BaseRouteLeaf<R extends Routes, P extends RouteParams = {}> extends NavigationLeafRoute
{
  routeName: R;
  params: P;
}

type WorkoutRouteLeaf = BaseRouteLeaf<Routes.Workout, WorkoutRouteParams>;
type ExerciseRouteLeaf = BaseRouteLeaf<Routes.Exercise, ExerciseRouteParams>;

export type RouteLeaf = (
  BaseRouteLeaf<Routes.Workouts, {}> |
  WorkoutRouteLeaf |
  ExerciseRouteLeaf
);

export function isWorkoutRoute( route: RouteLeaf | NavigationLeafRoute | undefined ): route is WorkoutRouteLeaf
{
  return ( !!route
    && route.routeName === Routes.Workout
    && !!route.params
    && !!( ( route as WorkoutRouteLeaf ).params.workout ) );
}

export function isExerciseRoute( route: RouteLeaf | NavigationLeafRoute ): route is ExerciseRouteLeaf
{
  return ( !!route
    && route.routeName === Routes.Exercise
    && !!route.params
    && !!( ( route as ExerciseRouteLeaf ).params.workout )
    && ( route as ExerciseRouteLeaf ).params.exerciseIndex >= 0 );
}
