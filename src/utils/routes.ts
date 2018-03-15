import { Workout } from "@utils/workout";
import { NavigationLeafRoute } from "react-navigation";

export const enum Routes
{
  Workouts = 'Workouts',
  NewWorkout = 'NewWorkout',
  Workout = 'Workout'
}

export interface WorkoutRouteParams
{
  workout: Workout;
  editing: boolean;
}

export type RouteParams = (
  {} |
  WorkoutRouteParams
);

interface BaseRouteLeaf<R extends Routes, P extends RouteParams = {}> extends NavigationLeafRoute
{
  routeName: R;
  params: P;
}

export type RouteLeaf = (
  BaseRouteLeaf<Routes.Workouts, {}> |
  BaseRouteLeaf<Routes.NewWorkout, {}> |
  BaseRouteLeaf<Routes.Workout, WorkoutRouteParams>
);

export function isWorkoutRoute( route: RouteLeaf | NavigationLeafRoute ): route is BaseRouteLeaf<Routes.Workout, WorkoutRouteParams>
{
  return ( !!route && route.routeName === Routes.Workout );
}
