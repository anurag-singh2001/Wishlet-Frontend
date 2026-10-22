package com.wishlet.app;

import android.content.Intent;
import android.os.Bundle;
import android.util.Log;
import com.getcapacitor.BridgeActivity;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginHandle;
import ee.forgr.capacitor.social.login.GoogleProvider;
import ee.forgr.capacitor.social.login.ModifiedMainActivityForSocialLoginPlugin;
import ee.forgr.capacitor.social.login.SocialLoginPlugin;

/**
 * Implements ModifiedMainActivityForSocialLoginPlugin so Google sign-in results
 * (Credential Manager authorization) are handed back to the SocialLogin plugin.
 * Without this the account sheet closes but sign-in never completes.
 */
public class MainActivity extends BridgeActivity implements ModifiedMainActivityForSocialLoginPlugin {
    @Override
    public void onCreate(Bundle savedInstanceState) {
        registerPlugin(InstagramStoriesPlugin.class);
        super.onCreate(savedInstanceState);
    }

    @Override
    public void onActivityResult(int requestCode, int resultCode, Intent data) {
        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode < GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MIN
            || requestCode >= GoogleProvider.REQUEST_AUTHORIZE_GOOGLE_MAX) {
            return;
        }
        PluginHandle handle = getBridge().getPlugin("SocialLogin");
        if (handle == null) {
            Log.i("Google Activity Result", "SocialLogin plugin handle is null");
            return;
        }
        Plugin plugin = handle.getInstance();
        if (!(plugin instanceof SocialLoginPlugin)) {
            Log.i("Google Activity Result", "SocialLogin plugin instance is not SocialLoginPlugin");
            return;
        }
        ((SocialLoginPlugin) plugin).handleGoogleLoginIntent(requestCode, data);
    }

    // Marker required by the plugin; never called.
    @Override
    public void IHaveModifiedTheMainActivityForTheUseWithSocialLoginPlugin() {}
}
