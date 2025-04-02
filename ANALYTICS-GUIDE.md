# Google Analytics Implementation Guide

This guide explains how Google Analytics 4 (GA4) is implemented in the Capitol Insights website.

## Overview

Google Analytics has been implemented to track user interactions, page views, and performance metrics. The implementation uses Google Analytics 4 (GA4) with the Measurement ID `G-04T2WHMD23`.

## Implementation Details

### 1. Base Script Installation

The Google Analytics base script is added to the `<head>` section of `index.html`:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-04T2WHMD23"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'G-04T2WHMD23');
</script>
```

### 2. React Integration

A utility file (`src/utils/analytics.ts`) provides React-friendly functions for interacting with Google Analytics:

- `pageview(url, title)`: Tracks page views
- `event(params)`: Tracks custom events
- `timing(params)`: Tracks performance timing
- `setUserProperties(properties)`: Sets user properties
- `initAnalytics()`: Initializes analytics with custom dimensions

### 3. Automatic Page View Tracking

Page views are automatically tracked in the `ScrollToTop` component in `App.tsx`, which runs whenever the route changes:

```typescript
// Track page view when route changes
useEffect(() => {
  // Send pageview to Google Analytics
  const url = pathname + search + hash;
  analytics.pageview(url);
  
  // Track page view event
  analytics.event({
    action: 'page_view',
    category: 'Navigation',
    label: pathname
  });
}, [pathname, search, hash]);
```

### 4. Performance Tracking

Performance metrics are tracked using the `timing` function:

```typescript
analytics.timing({
  name: 'page_load',
  value: Math.round(loadTimeMs),
  category: 'Performance',
  label: pageName
});
```

## Using Analytics in Components

### Tracking Page Views

Page views are automatically tracked when routes change. No additional code is needed.

### Tracking Events

To track user interactions or custom events:

```typescript
import analytics from '../utils/analytics';

// In your component
const handleButtonClick = () => {
  analytics.event({
    action: 'button_click',
    category: 'Engagement',
    label: 'Download Button'
  });
  
  // Rest of your code
};
```

### Tracking Form Submissions

For tracking form submissions:

```typescript
const handleFormSubmit = (formData) => {
  analytics.event({
    action: 'form_submit',
    category: 'Conversion',
    label: 'Contact Form'
  });
  
  // Process form submission
};
```

### Tracking Downloads

For tracking resource downloads:

```typescript
const handleDownload = (resourceName) => {
  analytics.event({
    action: 'download',
    category: 'Engagement',
    label: resourceName
  });
  
  // Initiate download
};
```

## Custom Dimensions and Metrics

The following custom dimensions are set up:

1. `custom_dimension1`: Site name ("Capitol Insights")
2. `custom_dimension2`: Environment (development/production)

## Debugging Analytics

To debug analytics in development:

1. Open browser console
2. Look for logs with `[Analytics]` prefix
3. Use Google Analytics Debugger browser extension
4. Enable debug mode in Google Analytics admin

## Privacy Considerations

- User IP anonymization is enabled
- No personally identifiable information (PII) is collected
- Cookie consent is implemented through the privacy banner
- Data retention is set to 14 months

## Compliance

This implementation complies with:

- General Data Protection Regulation (GDPR)
- California Consumer Privacy Act (CCPA)
- ePrivacy Directive (Cookie Law)

## Reporting

Access analytics data through:

1. Google Analytics dashboard: https://analytics.google.com/
2. Custom reports can be created in the GA4 interface
3. Data can be exported to Google Data Studio for advanced reporting

## Maintenance

To maintain the analytics implementation:

1. Regularly review event tracking to ensure it captures relevant user interactions
2. Update tracking code when new features are added
3. Periodically review analytics data for insights
4. Keep the Google Analytics library updated