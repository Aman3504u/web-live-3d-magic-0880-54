package app.lovable.web_live_3d_magic;

import android.content.SharedPreferences;
import android.graphics.Canvas;
import android.os.Handler;
import android.preference.PreferenceManager;
import android.service.wallpaper.WallpaperService;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.webkit.WebView;
import android.webkit.WebSettings;
import android.webkit.WebViewClient;
import android.view.GestureDetector;
import android.view.ScaleGestureDetector;
import android.util.Log;

public class LiveWallpaperService extends WallpaperService {
    private static final String TAG = "LiveWallpaperService";

    @Override
    public Engine onCreateEngine() {
        return new WallpaperEngine();
    }

    public class WallpaperEngine extends Engine {
        private WebView webView;
        private GestureDetector gestureDetector;
        private ScaleGestureDetector scaleGestureDetector;
        private Handler handler = new Handler();
        private boolean isVisible = false;
        private String wallpaperUrl = "https://your-capacitor-app.com";

        @Override
        public void onCreate(SurfaceHolder surfaceHolder) {
            super.onCreate(surfaceHolder);
            
            // Initialize WebView
            initializeWebView();
            
            // Initialize gesture detectors
            initializeGestureDetectors();
            
            // Load wallpaper configuration
            loadWallpaperConfig();
            
            Log.d(TAG, "WallpaperEngine created");
        }

        private void initializeWebView() {
            webView = new WebView(LiveWallpaperService.this);
            
            // Enable hardware acceleration
            webView.setLayerType(WebView.LAYER_TYPE_HARDWARE, null);
            
            WebSettings settings = webView.getSettings();
            settings.setJavaScriptEnabled(true);
            settings.setDomStorageEnabled(true);
            settings.setAllowFileAccess(true);
            settings.setAllowContentAccess(true);
            settings.setGeolocationEnabled(false);
            settings.setDatabaseEnabled(true);
            settings.setAppCacheEnabled(true);
            
            // Enable WebGL and hardware acceleration
            settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
            settings.setCacheMode(WebSettings.LOAD_DEFAULT);
            
            // Optimize for live wallpaper
            settings.setLayoutAlgorithm(WebSettings.LayoutAlgorithm.NORMAL);
            settings.setUseWideViewPort(true);
            settings.setLoadWithOverviewMode(true);
            settings.setSupportZoom(false);
            settings.setBuiltInZoomControls(false);
            settings.setDisplayZoomControls(false);

            webView.setWebViewClient(new WebViewClient() {
                @Override
                public void onPageFinished(WebView view, String url) {
                    super.onPageFinished(view, url);
                    Log.d(TAG, "WebView page loaded: " + url);
                    
                    // Inject wallpaper-specific JavaScript
                    injectWallpaperJavaScript();
                }

                @Override
                public boolean shouldOverrideUrlLoading(WebView view, String url) {
                    // Keep navigation within the wallpaper
                    return false;
                }
            });

            // Add JavaScript interface for communication
            webView.addJavascriptInterface(new WallpaperJavaScriptInterface(), "Android");
        }

        private void initializeGestureDetectors() {
            gestureDetector = new GestureDetector(LiveWallpaperService.this, new GestureListener());
            scaleGestureDetector = new ScaleGestureDetector(LiveWallpaperService.this, new ScaleListener());
        }

        private void loadWallpaperConfig() {
            SharedPreferences prefs = PreferenceManager.getDefaultSharedPreferences(LiveWallpaperService.this);
            wallpaperUrl = prefs.getString("wallpaper_url", "https://your-default-3d-site.com");
            
            if (webView != null) {
                webView.loadUrl(wallpaperUrl);
            }
        }

        private void injectWallpaperJavaScript() {
            String js = 
                "window.isAndroidWallpaper = true;" +
                "window.wallpaperGesture = function(type, data) {" +
                "  const event = new CustomEvent('wallpaper-gesture', {" +
                "    detail: { type: type, ...data }" +
                "  });" +
                "  window.dispatchEvent(event);" +
                "};" +
                
                // Disable scrolling and selection for wallpaper
                "document.body.style.overflow = 'hidden';" +
                "document.body.style.userSelect = 'none';" +
                "document.body.style.webkitUserSelect = 'none';" +
                "document.body.style.webkitTouchCallout = 'none';" +
                
                // Optimize performance
                "document.body.style.transform = 'translateZ(0)';" +
                "document.body.style.webkitTransform = 'translateZ(0)';";
                
            webView.evaluateJavascript(js, null);
        }

