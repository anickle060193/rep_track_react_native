using Toybox.WatchUi as Ui;

class ExerciseView extends Ui.View
{
    function initialize()
    {
        View.initialize();
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Exercise( dc ) );
        
        var height = dc.getHeight();
        var width = dc.getWidth();
        
    	var exerciseNameLabel = View.findDrawableById( "ExerciseName" );
    	exerciseNameLabel.setLocation( width / 2, height * 0.2 );
    	exerciseNameLabel.setText( "Squat" );
    	
    	var exerciseSetCount = View.findDrawableById( "ExerciseSetCount" );
    	exerciseSetCount.setLocation( width / 2, height * 0.7 );
    	exerciseSetCount.setText( "8" );
    }

    function onShow()
    {
    }

    function onUpdate( dc )
    {
        View.onUpdate( dc );
    }

    function onHide()
    {
    }
}

class ExerciseDelegate extends Ui.BehaviorDelegate
{
    function initialize()
    {
        BehaviorDelegate.initialize();
    }
    
    function onPreviousPage()
    {
    	Ui.popView( Ui.SLIDE_RIGHT );
    	return true;
    }
}