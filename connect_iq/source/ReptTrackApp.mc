using Toybox.Application as App;
using Toybox.Communications as Comm;
using Toybox.WatchUi as Ui;
using Toybox.System as Sys;

class RepTrackApp extends App.AppBase
{
    function initialize()
    {
        AppBase.initialize();
    }

    // onStart() is called on application start up
    function onStart( state )
    {
    	Comm.registerForPhoneAppMessages( method(:onPhoneAppMessage ) );
    }

    // onStop() is called when your application is exiting
    function onStop( state )
    {
    }

    // Return the initial view of your application here
    function getInitialView()
    {
        return [ new RepTrackView(), new RepTrackDelegate() ];
    }

	private function onPhoneAppMessage( data )
	{
		Sys.println( data.data );
	}
}
