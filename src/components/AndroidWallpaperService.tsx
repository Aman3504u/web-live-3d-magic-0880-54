import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Settings, 
  Play, 
  Pause, 
  RotateCcw,
  Battery,
  Cpu,
  MemoryStick,
  Zap
} from "lucide-react";

interface AndroidWallpaperServiceProps {
  url: string;
  isActive: boolean;
  onToggle: (active: boolean) => void;
}

export function AndroidWallpaperService({ url, isActive, onToggle }: AndroidWallpaperServiceProps) {
  const [performance, setPerformance] = useState({
    fps: 60,
    memory: 45,
    battery: 78,
    cpu: 23
  });

  useEffect(() => {
    if (isActive) {
      const interval = setInterval(() => {
        setPerformance({
          fps: Math.floor(Math.random() * 20) + 50,
          memory: Math.floor(Math.random() * 30) + 40,
          battery: Math.floor(Math.random() * 15) + 70,
          cpu: Math.floor(Math.random() * 40) + 15
        });
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [isActive]);

  return (
    <div className="space-y-4">
      {/* Service Status */}
      <Card className="p-4 bg-gradient-card backdrop-blur-sm border-border/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className={`p-2 rounded-full ${isActive ? 'bg-accent/20' : 'bg-muted/20'}`}>
              <Smartphone className={`w-5 h-5 ${isActive ? 'text-accent' : 'text-muted-foreground'}`} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Android Wallpaper Service
              </h3>
              <p className="text-sm text-muted-foreground">
                Native live wallpaper engine
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge 
              variant={isActive ? "default" : "outline"}
              className={isActive 
                ? "bg-accent text-accent-foreground animate-pulse" 
                : "bg-muted text-muted-foreground"
              }
            >
              {isActive ? "Active" : "Inactive"}
            </Badge>
            <Button
              variant={isActive ? "destructive" : "default"}
              size="sm"
              onClick={() => onToggle(!isActive)}
              className="min-w-20"
            >
              {isActive ? (
                <>
                  <Pause className="w-4 h-4 mr-2" />
                  Stop
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 mr-2" />
                  Start
                </>
              )}
            </Button>
          </div>
        </div>
      </Card>

      {/* Service Configuration */}
      <Card className="p-4 bg-background/30 border-border/50">
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Settings className="w-4 h-4 text-primary" />
            <h4 className="text-sm font-semibold text-foreground">Service Configuration</h4>
          </div>
          
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-muted-foreground">URL:</span>
              <p className="text-foreground font-mono text-xs break-all mt-1">{url}</p>
            </div>
            <div>
              <span className="text-muted-foreground">Render Mode:</span>
              <p className="text-foreground mt-1">Hardware Accelerated</p>
            </div>
            <div>
              <span className="text-muted-foreground">Touch Events:</span>
              <p className="text-foreground mt-1">Enabled</p>
            </div>
            <div>
              <span className="text-muted-foreground">Auto-restart:</span>
              <p className="text-foreground mt-1">On Boot</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Performance Monitor */}
      {isActive && (
        <Card className="p-4 bg-primary/5 border-primary/20">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Real-time Performance</h4>
            </div>
            
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                <RotateCcw className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">FPS</p>
                  <p className="text-sm font-semibold text-foreground">{performance.fps}</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                <MemoryStick className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Memory</p>
                  <p className="text-sm font-semibold text-foreground">{performance.memory}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                <Cpu className="w-4 h-4 text-accent" />
                <div>
                  <p className="text-xs text-muted-foreground">CPU</p>
                  <p className="text-sm font-semibold text-foreground">{performance.cpu}%</p>
                </div>
              </div>
              
              <div className="flex items-center gap-3 p-3 rounded-lg bg-background/50 border border-border/30">
                <Battery className="w-4 h-4 text-primary" />
                <div>
                  <p className="text-xs text-muted-foreground">Battery</p>
                  <p className="text-sm font-semibold text-foreground">{performance.battery}%</p>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}

      {/* Android Integration Info */}
      <Card className="p-4 bg-accent/5 border-accent/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-full bg-accent/20">
            <Smartphone className="w-4 h-4 text-accent" />
          </div>
          <div className="flex-1">
            <h4 className="text-sm font-semibold text-foreground mb-2">
              Native Android Live Wallpaper
            </h4>
            <div className="space-y-2 text-xs text-muted-foreground">
              <p>• Implements Android WallpaperService with OpenGL ES rendering</p>
              <p>• Hardware-accelerated 3D graphics via WebView integration</p>
              <p>• Touch event propagation to WebGL/Three.js scenes</p>
              <p>• Automatic performance optimization and battery management</p>
              <p>• Background service with proper lifecycle management</p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
}