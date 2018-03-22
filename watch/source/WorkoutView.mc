using Toybox.WatchUi as Ui;
using Toybox.Communications as Comm;
using Toybox.System as Sys;

class WorkoutView extends Ui.View
{
	private var _workoutName;

    function initialize()
    {
        View.initialize();
        
        _workoutName = "";
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Workout( dc ) );
    }

    function onShow()
    {
    }

    function onUpdate( dc )
    {
    	var workoutNameLabel = View.findDrawableById( "WorkoutName" );
    	workoutNameLabel.setText( _workoutName );
    	
        View.onUpdate( dc );
    }

    function onHide()
    {
    }
    
    function setWorkoutName( workoutName )
    {
    	_workoutName = workoutName;
    	
    	Ui.requestUpdate();
    }
}

class WorkoutDelegate extends Ui.BehaviorDelegate
{
	private var _workoutView;
	private var _workout;

    function initialize( workoutView, workout )
    {
        BehaviorDelegate.initialize();
        
        _workoutView = workoutView;
        _workout = workout;
        
        _workoutView.setWorkoutName( _workout.get( "name" ) );
    }
    
    function onNextPage()
    {
    	var exercises = _workout.get( "exercises" );
    	if( exercises.size() > 0 )
    	{
    		var exercisesView = new ExercisesView();
    		Ui.pushView( exercisesView, new ExercisesDelegate( exercisesView, exercises ), Ui.SLIDE_LEFT );
    	}
    	return true;
    }
}