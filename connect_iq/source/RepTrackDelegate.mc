using Toybox.WatchUi as Ui;
using Toybox.System as Sys;

class RepTrackDelegate extends Ui.BehaviorDelegate
{
    function initialize()
    {
    	Sys.println( "Initialize" );
        BehaviorDelegate.initialize();
    }
    
    function onNextPage()
    {
        Sys.println( "Next Page" );
    	return true;
    }
    
    function onPreviousPage()
    {
    	Sys.println( "Previous Page" );
    	return true;
    }

    function onMenu()
    {
        Ui.pushView( new Rez.Menus.MainMenu(), new RepTrackMenuDelegate(), Ui.SLIDE_UP );
        return true;
    }
}