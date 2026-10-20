package com.wishlet.app

import android.content.Intent
import android.net.Uri
import androidx.core.content.FileProvider
import com.getcapacitor.JSObject
import com.getcapacitor.Plugin
import com.getcapacitor.PluginCall
import com.getcapacitor.PluginMethod
import com.getcapacitor.annotation.CapacitorPlugin
import java.io.File

private const val INSTAGRAM_PACKAGE = "com.instagram.android"

@CapacitorPlugin(name = "InstagramStories")
class InstagramStoriesPlugin : Plugin() {
    @PluginMethod
    fun shareToStory(call: PluginCall) {
        val filePath = call.getString("filePath")
        if (filePath.isNullOrEmpty()) {
            call.reject("filePath is required")
            return
        }
        try {
            val file = File(Uri.parse(filePath).path ?: filePath)
            val uri = FileProvider.getUriForFile(context, "${context.packageName}.fileprovider", file)

            val intent = Intent("com.instagram.share.ADD_TO_STORY").apply {
                putExtra("source_application", context.getString(R.string.facebook_app_id))
                setDataAndType(uri, call.getString("mimeType") ?: "image/png")
                addFlags(Intent.FLAG_GRANT_READ_URI_PERMISSION)
                call.getString("topColor")?.let { putExtra("top_background_color", it) }
                call.getString("bottomColor")?.let { putExtra("bottom_background_color", it) }
            }
            context.grantUriPermission(INSTAGRAM_PACKAGE, uri, Intent.FLAG_GRANT_READ_URI_PERMISSION)

            if (intent.resolveActivity(context.packageManager) == null) {
                call.reject("INSTAGRAM_NOT_INSTALLED")
                return
            }
            activity.startActivity(intent)
            call.resolve(JSObject().put("shared", true))
        } catch (e: Exception) {
            call.reject(e.message ?: "Could not share to Instagram", e)
        }
    }
}
