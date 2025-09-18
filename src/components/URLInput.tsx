import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Zap, Sparkles } from "lucide-react";

interface URLInputProps {
  onSubmit: (url: string) => void;
  isLoading?: boolean;
}

export function URLInput({ onSubmit, isLoading = false }: URLInputProps) {
  const [url, setUrl] = useState("");
  const [error, setError] = useState("");

  const sampleWebsites = [
    {
      name: "Three.js Examples",
      url: "https://threejs.org/examples/webgl_animation_cloth.html",
      description: "Realistic cloth simulation"
    },
    {
      name: "Babylon.js Playground", 
      url: "https://playground.babylonjs.com/#9WUJN#1",
      description: "Interactive 3D playground"
    },
    {
      name: "WebGL Fluid",
      url: "https://paveldogreat.github.io/WebGL-Fluid-Simulation/",
      description: "Fluid dynamics simulation"
    }
  ];

  const validateURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  const handleSubmit = () => {
    if (!url.trim()) {
      setError("Please enter a URL");
      return;
    }

    if (!validateURL(url)) {
      setError("Please enter a valid URL");
      return;
    }

    setError("");
    onSubmit(url);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSubmit();
    }
  };

  return (
    <Card className="p-6 bg-gradient-card backdrop-blur-sm border-border/50 shadow-card">
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-full bg-gradient-primary">
            <Globe className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-foreground">
              Enter 3D Website URL
            </h3>
            <p className="text-sm text-muted-foreground">
              Paste the URL of a 3D website to preview as wallpaper
            </p>
          </div>
        </div>

        <div className="space-y-2">
          <Input
            type="url"
            placeholder="https://example.com/3d-website"
            value={url}
            onChange={(e) => {
              setUrl(e.target.value);
              if (error) setError("");
            }}
            onKeyPress={handleKeyPress}
            className="bg-background/50 border-border focus:ring-primary focus:border-primary transition-smooth"
          />
          {error && <p className="text-sm text-destructive">{error}</p>}
        </div>

        <Button
          onClick={handleSubmit}
          disabled={isLoading || !url.trim()}
          className="w-full bg-gradient-primary text-primary-foreground hover:opacity-90 transition-smooth"
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin mr-2" />
              Loading Preview...
            </>
          ) : (
            <>
              <Zap className="w-4 h-4 mr-2" />
              Preview Wallpaper
            </>
          )}
        </Button>

        {/* Sample Websites */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <div className="h-px bg-border flex-1" />
            <span className="text-xs text-muted-foreground">Or try these examples</span>
            <div className="h-px bg-border flex-1" />
          </div>
          
          <div className="grid gap-2">
            {sampleWebsites.map((site, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => {
                  setUrl(site.url);
                  setError("");
                  onSubmit(site.url);
                }}
                disabled={isLoading}
                className="justify-start h-auto p-3 bg-background/30 hover:bg-background/50 border-border/50"
              >
                <div className="flex items-start gap-3 w-full">
                  <div className="p-1.5 rounded bg-primary/10">
                    <Sparkles className="w-3 h-3 text-primary" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-sm font-medium text-foreground">{site.name}</p>
                    <p className="text-xs text-muted-foreground">{site.description}</p>
                  </div>
                </div>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
}