using Toybox.WatchUi as Ui;
using Toybox.Communications as Comm;
using Toybox.System as Sys;

class MainView extends Ui.View
{
    function initialize()
    {
        View.initialize();
    }

    function onLayout( dc )
    {
        setLayout( Rez.Layouts.Main( dc ) );
    }

    function onShow()
    {
    	Sys.println( "Main SHOW" );
    }

    function onUpdate( dc )
    {
        View.onUpdate( dc );
    }

    function onHide()
    {
    	Sys.println( "Main HIDE" );
    }
}

class MainDelegate extends Ui.BehaviorDelegate
{
    function initialize()
    {
        BehaviorDelegate.initialize();
        
    	Comm.registerForPhoneAppMessages( method( :onPhoneAppMessage ) );
    }

	private function onPhoneAppMessage( message )
	{
		Sys.println( "Message: " + message.data );
		
		if( message.data.hasKey( "type" ) && message.data.get( "type" ).equals( "workout" ) )
		{
			Sys.println( "Workout received" );
			
    		Comm.registerForPhoneAppMessages( null );
    		
			var workoutView = new WorkoutView();
			Ui.switchToView( workoutView, new WorkoutDelegate( workoutView, message.data.get( "workout" ) ), Ui.SLIDE_LEFT );
		}
	}
}