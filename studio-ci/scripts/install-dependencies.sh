#!/bin/bash
# Install dependencies needed for Sanity content creation scripts

echo "Installing dependencies for Sanity content scripts..."

# Change to the studio directory
cd "$(dirname "$0")/.."

# Install required packages
npm install --save @sanity/client nanoid slugify

echo "Dependencies installed successfully"
