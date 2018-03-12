export interface Exercise
{
  name: string;
  sets: number;
  reps: number;
  weight: number;
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
