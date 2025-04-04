// Microsoft Clarity initialization using npm package
import Clarity from '@microsoft/clarity';

// Initialize Clarity with project ID
Clarity.start({
    projectId: "jnkxcpnlxs",
    upload: 'https://www.clarity.ms/collect',
    delay: 500,
    track: true,
    content: true,
    ip: true,
    cookies: ['_uetsid', '_uetvid']
});

// Log initialization
console.log("Microsoft Clarity initialized");
