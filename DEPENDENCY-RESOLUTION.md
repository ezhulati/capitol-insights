# Dependency Resolution Guide

This guide provides instructions on how to resolve dependency conflicts in the Capitol Insights website project.

## Common Dependency Issues

### React Types Conflict

The project uses React 18 with TypeScript. There can sometimes be conflicts between `@types/react` and `@types/react-dom` versions.

#### Current Compatible Versions

```json
"@types/react": "^18.2.48",
"@types/react-dom": "^18.2.18"
```

If you encounter conflicts with these packages, try the following solutions:

### Solution 1: Use Legacy Peer Dependencies Flag

```bash
npm install --legacy-peer-deps
```

Or use the npm script:

```bash
npm run install-deps
```

### Solution 2: Use Force Flag

```bash
npm install --force
```

Or use the npm script:

```bash
npm run install-deps:force
```

### Solution 3: Manually Update Dependencies

If the above solutions don't work, you may need to manually update the dependencies in `package.json`:

1. Open `package.json`
2. Update the versions of the conflicting dependencies
3. Run `npm install --legacy-peer-deps`

## Troubleshooting Build Failures

If you encounter build failures related to dependencies, check the following:

### ERESOLVE Errors

ERESOLVE errors indicate dependency conflicts. The error message will usually include information about which packages are in conflict.

Example error:
```
ERESOLVE unable to resolve dependency tree
```

#### Steps to Resolve:

1. Identify the conflicting packages from the error message
2. Check if they are direct dependencies or transitive dependencies
3. If direct dependencies, update their versions in `package.json`
4. If transitive dependencies, try using `--legacy-peer-deps` or `--force` flags
5. As a last resort, use `npm dedupe` to remove duplicate packages

### Peer Dependency Warnings

Peer dependency warnings indicate that a package expects a specific version of another package.

Example warning:
```
npm WARN ERESOLVE overriding peer dependency
```

These warnings don't necessarily cause build failures, but they can lead to runtime issues if the versions are incompatible.

#### Steps to Resolve:

1. Check if the warning is for a critical dependency
2. If critical, update the package versions to be compatible
3. If not critical, you can usually ignore the warning

## Keeping Dependencies Updated

To keep dependencies updated and minimize conflicts:

1. Regularly run `npm outdated` to check for outdated packages
2. Update packages one at a time to identify which updates cause conflicts
3. Use `npm update` to update packages to their latest compatible versions
4. Consider using tools like Renovate or Dependabot for automated updates

## Package-lock.json

The `package-lock.json` file ensures consistent installations across environments. If you encounter dependency issues:

1. Try deleting `package-lock.json` and running `npm install` again
2. If that doesn't work, keep `package-lock.json` and use `--legacy-peer-deps` or `--force` flags
3. Commit the updated `package-lock.json` to ensure consistent installations for all developers

## CI/CD Considerations

For CI/CD environments:

1. Use `npm ci` instead of `npm install` for faster, more reliable installations
2. If using `npm ci` with dependency conflicts, you may need to modify the CI configuration to use `npm install --legacy-peer-deps` instead
3. Consider adding a step to the CI pipeline to check for dependency issues before building
