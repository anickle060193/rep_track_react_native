package com.adamnickle.rep_track;

import com.facebook.react.ReactPackage;
import com.facebook.react.bridge.NativeModule;
import com.facebook.react.bridge.ReactApplicationContext;
import com.facebook.react.uimanager.ViewManager;

import java.util.Collections;
import java.util.List;

public class ConnectIQReactPackage implements ReactPackage
{
    @Override
    public List<NativeModule> createNativeModules( ReactApplicationContext reactContext )
    {
        return Collections.singletonList( (NativeModule)new ConnectIQNativeModule( reactContext ) );
    }

    @Override
    public List<ViewManager> createViewManagers( ReactApplicationContext reactContext )
    {
        return Collections.emptyList();
    }
}