        @Override
        public void onVisibilityChanged(boolean visible) {
            super.onVisibilityChanged(visible);
            isVisible = visible;
            
            if (visible) {
                // Resume WebView rendering
                if (webView != null) {
                    webView.onResume();
                    webView.resumeTimers();
                }
            } else {
                // Pause WebView to save battery
                if (webView != null) {
                    webView.onPause();
                    webView.pauseTimers();
                }
            }
        }

        @Override
        public void onSurfaceChanged(SurfaceHolder holder, int format, int width, int height) {
            super.onSurfaceChanged(holder, format, width, height);
            
            if (webView != null) {
                // Resize WebView to match surface
                webView.layout(0, 0, width, height);
                
                // Notify web content of size change
                String js = "window.wallpaperResize && window.wallpaperResize(" + width + ", " + height + ");";
                webView.evaluateJavascript(js, null);
            }
        }

        @Override
        public void onSurfaceDestroyed(SurfaceHolder holder) {
            super.onSurfaceDestroyed(holder);
            Log.d(TAG, "Surface destroyed");
        }

        @Override
        public void onDestroy() {
            super.onDestroy();
            
            if (webView != null) {
                webView.destroy();
                webView = null;
            }
            
            Log.d(TAG, "WallpaperEngine destroyed");
        }

        @Override
        public void onTouchEvent(MotionEvent event) {
            // Process gestures
            boolean gestureHandled = gestureDetector.onTouchEvent(event);
            boolean scaleHandled = scaleGestureDetector.onTouchEvent(event);
            
            if (!gestureHandled && !scaleHandled) {
                // Pass touch events to WebView
                if (webView != null && isVisible) {
                    webView.dispatchTouchEvent(event);
                }
            }
            
            super.onTouchEvent(event);
        }

        private class GestureListener extends GestureDetector.SimpleOnGestureListener {
            @Override
            public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
                // Send pan gesture to WebView
                if (webView != null) {
                    String js = "window.wallpaperGesture('pan', {" +
                        "deltaX: " + distanceX + "," +
                        "deltaY: " + distanceY +
                        "});";
                    webView.evaluateJavascript(js, null);
                }
                return true;
            }

            @Override
            public boolean onDoubleTap(MotionEvent e) {
                // Send double tap to reset camera
                if (webView != null) {
                    String js = "window.wallpaperGesture('doubletap', {" +
                        "x: " + e.getX() + "," +
                        "y: " + e.getY() +
                        "});";
                    webView.evaluateJavascript(js, null);
                }
                return true;
            }

            @Override
            public void onLongPress(MotionEvent e) {
                // Open wallpaper settings
                if (webView != null) {
                    String js = "window.wallpaperGesture('longpress', {" +
                        "x: " + e.getX() + "," +
                        "y: " + e.getY() +
                        "});";
                    webView.evaluateJavascript(js, null);
                }
            }
        }

        private class ScaleListener extends ScaleGestureDetector.SimpleOnScaleGestureListener {
            @Override
            public boolean onScale(ScaleGestureDetector detector) {
                // Send zoom gesture to WebView
                if (webView != null) {
                    float scaleFactor = detector.getScaleFactor();
                    String js = "window.wallpaperGesture('zoom', {" +
                        "scale: " + scaleFactor + "," +
                        "focusX: " + detector.getFocusX() + "," +
                        "focusY: " + detector.getFocusY() +
                        "});";
                    webView.evaluateJavascript(js, null);
                }
                return true;
            }
        }

        public class WallpaperJavaScriptInterface {
            @android.webkit.JavascriptInterface
            public void logMessage(String message) {
                Log.d(TAG, "WebView: " + message);
            }

            @android.webkit.JavascriptInterface
            public void reportPerformance(String fps, String memory) {
                Log.d(TAG, "Performance - FPS: " + fps + ", Memory: " + memory);
            }

            @android.webkit.JavascriptInterface
            public void requestVibration(int duration) {
                // Trigger haptic feedback
                // Implementation would depend on device capabilities
            }
        }
    }
}
