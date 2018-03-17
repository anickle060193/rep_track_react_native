import moment from 'moment';

import { range } from '@utils';

export interface ExerciseRep
{
  data: number[];
}

export interface ExerciseSet
{
  completed: boolean;
  reps: ExerciseRep[];
}

export interface Exercise
{
  name: string;
  setCount: number;
  repCount: number;
  weight: number;
  sets: ExerciseSet[];
}

export interface Workout
{
  id: string;
  date: Date;
  exercises: Exercise[];
}

export type WorkoutsMap = { [ id: string ]: Workout };

export function workoutsMapToArray( workouts: WorkoutsMap )
{
  return Object.keys( workouts ).map( ( id ) => workouts[ id ] );
}

export function workoutsArrayToMap( workouts: Workout[] )
{
  let workoutsMap: WorkoutsMap = {};
  for( let workout of workouts )
  {
    workoutsMap[ workout.id ] = workout;
  }
  return workoutsMap;
}

export function formatWorkoutName( workout: Workout )
{
  return moment( workout.date ).format( 'L' );
}

export function createNewExercise( name: string, setCount: number, repCount: number, weight: number ): Exercise
{
  return {
    name,
    setCount,
    repCount,
    weight,
    sets: range( setCount ).map( () => ( {
      completed: false,
      reps: range( repCount ).map( () => ( {
        data: []
      } ) )
    } ) )
  };
}
