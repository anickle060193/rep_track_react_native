using Toybox.WatchUi as Ui;
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
    }
    
    function onNextPage()
    {
    	Ui.pushView( new ConnectionView(), new ConnectionDelegate(), Ui.SLIDE_LEFT );
    	return true;
    }
}