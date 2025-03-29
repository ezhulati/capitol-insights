#!/bin/bash
# Deploy to production script for Capitol Insights

# Exit on error
set -e

echo "==== Capitol Insights Production Deployment ===="
echo "This script will deploy your Sanity integration to production"
echo ""

# 1. Make sure we're on the main branch
echo "Checking git branch..."
CURRENT_BRANCH=$(git branch --show-current)
if [ "$CURRENT_BRANCH" != "main" ]; then
  echo "WARNING: You're not on the main branch. Current branch: $CURRENT_BRANCH"
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment aborted."
    exit 1
  fi
fi

# 2. Make sure all changes are committed
echo "Checking for uncommitted changes..."
if [ -n "$(git status --porcelain)" ]; then
  echo "WARNING: You have uncommitted changes."
  read -p "Continue anyway? (y/n) " -n 1 -r
  echo
  if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Deployment aborted."
    exit 1
  fi
fi

# 3. Build the project
echo "Building project for production..."
npm run build

# 4. Deploy to Netlify 
echo "Deploying to Netlify..."
echo "NOTE: If this is your first deployment, you'll need to link to your existing Netlify site"
echo "Select 'Link this directory to an existing site' when prompted"
echo ""

# Get Netlify site ID for later use in webhooks setup
NETLIFY_SITE_ID=$(netlify sites:list --json | jq -r '.[0].site_id')
if [ -z "$NETLIFY_SITE_ID" ]; then
  echo "Please run 'netlify link' first to connect to your Netlify site"
  netlify link
  NETLIFY_SITE_ID=$(netlify sites:list --json | jq -r '.[0].site_id')
fi

echo "Deploying to Netlify site ID: $NETLIFY_SITE_ID"
netlify deploy --prod --dir=dist

# 5. Create build hook for Sanity webhooks to trigger
echo ""
echo "Creating Netlify build hook for Sanity..."
BUILD_HOOK_NAME="Sanity CMS Trigger"
BUILD_HOOK_URL=$(netlify build:hooks:create "$NETLIFY_SITE_ID" --json | jq -r '.url')

echo ""
echo "==== IMPORTANT: SANITY WEBHOOK SETUP ===="
echo "Copy this build hook URL to set up your Sanity webhook:"
echo "$BUILD_HOOK_URL"
echo ""
echo "To set up the Sanity webhook:"
echo "1. Go to https://www.sanity.io/manage"
echo "2. Select your Capitol Insights project"
echo "3. Navigate to API > Webhooks"
echo "4. Click 'Create webhook'"
echo "5. Enter the following details:"
echo "   - Name: Production Deploy"
echo "   - URL: $BUILD_HOOK_URL"
echo "   - Trigger on: Check all three (Create, Update, Delete)"
echo "   - Filter: Leave empty to trigger on all content changes"
echo "   - Projection: Leave empty"
echo "   - HTTP method: POST"
echo "   - HTTP Headers: None needed"
echo "   - Enable webhook: Toggle on"
echo ""
echo "Deployment complete! Your site should now be live with Sanity integration."
echo "When you publish changes in Sanity, your site will automatically rebuild."
