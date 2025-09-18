#!/bin/bash

# Release script for Web Live 3D Magic Android App
set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}🚀 Starting release process for Web Live 3D Magic${NC}"

# Check if version is provided
if [ -z "$1" ]; then
    echo -e "${RED}❌ Please provide a version number (e.g., ./scripts/release.sh 1.0.0)${NC}"
    exit 1
fi

VERSION=$1
TAG="v$VERSION"

echo -e "${YELLOW}📋 Release version: $VERSION${NC}"

# Verify we're on main branch
BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$BRANCH" != "main" ]; then
    echo -e "${RED}❌ Please switch to main branch before releasing${NC}"
    exit 1
fi

# Check if working directory is clean
if [ -n "$(git status --porcelain)" ]; then
    echo -e "${RED}❌ Working directory is not clean. Please commit or stash changes.${NC}"
    exit 1
fi

# Update version in package.json
echo -e "${YELLOW}📝 Updating version in package.json...${NC}"
npm version $VERSION --no-git-tag-version

# Update version in Android
echo -e "${YELLOW}📝 Updating Android version...${NC}"
sed -i.bak "s/versionName \".*\"/versionName \"$VERSION\"/" android/app/build.gradle
rm -f android/app/build.gradle.bak

# Update version in capacitor.config.ts
echo -e "${YELLOW}📝 Updating Capacitor config...${NC}"
sed -i.bak "s/appName: '.*'/appName: 'web-live-3d-magic'/" capacitor.config.ts
rm -f capacitor.config.ts.bak

# Build the project
echo -e "${YELLOW}🔨 Building web application...${NC}"
npm run build

# Sync Capacitor
echo -e "${YELLOW}🔄 Syncing Capacitor...${NC}"
npx cap sync android

# Commit changes
echo -e "${YELLOW}📝 Committing version updates...${NC}"
git add package.json android/app/build.gradle capacitor.config.ts
git commit -m "chore: bump version to $VERSION"

# Create and push tag
echo -e "${YELLOW}🏷️  Creating and pushing tag...${NC}"
git tag $TAG
git push origin main
git push origin $TAG

echo -e "${GREEN}✅ Release $VERSION completed successfully!${NC}"
echo -e "${GREEN}🎉 GitHub Actions will now build and create the release automatically.${NC}"
echo -e "${YELLOW}📱 Check the Actions tab on GitHub to monitor the build progress.${NC}"

# Open GitHub releases page
if command -v open &> /dev/null; then
    echo -e "${YELLOW}🌐 Opening GitHub releases page...${NC}"
    sleep 2
    open "https://github.com/$(git config --get remote.origin.url | sed 's/.*github.com[\/:]\([^.]*\).*/\1/')/releases"
fi