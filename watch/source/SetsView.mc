using Toybox.WatchUi as Ui;
using Toybox.System as Sys;

class SetsView extends Ui.View
{
	private var _exerciseName;
	private var _setIndex;
	private var _set;

    function initialize()
    {
        View.initialize();
        
    	_exerciseName = "";
    	_setIndex = 0;
        _set = null;
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Sets( dc ) );
        
        var width = dc.getWidth();
        var height = dc.getHeight();
        
        var exerciseNameLabel = View.findDrawableById( "ExerciseName" );
        exerciseNameLabel.setLocation( Ui.LAYOUT_HALIGN_CENTER, height * 0.05 );
        
    	var setNameLabel = View.findDrawableById( "SetName" );
    	setNameLabel.setLocation( Ui.LAYOUT_HALIGN_CENTER, height * 0.22 );
    	
    	var repsLabel = View.findDrawableById( "RepsLabel" );
    	repsLabel.setLocation( width * 0.1, height * 0.5 );
    	
    	var repCountLabel = View.findDrawableById( "RepCount" );
    	repCountLabel.setLocation( width * 0.55, height * 0.5 );
    	
    	var weightLabel = View.findDrawableById( "WeightLabel" );
    	weightLabel.setLocation( width * 0.1, height * 0.68 );
    	
    	var weightAmountLabel = View.findDrawableById( "Weight" );
    	weightAmountLabel.setLocation( Ui.LAYOUT_HALIGN_CENTER, height * 0.75 );
    }

    function onShow()
    {
    }

    function onUpdate( dc )
    {
    	var setNameLabel = View.findDrawableById( "SetName" );
    	var repCountLabel = View.findDrawableById( "RepCount" );
    	
        var exerciseNameLabel = View.findDrawableById( "ExerciseName" );
        exerciseNameLabel.setText( _exerciseName );
    	
    	var weightAmountLabel = View.findDrawableById( "Weight" );
    	
    	setNameLabel.setText( "--------" );
    	repCountLabel.setText( "-" );
    	
    	if( _set != null )
    	{
			setNameLabel.setText( "Set " + ( _setIndex + 1 ) );
			
    		if( _set.hasKey( "repCount" ) )
    		{
				repCountLabel.setText( _set.get( "repCount" ).format( "%.0f" ) );
    		}
    		
    		if( _set.hasKey( "weight" ) )
    		{
    			weightAmountLabel.setText( _set.get( "weight" ).format( "%.0f" ) + "lbs" );
    		}
    	}
    	
        View.onUpdate( dc );
    }

    function onHide()
    {
    }
    
    function setExerciseName( exerciseName )
    {
    	_exerciseName = exerciseName;
    }
    
    function setSet( setIndex, set )
    {
		_setIndex = setIndex;
		_set = set;
    	
    	Ui.requestUpdate();
    }
}

class SetsDelegate extends Ui.BehaviorDelegate
{
	private var _setsView;
	private var _exerciseName;
	private var _sets;
	private var _currentSetIndex;
	
    function initialize( setsView, exerciseName, sets )
    {
        BehaviorDelegate.initialize();
        
        _setsView = setsView;
        _exerciseName = exerciseName;
        _sets = sets;
        
        _currentSetIndex = 0;
        
        _setsView.setExerciseName( _exerciseName );
        updateCurrentSet();
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
			var setCount = _sets.size();
			if( _currentSetIndex < setCount - 1 )
			{
				_currentSetIndex += 1;
				updateCurrentSet();
			}
		}
		else if( direction == Ui.SWIPE_DOWN )
		{
			if( _currentSetIndex > 0 )
			{
				_currentSetIndex -= 1;
				updateCurrentSet();
			}
		}
		else if( direction == Ui.SWIPE_LEFT )
		{
		}
		return true;
	}
    
    function onBack()
    {
    	Ui.popView( Ui.SLIDE_RIGHT );
    	return true;
    }
    
    function updateCurrentSet()
    {
        _setsView.setSet( _currentSetIndex, _sets[ _currentSetIndex ] );
    }
}