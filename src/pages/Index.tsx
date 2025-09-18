import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { URLInput } from "@/components/URLInput";
import { WebsitePreview } from "@/components/WebsitePreview";
import { InstructionsModal } from "@/components/InstructionsModal";
import { AndroidWallpaperImplementation } from "@/components/AndroidWallpaperImplementation";
import { NativeImplementationGuide } from "@/components/NativeImplementationGuide";
import { Smartphone, Globe, Sparkles, Zap, Code2, Play } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Index = () => {
  const [currentUrl, setCurrentUrl] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlSubmit = (url: string) => {
    setIsLoading(true);
    // Simulate loading delay
    setTimeout(() => {
      setCurrentUrl(url);
      setIsLoading(false);
    }, 1000);
  };

  const handleClearPreview = () => {
    setCurrentUrl(null);
  };

  return (
    <div className="min-h-screen bg-gradient-background">
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-primary/10 backdrop-blur-3xl" />
        <div className="relative container max-w-6xl mx-auto px-4 py-8">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="p-3 rounded-2xl bg-gradient-primary shadow-glow">
                <Smartphone className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                  3D Live Wallpaper
                </h1>
                <p className="text-muted-foreground">
                  Native Android app for 3D website wallpapers
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Badge 
                variant="outline" 
                className="bg-accent/10 text-accent border-accent/30 hidden sm:flex items-center gap-2"
              >
                <Sparkles className="w-3 h-3" />
                Android 15 Ready
              </Badge>
              <InstructionsModal />
            </div>
          </div>

          {/* Hero Section */}
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                    <Zap className="w-3 h-3 mr-1" />
                    Concept Demo
                  </Badge>
                </div>
                <h2 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
                  Native Android
                  <br />
                  <span className="bg-gradient-accent bg-clip-text text-transparent">
                    3D Wallpapers
                  </span>
                </h2>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Native Android app using WebView to display 3D websites as 
                  fully interactive live wallpapers on your home screen.
                </p>
              </div>

              {/* Features */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-border/50">
                  <div className="p-2 rounded-full bg-primary/20">
                    <Globe className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">3D Website Support</p>
                    <p className="text-xs text-muted-foreground">Three.js, Babylon.js & more</p>
                  </div>
                </div>
                <div className="flex items-center gap-3 p-3 rounded-lg bg-background/30 backdrop-blur-sm border border-border/50">
                  <div className="p-2 rounded-full bg-accent/20">
                    <Smartphone className="w-4 h-4 text-accent" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">Touch Interactive</p>
                    <p className="text-xs text-muted-foreground">Full gesture support</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-primary/20 rounded-2xl blur-3xl transform rotate-6" />
              <Card className="relative overflow-hidden bg-gradient-card backdrop-blur-sm border-border/50 shadow-floating">
                <img
                  src={heroImage}
                  alt="Android 15 3D Wallpaper Concept"
                  className="w-full h-auto object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <Badge variant="outline" className="bg-background/80 backdrop-blur-sm text-foreground border-border/50">
                    Live 3D Wallpaper Preview
                  </Badge>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-6xl mx-auto px-4 py-8 space-y-8">
        <Tabs defaultValue="preview" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="preview" className="flex items-center gap-2">
              <Globe className="w-4 h-4" />
              Preview & Test
            </TabsTrigger>
            <TabsTrigger value="implementation" className="flex items-center gap-2">
              <Smartphone className="w-4 h-4" />
              Live Demo
            </TabsTrigger>
            <TabsTrigger value="code" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              Implementation
            </TabsTrigger>
          </TabsList>

          <TabsContent value="preview" className="space-y-8">
            {/* URL Input */}
            {!currentUrl && (
              <div className="max-w-2xl mx-auto">
                <URLInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
              </div>
            )}

            {/* Website Preview */}
            {currentUrl && (
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-xl font-semibold text-foreground">
                    Wallpaper Preview
                  </h3>
                  <div className="flex items-center gap-2">
                    <URLInput onSubmit={handleUrlSubmit} isLoading={isLoading} />
                  </div>
                </div>
                <WebsitePreview url={currentUrl} onClose={handleClearPreview} />
              </div>
            )}
          </TabsContent>

          <TabsContent value="implementation" className="space-y-8">
            <AndroidWallpaperImplementation />
          </TabsContent>

          <TabsContent value="code" className="space-y-8">
            <NativeImplementationGuide />
          </TabsContent>
        </Tabs>

        {/* Bottom Info */}
        <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 text-center">
          <div className="space-y-3">
            <div className="flex items-center justify-center gap-2">
              <Sparkles className="w-5 h-5 text-accent" />
              <h4 className="text-lg font-semibold text-foreground">
                Native Android 3D Wallpaper App
              </h4>
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              This native Android app uses Capacitor and WebView to display interactive 3D websites 
              as live wallpapers. Experience hardware-accelerated graphics, touch gestures, and 
              seamless integration with Android's wallpaper system.
            </p>
            <InstructionsModal />
          </div>
        </Card>
      </main>
    </div>
  );
};

export default Index;