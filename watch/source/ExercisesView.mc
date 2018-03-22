using Toybox.WatchUi as Ui;
using Toybox.System as Sys;

class ExercisesView extends Ui.View
{
	private var _exercise;

    function initialize()
    {
        View.initialize();
        
        _exercise = null;
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Exercises( dc ) );
        
        var height = dc.getHeight();
        
    	var exerciseNameLabel = View.findDrawableById( "ExerciseName" );
    	exerciseNameLabel.setLocation( Ui.LAYOUT_HALIGN_CENTER, height * 0.1 );
    	
    	var exerciseSetCount = View.findDrawableById( "ExerciseSetCount" );
    	exerciseSetCount.setLocation( Ui.LAYOUT_HALIGN_CENTER, height * 0.6 );
    }

    function onShow()
    {
    }

    function onUpdate( dc )
    {
    	var exerciseNameLabel = View.findDrawableById( "ExerciseName" );
    	var exerciseSetCount = View.findDrawableById( "ExerciseSetCount" );
    	
    	exerciseNameLabel.setText( "--------" );
    	exerciseSetCount.setText( "-" );
    	
    	if( _exercise != null )
    	{
    		if( _exercise.hasKey( "name" ) )
    		{
    			exerciseNameLabel.setText( _exercise.get( "name" ) );
    		}
    		
    		if( _exercise.hasKey( "sets" ) )
    		{
    			var sets = _exercise.get( "sets" );
    			if( sets instanceof Array )
    			{
	    			exerciseSetCount.setText( sets.size().toString() );
    			}
    		}
    	}
    	
        View.onUpdate( dc );
    }

    function onHide()
    {
    }
    
    function setExercise( exercise )
    {
    	_exercise = exercise;
    	
    	Ui.requestUpdate();
    }
}

class ExercisesDelegate extends Ui.BehaviorDelegate
{
	private var _exercisesView;
	private var _exercises;
	private var _currentExerciseIndex;
	
    function initialize( exercisesView, exercises )
    {
        BehaviorDelegate.initialize();
        
        _exercisesView = exercisesView;
        _exercises = exercises;
        
        _currentExerciseIndex = 0;
        
        updateCurrentExercise();
    }

	function onSwipe( swipeEvent )
	{
		var direction = swipeEvent.getDirection();
		if( direction == Ui.SWIPE_RIGHT )
		{
			onBack();
		}
		else if( direction == Ui.SWIPE_UP )
		{
			var exerciseCount = _exercises.size();
			if( _currentExerciseIndex < exerciseCount - 1 )
			{
				_currentExerciseIndex += 1;
				updateCurrentExercise();
			}
		}
		else if( direction == Ui.SWIPE_DOWN )
		{
			if( _currentExerciseIndex > 0 )
			{
				_currentExerciseIndex -= 1;
				updateCurrentExercise();
			}
		}
		else if( direction == Ui.SWIPE_LEFT )
		{
			var exercise = _exercises[ _currentExerciseIndex ];
			var sets = exercise.get( "sets" );
			if( sets.size() > 0 )
			{
				var setsView = new SetsView();
				Ui.pushView( setsView, new SetsDelegate( setsView, exercise.get( "name" ), sets ), Ui.SLIDE_LEFT );
			}
		}
		return true;
	}
    
    function onBack()
    {
    	Ui.popView( Ui.SLIDE_RIGHT );
    	return true;
    }
    
    function updateCurrentExercise()
    {
        _exercisesView.setExercise( _exercises[ _currentExerciseIndex ] );
    }
}