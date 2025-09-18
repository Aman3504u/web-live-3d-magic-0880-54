import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Smartphone, Zap, Download } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-secondary/20">
      {/* Header */}
      <header className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-r from-primary to-primary-glow" />
            <span className="text-xl font-semibold">Android Builder</span>
          </div>
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Build Fixed
          </Badge>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Hero Section */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent">
              Android Build Fixed
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your Android build issues have been resolved with optimized Capacitor configuration and clean Gradle setup.
            </p>
          </div>

          {/* Status Cards */}
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            <Card className="border-green-200 bg-green-50/50">
              <CardContent className="p-6 text-center">
                <CheckCircle className="h-12 w-12 text-green-600 mx-auto mb-3" />
                <h3 className="font-semibold text-green-800">Build Fixed</h3>
                <p className="text-sm text-green-700 mt-2">Gradle configuration optimized</p>
              </CardContent>
            </Card>
            
            <Card className="border-blue-200 bg-blue-50/50">
              <CardContent className="p-6 text-center">
                <Smartphone className="h-12 w-12 text-blue-600 mx-auto mb-3" />
                <h3 className="font-semibold text-blue-800">Mobile Ready</h3>
                <p className="text-sm text-blue-700 mt-2">Capacitor configured for Android</p>
              </CardContent>
            </Card>
            
            <Card className="border-purple-200 bg-purple-50/50">
              <CardContent className="p-6 text-center">
                <Zap className="h-12 w-12 text-purple-600 mx-auto mb-3" />
                <h3 className="font-semibold text-purple-800">Optimized</h3>
                <p className="text-sm text-purple-700 mt-2">Clean GitHub Actions workflow</p>
              </CardContent>
            </Card>
          </div>

          {/* Instructions */}
          <div className="bg-card rounded-2xl p-8 shadow-soft border max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-4 flex items-center justify-center gap-2">
              <Download className="h-6 w-6" />
              Next Steps
            </h2>
            <div className="space-y-4 text-left">
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Push with a tag to trigger build:</p>
                  <code className="block bg-muted p-2 rounded mt-1 text-sm">
                    git tag v1.0.0 && git push origin v1.0.0
                  </code>
                </div>
              </div>
              
              <div className="flex items-start gap-3">
                <div className="rounded-full bg-primary/10 p-1 mt-1">
                  <div className="w-2 h-2 rounded-full bg-primary" />
                </div>
                <div>
                  <p className="font-medium">Or build locally:</p>
                  <code className="block bg-muted p-2 rounded mt-1 text-sm">
                    npm run build && npx cap sync android
                  </code>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="pt-8">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-primary to-primary-glow hover:shadow-medium transition-all"
            >
              Start Building Your App
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Index;
