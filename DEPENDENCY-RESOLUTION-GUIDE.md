# Dependency Resolution Guide

This guide explains how to resolve dependency conflicts in the Capitol Insights project, particularly focusing on React and TypeScript type definitions.

## Current Issue

The build is failing due to a dependency conflict between:
- `@types/react-dom@19.1.1` (required by some dependencies)
- `@mdx-js/react@2.3.0` (which requires React 18.x)

This conflict causes an ERESOLVE error during the build process.

## Solution Implemented

We've implemented several strategies to resolve this conflict:

### 1. Package Overrides

Added explicit overrides in package.json:

```json
"overrides": {
  "@types/react-dom": "18.2.18",
  "@types/react": "18.2.48",
  "react": "18.2.0",
  "react-dom": "18.2.0"
},
"resolutions": {
  "@types/react-dom": "18.2.18",
  "@types/react": "18.2.48",
  "react": "18.2.0",
  "react-dom": "18.2.0"
}
```

These overrides force all dependencies to use the specified versions, preventing version conflicts.

### 2. NPM Configuration

Created an `.npmrc` file with the following settings:

```
legacy-peer-deps=true
force=true
```

This tells npm to:
- Use the legacy peer dependency resolution algorithm
- Force installation even with conflicting dependencies

### 3. Build Script

Created a custom `build.sh` script that:
- Cleans the node_modules directory
- Sets environment variables for dependency resolution
- Installs dependencies with the necessary flags
- Falls back to alternative approaches if needed
- Builds the project and runs optimizations

### 4. Netlify Configuration

Updated `netlify.toml` to:
- Use the custom build script
- Set environment variables for npm
- Increase Node.js memory allocation

## How to Use

### Local Development

For local development, use:

```bash
npm install --legacy-peer-deps --force
```

Or simply:

```bash
npm run install-deps:force
```

### CI/CD Builds

The CI/CD builds will automatically use the custom build script, which handles dependency resolution.

## Troubleshooting

If you encounter dependency issues:

1. Check the error logs for specific conflicts
2. Try clearing node_modules and package-lock.json:
   ```bash
   rm -rf node_modules package-lock.json
   ```
3. Reinstall with force and legacy-peer-deps:
   ```bash
   npm install --legacy-peer-deps --force
   ```
4. If issues persist, check for updates to dependencies that might resolve conflicts

## Long-term Solutions

For a more sustainable solution:

1. Consider downgrading dependencies that require newer React versions
2. Evaluate if all dependencies are necessary
3. Look for alternative packages with fewer conflicts
4. Consider migrating to a more modern build system like Turbopack or Vite

## References

- [NPM Dependency Resolution](https://docs.npmjs.com/cli/v8/configuring-npm/package-json#overrides)
- [Netlify Build Configuration](https://docs.netlify.com/configure-builds/file-based-configuration/)
- [React Version Compatibility](https://reactjs.org/blog/2022/03/08/react-18-upgrade-guide.html)