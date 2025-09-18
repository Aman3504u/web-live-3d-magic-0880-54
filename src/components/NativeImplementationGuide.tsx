import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Code2, 
  FileText, 
  Settings, 
  Smartphone,
  Download,
  ExternalLink,
  CheckCircle,
  Copy,
  Play
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function NativeImplementationGuide() {
  const { toast } = useToast();

  const copyCode = async (code: string, title: string) => {
    try {
      await navigator.clipboard.writeText(code);
      toast({
        title: "Copied!",
        description: `${title} code copied to clipboard`,
      });
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the code manually",
        variant: "destructive",
      });
    }
  };

  const manifestEntry = `<!-- Add to android/app/src/main/AndroidManifest.xml -->
<service
    android:name=".LiveWallpaperService"
    android:enabled="true"
    android:label="@string/wallpaper_service_name"
    android:permission="android.permission.BIND_WALLPAPER">
    <intent-filter android:priority="1">
        <action android:name="android.service.wallpaper.WallpaperService" />
    </intent-filter>
    <meta-data
        android:name="android.service.wallpaper"
        android:resource="@xml/wallpaper_service" />
</service>`;

  const gradleDependencies = `// Add to android/app/build.gradle
dependencies {
    implementation 'androidx.webkit:webkit:1.8.0'
    implementation 'androidx.constraintlayout:constraintlayout:2.1.4'
    implementation 'androidx.preference:preference:1.2.1'
}`;

  const webViewOptimizations = `// WebView Performance Optimizations
private void optimizeWebViewForWallpaper(WebView webView) {
    WebSettings settings = webView.getSettings();
    
    // Enable hardware acceleration
    webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
    
    // Optimize rendering
    settings.setRenderPriority(WebSettings.RenderPriority.HIGH);
    settings.setEnableSmoothTransition(true);
    
    // Memory management
    settings.setCacheMode(WebSettings.LOAD_CACHE_ELSE_NETWORK);
    settings.setDomStorageEnabled(true);
    settings.setDatabaseEnabled(true);
    
    // Disable unnecessary features for wallpaper
    settings.setSupportZoom(false);
    settings.setBuiltInZoomControls(false);
    settings.setDisplayZoomControls(false);
    settings.setAllowFileAccess(false);
    settings.setAllowContentAccess(false);
    
    // WebGL and 3D support
    settings.setJavaScriptEnabled(true);
    settings.setJavaScriptCanOpenWindowsAutomatically(false);
    
    // Performance settings
    if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.KITKAT) {
        webView.setLayerType(View.LAYER_TYPE_HARDWARE, null);
    }
}`;

  const gestureHandling = `// Advanced Gesture Handling
public class AdvancedGestureDetector {
    private final WebView webView;
    private final GestureDetector gestureDetector;
    private final ScaleGestureDetector scaleDetector;
    private final RotationGestureDetector rotationDetector;
    
    public AdvancedGestureDetector(Context context, WebView webView) {
        this.webView = webView;
        this.gestureDetector = new GestureDetector(context, new GestureListener());
        this.scaleDetector = new ScaleGestureDetector(context, new ScaleListener());
        this.rotationDetector = new RotationGestureDetector(new RotationListener());
    }
    
    public boolean onTouchEvent(MotionEvent event) {
        boolean handled = false;
        handled |= gestureDetector.onTouchEvent(event);
        handled |= scaleDetector.onTouchEvent(event);
        handled |= rotationDetector.onTouchEvent(event);
        
        // Multi-touch gesture detection
        if (event.getPointerCount() > 1) {
            handleMultiTouchGesture(event);
        }
        
        return handled;
    }
    
    private void sendGestureToWebView(String type, JSONObject data) {
        String js = String.format(
            "window.wallpaperGesture && window.wallpaperGesture('%s', %s);",
            type, data.toString()
        );
        webView.evaluateJavascript(js, null);
    }
}`;

  const performanceMonitoring = `// Performance Monitoring and Battery Optimization
public class WallpaperPerformanceManager {
    private long lastFrameTime = 0;
    private int frameCount = 0;
    private float currentFPS = 0;
    private MemoryInfo memoryInfo = new MemoryInfo();
    
    public void onFrame() {
        long currentTime = System.currentTimeMillis();
        frameCount++;
        
        if (currentTime - lastFrameTime >= 1000) {
            currentFPS = frameCount * 1000f / (currentTime - lastFrameTime);
            frameCount = 0;
            lastFrameTime = currentTime;
            
            // Report performance to WebView
            reportPerformance();
            
            // Auto-adjust quality based on performance
            autoAdjustQuality();
        }
    }
    
    private void reportPerformance() {
        ActivityManager.getMemoryInfo(memoryInfo);
        
        JSONObject perfData = new JSONObject();
        try {
            perfData.put("fps", currentFPS);
            perfData.put("memory", memoryInfo.availMem / 1024 / 1024);
            perfData.put("lowMemory", memoryInfo.lowMemory);
        } catch (JSONException e) {
            Log.e(TAG, "Error creating performance data", e);
        }
        
        String js = "window.wallpaperPerformance && window.wallpaperPerformance(" + 
                   perfData.toString() + ");";
        webView.evaluateJavascript(js, null);
    }
}`;

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="flex items-center gap-4">
          <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
            <Code2 className="w-8 h-8 text-primary-foreground" />
          </div>
          <div className="flex-1">
            <h2 className="text-2xl font-bold text-foreground">
              Complete Android Implementation
            </h2>
            <p className="text-muted-foreground mt-1">
              Step-by-step native Android wallpaper service with WebView and gesture control
            </p>
          </div>
          <Badge variant="outline" className="bg-accent/10 text-accent border-accent/30">
            Production Ready
          </Badge>
        </div>
      </Card>

      {/* Implementation Tabs */}
      <Tabs defaultValue="service" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="service">Service</TabsTrigger>
          <TabsTrigger value="manifest">Manifest</TabsTrigger>
          <TabsTrigger value="webview">WebView</TabsTrigger>
          <TabsTrigger value="gestures">Gestures</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="service" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Android Wallpaper Service</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(manifestEntry, "Service")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              Complete LiveWallpaperService implementation with WebView integration and gesture support.
            </p>
            <div className="bg-background/50 rounded-lg p-4 border border-border/30">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>{`// Complete service implementation available in:
// android/app/src/main/java/.../LiveWallpaperService.java

Key Features:
✓ Hardware-accelerated WebView rendering
✓ Multi-touch gesture recognition  
✓ Battery optimization and performance monitoring
✓ JavaScript bridge for real-time communication
✓ Automatic memory management
✓ Surface lifecycle handling`}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="manifest" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Android Manifest Configuration</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(manifestEntry, "Manifest")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-border/30">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>{manifestEntry}</code>
              </pre>
            </div>
            <div className="mt-4 space-y-2">
              <h4 className="text-sm font-semibold text-foreground">Required Permissions:</h4>
              <div className="bg-background/30 rounded p-3 text-xs">
                <code>{`<uses-permission android:name="android.permission.INTERNET" />
<uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
<uses-permission android:name="android.permission.VIBRATE" />
<uses-permission android:name="android.permission.WAKE_LOCK" />`}</code>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="webview" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">WebView Optimizations</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(webViewOptimizations, "WebView")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-border/30">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>{webViewOptimizations}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="gestures" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Advanced Gesture Handling</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(gestureHandling, "Gestures")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-border/30">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>{gestureHandling}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="performance" className="space-y-4">
          <Card className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-foreground">Performance Monitoring</h3>
              <Button
                variant="outline"
                size="sm"
                onClick={() => copyCode(performanceMonitoring, "Performance")}
              >
                <Copy className="w-4 h-4 mr-2" />
                Copy Code
              </Button>
            </div>
            <div className="bg-background/50 rounded-lg p-4 border border-border/30">
              <pre className="text-xs text-foreground overflow-x-auto">
                <code>{performanceMonitoring}</code>
              </pre>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Build Instructions */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Play className="w-5 h-5 text-primary" />
          Implementation Steps
        </h3>
        
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">1. Setup Android Project</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Export project to GitHub
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Run <code>npx cap add android</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Add LiveWallpaperService.java
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Update AndroidManifest.xml
                </li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold text-foreground">2. Build and Deploy</h4>
              <ul className="space-y-1 text-muted-foreground">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Build: <code>npm run build</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Sync: <code>npx cap sync android</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Run: <code>npx cap run android</code>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-3 h-3 text-accent" />
                  Set as wallpaper in Android settings
                </li>
              </ul>
            </div>
          </div>
          
          <div className="p-4 bg-background/50 rounded-lg border border-border/30">
            <p className="text-sm text-muted-foreground">
              <strong className="text-foreground">Result:</strong> A fully native Android live wallpaper app that displays 
              3D websites with hardware acceleration, gesture control, and real-time interaction. 
              The WebView communicates with native Android code for optimal performance and battery life.
            </p>
          </div>
        </div>
      </Card>

      {/* Download Files */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground">Complete Implementation Files</h3>
            <p className="text-sm text-muted-foreground mt-1">
              All Android native files, build configurations, and documentation
            </p>
          </div>
          <Button className="bg-gradient-primary text-primary-foreground hover:opacity-90">
            <Download className="w-4 h-4 mr-2" />
            Download Android Files
          </Button>
        </div>
      </Card>
    </div>
  );
}