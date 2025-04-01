# Security Guidelines for Capitol Insights

This document outlines best practices and procedures for maintaining the security of the Capitol Insights website.

## Regular Security Audits

### Automated Security Scanning

We have implemented automated security scanning to regularly check for vulnerabilities:

1. **NPM Audit**: Checks for known vulnerabilities in npm dependencies
   ```bash
   npm run security-audit    # View security issues
   npm run security-fix      # Fix non-breaking security issues
   npm run security-fix-force # Fix all issues (may include breaking changes)
   ```

2. **Snyk Scanning**: Provides deeper vulnerability scanning and fix advice
   ```bash
   npm run snyk-test         # Check for vulnerabilities
   npm run snyk-monitor      # Monitor project in Snyk dashboard
   ```

3. **GitHub CodeQL Analysis**: Runs semantic code analysis to find security issues in your code
   - Automatically runs on each PR and scheduled weekly via GitHub Actions

### Dependency Management

1. **Dependabot Integration**: Automatically generates PRs for outdated dependencies
   - Configured to check weekly for updates
   - Grouped development dependencies to minimize PR noise
   - Labels each PR with "dependencies" and "security" tags

2. **Manual Dependency Review**: Should be performed quarterly
   ```bash
   # Get an overview of outdated packages
   npm outdated
   
   # Update dependencies to their latest versions
   npm update
   ```

## Security Best Practices

### Code Security

1. **Input Validation**
   - Always validate and sanitize user inputs server-side
   - Use the validator and xss libraries for validation and sanitization

2. **Content Security Policy**
   - Maintain a strict CSP using nonces instead of 'unsafe-inline'
   - Keep inline scripts to a minimum; prefer external JS files

3. **CSRF Protection**
   - Always include CSRF tokens in forms
   - Validate tokens on the server side before processing requests

4. **Rate Limiting**
   - Apply appropriate rate limits to API endpoints
   - Use different limits for different endpoints based on sensitivity

5. **Sensitive Information**
   - Never store credentials in code or commit them to version control
   - Use environment variables for all sensitive configuration
   - Rotate credentials regularly, especially when team members leave

### Server Security

1. **Server-Side Request Forgery (SSRF) Prevention**
   - Use allowlists for permitted domains in server-side requests
   - Never allow unchecked user input to determine server request destinations

2. **Puppeteer Script Security**
   - Always validate URLs, selectors, and output paths
   - Use headless mode in production
   - Add authentication when necessary
   - Apply strict Content Security Policy

## Incident Response

In case of a security incident:

1. Immediately rotate any potentially compromised credentials
2. Document the incident and the response actions taken
3. Review logs to understand the scope and impact
4. Implement fixes and additional safeguards
5. Conduct a post-mortem analysis to prevent similar incidents

## Security Contacts

- **GitHub Security**: Report vulnerabilities through GitHub's security advisory feature
- **Internal Security Team**: security@capitol-insights.com

---

Last updated: April 1, 2025
