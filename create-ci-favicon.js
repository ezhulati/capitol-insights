import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Get current directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create CI Letters SVG favicon
const ciFavicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <style>
    .background { fill: #1a365d; }
    .letters { fill: #e4b425; }
    @media (prefers-color-scheme: dark) {
      .background { fill: #1a365d; }
      .letters { fill: #ffc107; }
    }
  </style>
  <circle class="background" cx="50" cy="50" r="50"/>
  <path class="letters" d="M30 35c0-1.1 0.9-2 2-2h12c5.5 0 10 4.5 10 10v0c0 5.5-4.5 10-10 10H35v12c0 1.1-0.9 2-2 2h-1c-1.1 0-2-0.9-2-2V35zm7 0v13h7c3.3 0 6-2.7 6-6v0c0-3.3-2.7-6-6-6H37z"/>
  <path class="letters" d="M56 35c0-1.1 0.9-2 2-2h1c1.1 0 2 0.9 2 2v30c0 1.1-0.9 2-2 2h-1c-1.1 0-2-0.9-2-2V35z"/>
</svg>`;

// Create 192x192 version
const ciFavicon192 = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <style>
    .background { fill: #1a365d; }
    .letters { fill: #e4b425; }
    @media (prefers-color-scheme: dark) {
      .background { fill: #1a365d; }
      .letters { fill: #ffc107; }
    }
  </style>
  <circle class="background" cx="96" cy="96" r="96"/>
  <path class="letters" d="M55 65c0-2.2 1.8-4 4-4h24c11 0 20 9 20 20v0c0 11-9 20-20 20H67v24c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V65zm14 4v26h14c6.6 0 12-5.4 12-12v0c0-6.6-5.4-12-12-12H69z"/>
  <path class="letters" d="M110 65c0-2.2 1.8-4 4-4h4c2.2 0 4 1.8 4 4v60c0 2.2-1.8 4-4 4h-4c-2.2 0-4-1.8-4-4V65z"/>
</svg>`;

// Save the CI favicon files
fs.writeFileSync(path.join(__dirname, 'public', 'ci-favicon.svg'), ciFavicon);
fs.writeFileSync(path.join(__dirname, 'public', 'ci-favicon-192.svg'), ciFavicon192);

console.log('CI favicon SVG files created successfully!');
