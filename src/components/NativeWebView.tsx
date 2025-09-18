import { useEffect, useRef, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Maximize2, 
  RotateCcw,
  Vibrate,
  Settings,
  Monitor,
  TouchpadIcon
} from "lucide-react";
import { Device } from '@capacitor/device';
import { App } from '@capacitor/app';
import { Haptics, ImpactStyle } from '@capacitor/haptics';

interface NativeWebViewProps {
  url: string;
  onClose?: () => void;
}

export function NativeWebView({ url, onClose }: NativeWebViewProps) {
  const [isNative, setIsNative] = useState(false);
  const [deviceInfo, setDeviceInfo] = useState<any>(null);
  const [touchEvents, setTouchEvents] = useState<{ x: number; y: number; type: string }[]>([]);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const webviewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    checkNativeEnvironment();
    setupTouchHandlers();
  }, []);

  const checkNativeEnvironment = async () => {
    try {
      const info = await Device.getInfo();
      setDeviceInfo(info);
      setIsNative(info.platform === 'android' || info.platform === 'ios');
    } catch (error) {
      console.log('Running in web environment');
      setIsNative(false);
    }
  };

  const setupTouchHandlers = () => {
    const handleTouch = (event: TouchEvent) => {
      const touch = event.touches[0];
      if (touch) {
        setTouchEvents(prev => [
          ...prev.slice(-10), // Keep last 10 events
          {
            x: touch.clientX,
            y: touch.clientY,
            type: event.type
          }
        ]);
        
        // Native haptic feedback
        if (isNative) {
          Haptics.impact({ style: ImpactStyle.Light });
        }
      }
    };

    document.addEventListener('touchstart', handleTouch);
    document.addEventListener('touchmove', handleTouch);
    document.addEventListener('touchend', handleTouch);

    return () => {
      document.removeEventListener('touchstart', handleTouch);
      document.removeEventListener('touchmove', handleTouch);
      document.removeEventListener('touchend', handleTouch);
    };
  };

  const toggleFullscreen = async () => {
    if (isNative) {
      try {
        // In native environment, we would use proper fullscreen API
        setIsFullscreen(!isFullscreen);
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (error) {
        console.log('Fullscreen not available');
      }
    } else {
      // Web fallback
      if (webviewRef.current) {
        if (document.fullscreenElement) {
          document.exitFullscreen();
          setIsFullscreen(false);
        } else {
          webviewRef.current.requestFullscreen();
          setIsFullscreen(true);
        }
      }
    }
  };

  const reloadWebView = () => {
    if (webviewRef.current) {
      webviewRef.current.src = webviewRef.current.src;
    }
  };

  const openNativeSettings = async () => {
    if (isNative) {
      try {
        // In a real native app, this would open Android wallpaper settings
        console.log('Opening native wallpaper settings...');
        await Haptics.impact({ style: ImpactStyle.Medium });
      } catch (error) {
        console.log('Cannot open settings');
      }
    }
  };

  return (
    <div className={`space-y-4 ${isFullscreen ? 'fixed inset-0 z-50 bg-background' : ''}`}>
      {/* Native Status Header */}
      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge 
              variant={isNative ? "default" : "outline"} 
              className={isNative 
                ? "bg-primary text-primary-foreground" 
                : "bg-muted text-muted-foreground"
              }
            >
              {isNative ? (
                <>
                  <Smartphone className="w-3 h-3 mr-1" />
                  Native Android
                </>
              ) : (
                <>
                  <Monitor className="w-3 h-3 mr-1" />
                  Web Preview
                </>
              )}
            </Badge>
            {deviceInfo && (
              <span className="text-xs text-muted-foreground">
                {deviceInfo.model} • Android {deviceInfo.osVersion}
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={toggleFullscreen}
              className="text-muted-foreground hover:text-foreground"
            >
              <Maximize2 className="w-4 h-4" />
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={reloadWebView}
              className="text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="w-4 h-4" />
            </Button>
            {isNative && (
              <Button
                variant="ghost"
                size="sm"
                onClick={openNativeSettings}
                className="text-muted-foreground hover:text-foreground"
              >
                <Settings className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>
      </Card>

      {/* Enhanced WebView Container */}
      <Card className="overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50 shadow-floating">
        <div className="relative">
          {/* Native WebView with Hardware Acceleration */}
          <div className="aspect-[9/16] max-w-sm mx-auto bg-background rounded-lg overflow-hidden relative">
            <iframe
              ref={webviewRef}
              src={url}
              title="Native 3D Wallpaper WebView"
              className="w-full h-full"
              sandbox="allow-scripts allow-same-origin allow-forms allow-orientation-lock allow-pointer-lock"
              loading="lazy"
              style={{
                // Enhanced rendering for 3D content
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                willChange: 'transform, opacity',
              }}
            />
            
            {/* Touch Event Overlay */}
            {touchEvents.length > 0 && (
              <div className="absolute inset-0 pointer-events-none">
                {touchEvents.slice(-3).map((touch, index) => (
                  <div
                    key={index}
                    className="absolute w-8 h-8 bg-primary/30 rounded-full animate-ping"
                    style={{
                      left: touch.x - 16,
                      top: touch.y - 16,
                      animationDelay: `${index * 100}ms`,
                    }}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Native Android UI Overlay */}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
            <div className="flex items-center gap-3 bg-background/90 backdrop-blur-sm rounded-full px-6 py-3 border border-border/50 shadow-floating">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-xs text-foreground font-medium">Live Wallpaper</span>
              </div>
              {isNative && (
                <>
                  <div className="w-px h-4 bg-border/50" />
                  <div className="flex items-center gap-1">
                    <Vibrate className="w-3 h-3 text-muted-foreground" />
                    <TouchpadIcon className="w-3 h-3 text-muted-foreground" />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Card>

      {/* Native Features Panel */}
      {isNative && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-3">
            <h4 className="text-sm font-semibold text-foreground flex items-center gap-2">
              <Smartphone className="w-4 h-4 text-primary" />
              Native Android Features Active
            </h4>
            <div className="grid grid-cols-2 gap-3 text-xs">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">Hardware Acceleration</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">Haptic Feedback</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">Gesture Recognition</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-accent" />
                <span className="text-muted-foreground">Background Processing</span>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Development Info */}
      <Card className="p-4 bg-accent/5 border-accent/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-accent/20">
            <Smartphone className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Native Android Implementation
            </h4>
            <p className="text-xs text-muted-foreground">
              {isNative 
                ? "Running in native Android environment with full hardware acceleration and gesture support."
                : "Web preview mode. Build and run on Android device for full native features."
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}