package com.wishlet.app;

import android.content.ComponentName;
import android.content.pm.PackageManager;
import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Switches the home-screen icon by enabling one launcher activity-alias and disabling the rest.
 * The new alias is enabled before the old ones are disabled, so there is never zero launchers.
 */
@CapacitorPlugin(name = "AppIcon")
public class AppIconPlugin extends Plugin {
    private static final String[] NAMES = {
        "Default", "Diwali", "Christmas", "Newyear", "Lohri",
        "Sankranti", "Republicday", "Holi", "Eid"
    };

    private ComponentName component(String name) {
        return new ComponentName(getContext().getPackageName(), "com.wishlet.app.Launcher" + name);
    }

    private boolean isKnown(String name) {
        for (String n : NAMES) if (n.equals(name)) return true;
        return false;
    }

    /** Alias that is enabled now. The manifest default (Default) counts as enabled when unset. */
    private String current() {
        PackageManager pm = getContext().getPackageManager();
        for (String n : NAMES) {
            int state = pm.getComponentEnabledSetting(component(n));
            if (state == PackageManager.COMPONENT_ENABLED_STATE_ENABLED) return n;
        }
        return "Default";
    }

    @PluginMethod
    public void setIcon(PluginCall call) {
        String name = call.getString("name");
        if (name == null || !isKnown(name)) {
            call.reject("Unknown icon name");
            return;
        }
        try {
            PackageManager pm = getContext().getPackageManager();
            pm.setComponentEnabledSetting(
                component(name),
                PackageManager.COMPONENT_ENABLED_STATE_ENABLED,
                PackageManager.DONT_KILL_APP);
            for (String n : NAMES) {
                if (n.equals(name)) continue;
                pm.setComponentEnabledSetting(
                    component(n),
                    PackageManager.COMPONENT_ENABLED_STATE_DISABLED,
                    PackageManager.DONT_KILL_APP);
            }
            call.resolve();
        } catch (Exception e) {
            call.reject("Could not switch icon", e);
        }
    }

    @PluginMethod
    public void getIcon(PluginCall call) {
        JSObject ret = new JSObject();
        ret.put("name", current());
        call.resolve(ret);
    }
}
