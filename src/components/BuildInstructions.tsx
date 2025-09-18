import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Code2, 
  Download, 
  Terminal, 
  Smartphone,
  CheckCircle,
  ExternalLink,
  Copy,
  GitBranch
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";

export function BuildInstructions() {
  const [copiedCommand, setCopiedCommand] = useState<string | null>(null);
  const { toast } = useToast();

  const commands = [
    { step: 1, command: "git clone your-repo-url", description: "Clone from GitHub" },
    { step: 2, command: "cd web-live-3d-magic && npm install", description: "Install dependencies" },
    { step: 3, command: "npx cap add android", description: "Add Android platform" },
    { step: 4, command: "npm run build", description: "Build the web app" },
    { step: 5, command: "npx cap sync android", description: "Sync to native Android" },
    { step: 6, command: "npx cap run android", description: "Build and run on device" },
  ];

  const copyCommand = async (command: string) => {
    try {
      await navigator.clipboard.writeText(command);
      setCopiedCommand(command);
      toast({
        title: "Copied!",
        description: "Command copied to clipboard",
      });
      setTimeout(() => setCopiedCommand(null), 2000);
    } catch (error) {
      toast({
        title: "Copy failed",
        description: "Please copy the command manually",
        variant: "destructive",
      });
    }
  };

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
              Build Native Android App
            </h2>
            <p className="text-muted-foreground mt-1">
              Complete instructions to build and deploy your 3D wallpaper app
            </p>
          </div>
          <Badge 
            variant="outline" 
            className="bg-accent/10 text-accent border-accent/30"
          >
            Ready to Build
          </Badge>
        </div>
      </Card>

      {/* Prerequisites */}
      <Card className="p-6 bg-background/30 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <CheckCircle className="w-5 h-5 text-primary" />
          Prerequisites
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Required Software:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Node.js 18+ and npm</li>
              <li>• Android Studio with SDK</li>
              <li>• Java 17+ (JDK)</li>
              <li>• Git for version control</li>
            </ul>
          </div>
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Android Setup:</h4>
            <ul className="space-y-1 text-muted-foreground">
              <li>• Android SDK Platform 34+</li>
              <li>• Android SDK Build-Tools</li>
              <li>• Android Emulator or physical device</li>
              <li>• USB debugging enabled</li>
            </ul>
          </div>
        </div>
      </Card>

      {/* Step-by-step Commands */}
      <Card className="p-6 bg-background/30 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Terminal className="w-5 h-5 text-primary" />
          Build Commands
        </h3>
        <div className="space-y-4">
          {commands.map((cmd) => (
            <div key={cmd.step} className="flex items-center gap-4 p-4 rounded-lg bg-background/50 border border-border/30">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/20 text-primary text-sm font-bold">
                {cmd.step}
              </div>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-3">
                  <code className="flex-1 text-sm bg-muted/50 px-3 py-2 rounded border font-mono text-foreground">
                    {cmd.command}
                  </code>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => copyCommand(cmd.command)}
                    className="text-muted-foreground hover:text-foreground"
                  >
                    {copiedCommand === cmd.command ? (
                      <CheckCircle className="w-4 h-4 text-accent" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                <p className="text-xs text-muted-foreground">{cmd.description}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Export Instructions */}
      <Card className="p-6 bg-primary/5 border-primary/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <GitBranch className="w-5 h-5 text-primary" />
          Export to GitHub First
        </h3>
        <div className="space-y-4">
          <p className="text-sm text-muted-foreground">
            Before building locally, you need to export this project to your GitHub repository:
          </p>
          <div className="flex items-center gap-3 p-4 rounded-lg bg-background/50 border border-border/30">
            <div className="p-2 rounded bg-primary/20">
              <Download className="w-4 h-4 text-primary" />
            </div>
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">Use "Export to GitHub" button</p>
              <p className="text-xs text-muted-foreground">Find it in the top-right menu of your Lovable project</p>
            </div>
            <Button variant="outline" size="sm" className="text-xs">
              <ExternalLink className="w-3 h-3 mr-1" />
              How to Export
            </Button>
          </div>
        </div>
      </Card>

      {/* Expected Result */}
      <Card className="p-6 bg-accent/5 border-accent/20">
        <h3 className="text-lg font-semibold text-foreground mb-4 flex items-center gap-2">
          <Smartphone className="w-5 h-5 text-accent" />
          Expected Result
        </h3>
        <div className="space-y-3 text-sm text-muted-foreground">
          <p>After successfully following these steps, you will have:</p>
          <ul className="space-y-2">
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>Native Android APK installed on your device</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>3D websites running as interactive wallpapers</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>Hardware-accelerated WebView with touch support</span>
            </li>
            <li className="flex items-start gap-2">
              <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
              <span>Full native Android integration capabilities</span>
            </li>
          </ul>
        </div>
      </Card>

      {/* Additional Resources */}
      <Card className="p-6 bg-background/30 border-border/50">
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Additional Resources
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="justify-start h-auto p-3 w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium">Capacitor Documentation</p>
                <p className="text-xs text-muted-foreground">Official Capacitor docs</p>
              </div>
            </Button>
          </div>
          <div className="space-y-2">
            <Button variant="outline" size="sm" className="justify-start h-auto p-3 w-full">
              <ExternalLink className="w-4 h-4 mr-2" />
              <div className="text-left">
                <p className="font-medium">Android Studio Setup</p>
                <p className="text-xs text-muted-foreground">Development environment</p>
              </div>
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}