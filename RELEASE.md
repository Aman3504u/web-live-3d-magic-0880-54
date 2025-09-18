# 🚀 Release Guide - Web Live 3D Magic Android App

## Quick Release Process

### 1. Automated Release (Recommended)

```bash
# Make the release script executable
chmod +x scripts/release.sh

# Create a new release (e.g., version 1.0.0)
./scripts/release.sh 1.0.0
```

This will:
- ✅ Update all version numbers
- ✅ Commit changes and create a Git tag
- ✅ Trigger GitHub Actions to build APK
- ✅ Automatically create GitHub release with APK files

### 2. Manual Release Process

If you prefer manual control:

```bash
# 1. Update version in package.json
npm version 1.0.0 --no-git-tag-version

# 2. Build the web app
npm run build

# 3. Sync to Android
npx cap sync android

# 4. Commit and tag
git add .
git commit -m "chore: release v1.0.0"
git tag v1.0.0
git push origin main
git push origin v1.0.0
```

## 🔧 Android 15 Configuration

This app is configured for **Android 15 (API 35)**:

- **Minimum SDK**: Android 8.0 (API 26)
- **Target SDK**: Android 15 (API 35)
- **Compile SDK**: Android 15 (API 35)

### Key Android 15 Features Enabled:
- Hardware acceleration for WebView
- OpenGL ES 3.0 support
- Live wallpaper service
- Touch interaction support
- Optimized for latest Android runtime

## 📱 Installation Guide for Users

### For End Users:
1. Download the APK from [GitHub Releases](../../releases)
2. Enable "Install from unknown sources" in Android Settings
3. Install the APK file
4. Go to Settings > Wallpaper > Live Wallpapers
5. Select "Web Live 3D Magic"

### APK Files Explanation:
- **app-debug.apk**: Debug version for testing and development
- **app-release-unsigned.apk**: Production version (unsigned for sideloading)

## 🛠️ Local Development Build

### Prerequisites:
- Node.js 18+
- Android Studio with SDK
- Java 17+ (JDK)
- Git

### Build Commands:
```bash
# 1. Clone and setup
git clone <your-repo-url>
cd web-live-3d-magic
npm install

# 2. Add Android platform
npx cap add android

# 3. Build web app
npm run build

# 4. Sync to native
npx cap sync android

# 5. Open in Android Studio
npx cap open android

# 6. Or build APK via command line
cd android
./gradlew assembleDebug    # For debug APK
./gradlew assembleRelease  # For release APK
```

## 🔐 Code Signing (Optional)

For distribution on Google Play Store, you'll need to sign the APK:

1. Generate a keystore:
```bash
keytool -genkey -v -keystore my-release-key.keystore -keyalg RSA -keysize 2048 -validity 10000 -alias my-key-alias
```

2. Add to `android/app/build.gradle`:
```gradle
android {
    signingConfigs {
        release {
            storeFile file('path/to/my-release-key.keystore')
            storePassword 'your-store-password'
            keyAlias 'my-key-alias'
            keyPassword 'your-key-password'
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
        }
    }
}
```

## 🔄 GitHub Actions Workflow

The automated workflow (`.github/workflows/android-release.yml`) will:

1. **Trigger on**: Git tags (e.g., `v1.0.0`) or manual dispatch
2. **Build Process**:
   - Setup Node.js, Java, and Android SDK
   - Install dependencies and build web app
   - Sync Capacitor and build APK
   - Upload artifacts and create GitHub release

3. **Outputs**:
   - Debug APK for testing
   - Release APK for distribution
   - Automatic release notes

## 📊 Version Management

- **package.json**: Controls web app version
- **android/app/build.gradle**: Controls Android app version
- **Git tags**: Trigger automated releases

## 🐛 Troubleshooting

### Common Issues:

1. **Gradle build fails**: Ensure Android SDK 35 is installed
2. **Capacitor sync errors**: Run `npx cap doctor` to check setup
3. **APK not installing**: Enable "Install from unknown sources"
4. **WebView not loading**: Check internet permission and cleartext traffic

### Debug Commands:
```bash
# Check Capacitor setup
npx cap doctor

# Clean build
cd android && ./gradlew clean

# Check Android SDK
$ANDROID_HOME/cmdline-tools/latest/bin/sdkmanager --list
```

## 🚀 Next Steps

After successful release:
1. Test APK on multiple devices
2. Gather user feedback
3. Plan next version features
4. Consider Play Store publication

---

**Note**: This guide assumes you've exported your project to GitHub and are working with your own repository.