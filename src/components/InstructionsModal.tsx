import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  HelpCircle, 
  Smartphone, 
  Globe, 
  Code, 
  Zap,
  CheckCircle,
  AlertCircle
} from "lucide-react";

export function InstructionsModal() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
          <HelpCircle className="w-4 h-4 mr-2" />
          How it works
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-gradient-card backdrop-blur-sm border-border/50">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Native Android 3D Wallpaper App
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Built with Capacitor for native Android WebView functionality
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* How it Works */}
          <Card className="p-4 bg-background/30 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Zap className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">How it Works</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <p>
                This native Android app uses Capacitor and WebView to display 3D websites 
                as interactive wallpapers. The app packages your React web interface with 
                native Android capabilities.
              </p>
              <p>
                The wallpaper responds to touch gestures, displays animations, and 
                provides an immersive 3D experience directly on your Android device.
              </p>
            </div>
          </Card>

          {/* Native App Features */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/20">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Native Android Features</h3>
            </div>
            <div className="space-y-2 text-sm text-muted-foreground">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                <p>Capacitor integration for native Android packaging</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                <p>WebView component for displaying 3D websites</p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-primary/60 mt-2 flex-shrink-0" />
                <p>Touch gesture support and hardware acceleration</p>
              </div>
            </div>
          </Card>

          {/* Build Instructions */}
          <Card className="p-4 bg-accent/5 border-accent/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-accent/20">
                <Code className="w-5 h-5 text-accent" />
              </div>
              <h3 className="text-lg font-semibold">Building Native App</h3>
            </div>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div>
                <strong className="text-foreground">Step 1:</strong> Export project to GitHub and pull locally
              </div>
              <div>
                <strong className="text-foreground">Step 2:</strong> Run <code className="bg-background/50 px-1 rounded">npm install</code>
              </div>
              <div>
                <strong className="text-foreground">Step 3:</strong> Add Android: <code className="bg-background/50 px-1 rounded">npx cap add android</code>
              </div>
              <div>
                <strong className="text-foreground">Step 4:</strong> Build: <code className="bg-background/50 px-1 rounded">npm run build && npx cap sync</code>
              </div>
              <div>
                <strong className="text-foreground">Step 5:</strong> Run: <code className="bg-background/50 px-1 rounded">npx cap run android</code>
              </div>
              <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
                <p className="text-primary text-sm">
                  📱 This will build and install the native Android APK on your device!
                </p>
              </div>
            </div>
          </Card>

          {/* Supported Features */}
          <Card className="p-4 bg-primary/5 border-primary/20">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/20">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Potential Features</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Interactive 3D scenes</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Touch gestures</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Animation support</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-primary flex-shrink-0" />
                <span className="text-muted-foreground">Real-time updates</span>
              </div>
            </div>
          </Card>

          {/* Sample URLs */}
          <Card className="p-4 bg-background/30 border-border/50">
            <div className="flex items-center gap-3 mb-3">
              <div className="p-2 rounded-full bg-primary/20">
                <Globe className="w-5 h-5 text-primary" />
              </div>
              <h3 className="text-lg font-semibold">Try These 3D Websites</h3>
            </div>
            <div className="space-y-2 text-sm">
              <div className="bg-background/50 rounded-lg p-3">
                <code className="text-primary break-all">https://threejs.org/examples/</code>
                <p className="text-muted-foreground mt-1">Three.js examples with various 3D scenes</p>
              </div>
              <div className="bg-background/50 rounded-lg p-3">
                <code className="text-primary break-all">https://www.babylonjs.com/demos/</code>
                <p className="text-muted-foreground mt-1">Babylon.js interactive 3D demos</p>
              </div>
            </div>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}