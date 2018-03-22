using Toybox.WatchUi as Ui;

class ConnectionView extends Ui.View
{
    function initialize()
    {
        View.initialize();
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Connection( dc ) );
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

class ConnectionDelegate extends Ui.BehaviorDelegate
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
    
    function onNextPage()
    {
    	Ui.pushView( new ExerciseView(), new ExerciseDelegate(), Ui.SLIDE_LEFT );
    	return true;
    }
}