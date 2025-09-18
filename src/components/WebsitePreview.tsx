import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Smartphone, Monitor, RefreshCw, AlertTriangle, Zap } from "lucide-react";
import { NativeWebView } from "./NativeWebView";
import { AndroidWallpaperService } from "./AndroidWallpaperService";

interface WebsitePreviewProps {
  url: string;
  onClose?: () => void;
}

export function WebsitePreview({ url, onClose }: WebsitePreviewProps) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [previewMode, setPreviewMode] = useState<"mobile" | "desktop" | "native">("native");
  const [wallpaperActive, setWallpaperActive] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    setHasError(false);
  }, [url]);

  const handleIframeLoad = () => {
    setIsLoading(false);
  };

  const handleIframeError = () => {
    setIsLoading(false);
    setHasError(true);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
              Live Preview
            </Badge>
            <span className="text-sm text-muted-foreground truncate max-w-xs">
              {url}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => {
                if (previewMode === "native") setPreviewMode("mobile");
                else if (previewMode === "mobile") setPreviewMode("desktop");
                else setPreviewMode("native");
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              {previewMode === "native" ? (
                <Zap className="w-4 h-4" />
              ) : previewMode === "mobile" ? (
                <Monitor className="w-4 h-4" />
              ) : (
                <Smartphone className="w-4 h-4" />
              )}
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => window.location.reload()}
              className="text-muted-foreground hover:text-foreground"
            >
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Preview Container */}
      {previewMode === "native" ? (
        <div className="space-y-6">
          <NativeWebView url={url} onClose={onClose} />
          <AndroidWallpaperService 
            url={url} 
            isActive={wallpaperActive} 
            onToggle={setWallpaperActive} 
          />
        </div>
      ) : (
        <Card className="overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50 shadow-floating">
          <div className="relative">
            {/* Phone Frame for Mobile Preview */}
            {previewMode === "mobile" && (
              <div className="bg-gradient-primary p-4 rounded-t-lg">
                <div className="flex items-center justify-center">
                  <div className="text-primary-foreground text-sm font-medium">
                    Android 15 Wallpaper Preview
                  </div>
                </div>
              </div>
            )}

            <div
              className={`relative ${
                previewMode === "mobile"
                  ? "aspect-[9/16] max-w-sm mx-auto"
                  : "aspect-video w-full"
              } bg-background rounded-lg overflow-hidden`}
            >
              {isLoading && (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                  <div className="text-center space-y-3">
                    <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin mx-auto" />
                    <p className="text-sm text-muted-foreground">Loading 3D website...</p>
                  </div>
                </div>
              )}

              {hasError ? (
                <div className="absolute inset-0 flex items-center justify-center bg-background/90 backdrop-blur-sm">
                  <div className="text-center space-y-3 p-6">
                    <AlertTriangle className="w-12 h-12 text-destructive mx-auto" />
                    <div>
                      <h3 className="text-lg font-semibold text-foreground mb-2">
                        Preview Not Available
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        The website cannot be previewed due to security restrictions.
                        <br />
                        This is normal for many 3D websites.
                      </p>
                    </div>
                  </div>
                </div>
              ) : (
                <iframe
                  src={url}
                  title="Website Preview"
                  className="w-full h-full"
                  onLoad={handleIframeLoad}
                  onError={handleIframeError}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  loading="lazy"
                />
              )}
            </div>

            {/* Mobile UI Overlay */}
            {previewMode === "mobile" && (
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm rounded-full px-4 py-2 border border-border/50">
                  <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  <span className="text-xs text-foreground">Live Wallpaper Active</span>
                </div>
              </div>
            )}
          </div>
        </Card>
      )}

      {/* Info Card */}
      <Card className="p-4 bg-gradient-accent/10 border-accent/30">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-accent/20">
            <Smartphone className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-1">
              Live Wallpaper Concept
            </h4>
            <p className="text-xs text-muted-foreground">
              This preview shows how the 3D website would appear as an interactive wallpaper 
              on your Android home screen. The actual implementation requires native Android development.
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}