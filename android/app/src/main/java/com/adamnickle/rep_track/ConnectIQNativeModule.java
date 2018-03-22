package com.adamnickle.rep_track;

import com.facebook.react.bridge.Dynamic;
import com.facebook.react.bridge.LifecycleEventListener;
import com.facebook.react.bridge.Promise;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.bridge.ReactContextBaseJavaModule;
import com.facebook.react.bridge.ReactMethod;
import com.facebook.react.bridge.WritableArray;
import com.facebook.react.bridge.WritableMap;
import com.facebook.react.bridge.WritableNativeArray;
import com.facebook.react.bridge.WritableNativeMap;
import com.facebook.react.modules.core.DeviceEventManagerModule;
import com.garmin.android.connectiq.ConnectIQ;
import com.garmin.android.connectiq.IQApp;
import com.garmin.android.connectiq.IQDevice;
import com.garmin.android.connectiq.exception.InvalidStateException;
import com.garmin.android.connectiq.exception.ServiceUnavailableException;

import java.util.List;

import javax.annotation.Nullable;

public class ConnectIQNativeModule extends ReactContextBaseJavaModule
{
    private static final String EVENT_NAME_PREFIX = "com.adamnickle.rep_track.";

    private ConnectIQ mConnectIQ;
    private boolean mSdkReady;

    ConnectIQNativeModule( final ReactApplicationContext reactContext )
    {
        super( reactContext );

        mConnectIQ = null;
        mSdkReady = false;

        reactContext.addLifecycleEventListener( new LifecycleEventListener()
        {
            @Override
            public void onHostResume() { }

            @Override
            public void onHostPause() { }

            @Override
            public void onHostDestroy()
            {
                if( mConnectIQ != null )
                {
                    try
                    {
                        mConnectIQ.unregisterAllForEvents();
                        mConnectIQ.shutdown( ConnectIQNativeModule.this.getReactApplicationContext() );
                    }
                    catch( InvalidStateException ignored )
                    {
                    }
                }
            }
        } );
    }

    private IQDevice deviceFromID( final String deviceId )
    {
        long deviceIdNum = Long.parseLong( deviceId );
        return new IQDevice( deviceIdNum, "" );
    }

    private IQApp appFromID( final String applicationId )
    {
        return new IQApp( applicationId );
    }

    @Override
    public String getName()
    {
        return "ConnectIQ";
    }

    private void emit( final String eventName, @Nullable final Object data )
    {
        this.getReactApplicationContext()
            .getJSModule( DeviceEventManagerModule.RCTDeviceEventEmitter.class )
            .emit( EVENT_NAME_PREFIX + eventName, data );
    }

    @ReactMethod
    public void initialize( final Promise promise ) throws InvalidStateException
    {
        if( mConnectIQ != null )
        {
            throw new InvalidStateException( "Connect IQ has already been initialized." );
        }

        mConnectIQ = ConnectIQ.getInstance( getReactApplicationContext(), ConnectIQ.IQConnectType.TETHERED );
        mConnectIQ.initialize( getReactApplicationContext(), true, new ConnectIQ.ConnectIQListener()
        {
            @Override
            public void onSdkReady()
            {
                mSdkReady = true;

                ConnectIQNativeModule.this.emit( "sdk-ready", null );

                promise.resolve( null );
            }

            @Override
            public void onInitializeError( final ConnectIQ.IQSdkErrorStatus iqSdkErrorStatus )
            {
                ConnectIQNativeModule.this.emit( "init-error", iqSdkErrorStatus );

                promise.reject( iqSdkErrorStatus.toString(), "Initialization error: " + iqSdkErrorStatus );
            }

            @Override
            public void onSdkShutDown()
            {
                mSdkReady = false;
                mConnectIQ = null;

                ConnectIQNativeModule.this.emit( "sdk-shutdown", null );
            }
        } );
    }

    @ReactMethod
    public void isInitialized( final Promise promise )
    {
        promise.resolve( mConnectIQ != null );
    }

    @ReactMethod
    public void isSdkReady( final Promise promise )
    {
        promise.resolve( mSdkReady );
    }

    @ReactMethod
    public void getDevices( final Promise promise ) throws InvalidStateException, ServiceUnavailableException
    {
        WritableArray output = new WritableNativeArray();

        List<IQDevice> devices = mConnectIQ.getConnectedDevices();
        if( devices != null )
        {
            for( IQDevice device : devices )
            {
                WritableMap d = new WritableNativeMap();
                d.putString( "id", String.valueOf( device.getDeviceIdentifier() ) );
                d.putString( "name", device.getFriendlyName() );
                d.putInt( "status", device.getStatus().ordinal() );

                output.pushMap( d );
            }
        }

        promise.resolve( output );
    }

    @ReactMethod
    public void getApplicationInfo( final String deviceId, final String applicationId, final Promise promise ) throws InvalidStateException, ServiceUnavailableException
    {
        IQDevice device = this.deviceFromID( deviceId );
        mConnectIQ.getApplicationInfo( applicationId, device, new ConnectIQ.IQApplicationInfoListener()
        {
            @Override
            public void onApplicationInfoReceived( final IQApp iqApp )
            {
                WritableMap app = new WritableNativeMap();
                app.putString( "applicationID", iqApp.getApplicationId() );
                app.putInt( "status", iqApp.getStatus().ordinal() );
                app.putString( "displayName", iqApp.getDisplayName() );
                app.putInt( "version", iqApp.version() );
                promise.resolve( app );
            }

            @Override
            public void onApplicationNotInstalled( final String appId )
            {
                promise.resolve( appId );
            }
        } );
    }

    @ReactMethod
    public void openApplication( final String deviceId, final String applicationId, final Promise promise ) throws InvalidStateException, ServiceUnavailableException
    {
        IQDevice device = this.deviceFromID( deviceId );
        IQApp app = this.appFromID( applicationId );
        mConnectIQ.openApplication( device, app, new ConnectIQ.IQOpenApplicationListener()
        {
            @Override
            public void onOpenApplicationResponse( final IQDevice iqDevice, final IQApp iqApp, final ConnectIQ.IQOpenApplicationStatus iqOpenApplicationStatus )
            {
                promise.resolve( iqOpenApplicationStatus.ordinal() );
            }
        } );
    }

    @ReactMethod
    public void sendMessage( final String deviceId, final String applicationId, final Dynamic message ) throws InvalidStateException, ServiceUnavailableException
    {
        Object messageData;
        switch( message.getType() )
        {
            default:
            case Null:
                messageData = null;
                break;

            case Boolean:
                messageData = message.asBoolean();
                break;

            case Number:
                messageData = message.asDouble();
                break;

            case String:
                messageData = message.asString();
                break;

            case Map:
                messageData = message.asMap().toHashMap();
                break;

            case Array:
                messageData = message.asArray().toArrayList();
                break;
        }

        IQDevice device = this.deviceFromID( deviceId );
        IQApp app = this.appFromID( applicationId );

        mConnectIQ.sendMessage( device, app, messageData, new ConnectIQ.IQSendMessageListener()
        {
            @Override
            public void onMessageStatus( final IQDevice iqDevice, final IQApp iqApp, ConnectIQ.IQMessageStatus iqMessageStatus )
            {
                ConnectIQNativeModule.this.emit( "message-status", iqMessageStatus.toString() );
            }
        } );
    }
}
