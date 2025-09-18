import { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'app.lovable.77ef1998e786419f844f5e2a97bc1754',
  appName: 'A Lovable project',
  webDir: 'dist',
  server: {
    url: 'https://77ef1998-e786-419f-844f-5e2a97bc1754.lovableproject.com?forceHideBadge=true',
    cleartext: true
  },
  android: {
    allowMixedContent: true,
    captureInput: true,
    webContentsDebuggingEnabled: true
  }
};

export default config;