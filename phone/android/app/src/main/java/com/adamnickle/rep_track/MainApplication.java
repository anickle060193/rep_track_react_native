package com.adamnickle.rep_track;

import android.app.Application;

import com.corbt.keepawake.KCKeepAwakePackage;
import com.facebook.react.ReactApplication;
import com.facebook.react.ReactNativeHost;
import com.facebook.react.ReactPackage;
import com.facebook.react.shell.MainReactPackage;
import com.facebook.soloader.SoLoader;
import com.github.xinthink.rnmk.ReactMaterialKitPackage;
import com.oblador.vectoricons.VectorIconsPackage;

import java.util.Arrays;
import java.util.List;

public class MainApplication extends Application implements ReactApplication
{
    private final ReactNativeHost mReactNativeHost = new ReactNativeHost( this )
    {
        @Override
        public boolean getUseDeveloperSupport()
        {
            return BuildConfig.DEBUG;
        }

        @Override
        protected List<ReactPackage> getPackages()
        {
            return Arrays.asList(
                    new ConnectIQReactPackage(),
                    new MainReactPackage(),
                    new KCKeepAwakePackage(),
                    new VectorIconsPackage(),
                    new ReactMaterialKitPackage()
            );
        }

        @Override
        protected String getJSMainModuleName()
        {
            return "index";
        }
    };

    @Override
    public ReactNativeHost getReactNativeHost()
    {
        return mReactNativeHost;
    }

    @Override
    public void onCreate()
    {
        super.onCreate();

        SoLoader.init( this, /* native exopackage */ false );
    }
}
