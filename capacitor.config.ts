import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.weblive3dmagic',
  appName: 'web-live-3d-magic',
  webDir: 'dist',
  server: {
    url: "https://2965ecff-fb16-484a-ae5c-6012ea36b0c3.lovableproject.com?forceHideBadge=true",
    cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: "#1a1a2e",
      showSpinner: true,
      spinnerColor: "#6366f1"
    }
  }
};

export default config;