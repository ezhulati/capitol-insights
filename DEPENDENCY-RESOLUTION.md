# Dependency Resolution Guide

This document outlines common dependency conflicts in the Capitol Insights project and how to resolve them.

## TypeScript Dependency Conflicts

### React Types Compatibility Issue

We encountered a peer dependency conflict between `@types/react-dom` and `@types/react` versions:

```
ERESOLVE unable to resolve dependency tree
npm ERR! peer @types/react@"^18.0.0" from @types/react-dom@19.0.4
npm ERR! node_modules/@types/react-dom
npm ERR!   @types/react-dom@"^18.3.0" from the root project
npm ERR! 
npm ERR! Could not resolve dependency:
npm ERR! peer @types/react@"^18.0.0" from @types/react-dom@19.0.4
npm ERR! node_modules/@types/react-dom
npm ERR!   @types/react-dom@"^18.3.0" from the root project
```

### Resolution

We implemented the following solutions:

1. **Aligned TypeScript type definitions:**
   - Updated `@types/react` to version `^18.3.20` (explicitly matches installed version)
   - Updated `@types/react-dom` to version `^18.3.5` (explicitly matches installed version)

2. **Added build safety mechanisms:**
   - Created `build:ci` script that uses `--legacy-peer-deps` flag
   - Added `install-deps` script that uses `--legacy-peer-deps` flag
   - Updated Netlify build command to use the `build:ci` script
   - Updated GitHub Actions workflows to use `--legacy-peer-deps` flag

### When to Use `--legacy-peer-deps`

The `--legacy-peer-deps` flag should be used in the following scenarios:

1. When installing dependencies for the first time on a new environment
2. When CI/CD pipelines are building the project
3. When updating multiple dependencies at once
4. When experiencing peer dependency conflicts that cannot be resolved by version adjustments

### Recommended Commands

For local development:

```bash
# Install dependencies with peer dependency resolution bypass
npm run install-deps

# Or manually
npm install --legacy-peer-deps
```

For deployment/CI:

```bash
# Use the CI-specific build command
npm run build:ci
```

## Future-Proofing

To avoid similar issues in the future:

1. Use Dependabot to keep dependencies updated systematically
2. Run periodic dependency reviews (quarterly)
3. Consider using `npm-check-updates` to plan major version migrations

The automated security scanning workflow has been configured to handle these dependency conflicts automatically by using the `--legacy-peer-deps` flag during installation.
