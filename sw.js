if(!self.define){let e,s={};const i=(i,a)=>(i=new URL(i+".js",a).href,s[i]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=i,e.onload=s,document.head.appendChild(e)}else e=i,importScripts(i),s()})).then((()=>{let e=s[i];if(!e)throw new Error(`Module ${i} didn’t register its module`);return e})));self.define=(a,l)=>{const r=e||("document"in self?document.currentScript.src:"")||location.href;if(s[r])return;let n={};const c=e=>i(e,r),o={module:{uri:r},exports:n,require:c};s[r]=Promise.all(a.map((e=>o[e]||c(e)))).then((e=>(l(...e),n)))}}define(["./workbox-9b32c73f"],(function(e){"use strict";self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"admin/index.html",revision:"a9d92c8d0da8734664bd3758a4a215fd"},{url:"admin/index.js",revision:"91aad4e2ac1307f646344160ebd36c9b"},{url:"assets/ApproachPage-c217ac03.js",revision:null},{url:"assets/BlogPostPage-ad926434.js",revision:null},{url:"assets/BreadcrumbNavigation-a76e09f9.js",revision:null},{url:"assets/browser-30303c76.js",revision:null},{url:"assets/ContactPage-1f95b5d7.js",revision:null},{url:"assets/content-provider-08b23d99.js",revision:null},{url:"assets/DownloadForm-b29c15be.js",revision:null},{url:"assets/enhanced-seo-4a9491f0.js",revision:null},{url:"assets/FAQAccordion-c6b07713.js",revision:null},{url:"assets/FAQPage-d6208e94.js",revision:null},{url:"assets/HomePage-a0ebee50.js",revision:null},{url:"assets/index-7ca087c8.js",revision:null},{url:"assets/index-88bc5318.css",revision:null},{url:"assets/LegislativeCalendarPage-a1c9f1cd.js",revision:null},{url:"assets/mdx-sanity-0ddb556c.js",revision:null},{url:"assets/motion-55a23653.js",revision:null},{url:"assets/NotFoundPage-68ed1f26.js",revision:null},{url:"assets/OptimizedImage-e46c986d.js",revision:null},{url:"assets/PolicyBriefingsPage-825de97f.js",revision:null},{url:"assets/PracticeAreasPage-0c216f16.js",revision:null},{url:"assets/PrivacyPolicyPage-a6241f05.js",revision:null},{url:"assets/react-c3d7d9ee.js",revision:null},{url:"assets/ResourcesPage-39e9bc03.js",revision:null},{url:"assets/ResultsPage-e49aa4a4.js",revision:null},{url:"assets/SEO-8193143e.js",revision:null},{url:"assets/ServicesPage-6e1e078f.js",revision:null},{url:"assets/stegaEncodeSourceMap-a8f8daa2.js",revision:null},{url:"assets/SuccessStoriesPage-ffae88d0.js",revision:null},{url:"assets/TeamPage-17941b59.js",revision:null},{url:"assets/TermsPage-53e0c68c.js",revision:null},{url:"assets/ui-d40fa30f.js",revision:null},{url:"assets/UpdatesPage-360f0d39.js",revision:null},{url:"assets/vendor-f90ff671.js",revision:null},{url:"contact-form.html",revision:"a13a7fd4eeae7a44b6204fbb0e2976e5"},{url:"css/critical.css",revision:"47c7cab87a4d855f0c3fbb97477746b1"},{url:"css/document-styles.css",revision:"02569006e03951e39164d62154b90878"},{url:"download-form.html",revision:"141ae6b75fb44654c5953c4a80ff5719"},{url:"download-success.html",revision:"9deeb7943b4627286b8d1072055f6ac8"},{url:"downloads/texas-legislative-calendar-2025.html",revision:"766b06f28695add8b6a1f173410b7503"},{url:"files/energy-grid-reliability.html",revision:"3f4537135b7c0ffaa3a40896e69bcb5e"},{url:"files/healthcare-regulatory-changes.html",revision:"45416cdc4f8393002e73b3a228acbb75"},{url:"files/municipal-advocacy-strategies-part2.html",revision:"3493bcb953a7cb4d9ca1d6c6ae5a5511"},{url:"files/municipal-advocacy-strategies.html",revision:"38f582bb14b58eff8ae6fa67e4604cae"},{url:"files/telecommunications-regulatory-outlook-part2.html",revision:"488298c53a69bd81fd2427892c53ca66"},{url:"files/telecommunications-regulatory-outlook.html",revision:"f74d9a721509d1e405cb3fe967d043fc"},{url:"files/texas-legislative-calendar-2025.html",revision:"e9badd98f26d0277090a2a00f86c4181"},{url:"files/texas-legislative-influence-guide-2025.html",revision:"b5488250e825126ba5312a50e4f0d233"},{url:"files/texas-transportation-funding-outlook-part2.html",revision:"94df8c2ae16bbf93db6cd12096c18022"},{url:"files/texas-transportation-funding-outlook.html",revision:"2abcb13ebc3669b71c2adc2af7af1f21"},{url:"files/water-infrastructure-funding.html",revision:"99c47890f2fed693cefff14d471e75d7"},{url:"index.html",revision:"c5627434438b9f7a5f806c593d24db75"},{url:"js/advocacy-navigation.js",revision:"8ecedb1e810cb12c94eeb5ee867cff30"},{url:"js/defer-js.js",revision:"0ec8441d54070e3d571b39999a2fa7b4"},{url:"js/document-enhancements.js",revision:"5f7795c7c7d5afcbda3223a642eb45c8"},{url:"js/dom-purify.js",revision:"88ae618b2a4e9e840a5386f9316b7306"},{url:"js/image-preload.js",revision:"fd972277bef57e9e4491390aa9a57401"},{url:"js/meta-fixer.js",revision:"188ae07096e4153772baceac2dc23a43"},{url:"js/structured-data.js",revision:"c7b6c7866387437f8e866686540b97eb"},{url:"meta-fixer.js",revision:"4fab00bc78ce47dc8efbbcd89af93ec2"},{url:"netlify-cms.js",revision:"6f04ae2bddff9f2632e5e505ce08e89f"},{url:"registerSW.js",revision:"1872c500de691dce40960bb85481de07"},{url:"success.html",revision:"2c60566bcb9fb7052eb9fa08490e61a9"},{url:"apple-touch-icon.png",revision:"81fa33ee6de38b51d1568611c31c170f"},{url:"favicon.ico",revision:"3fc6eef55397c823c910d6a7740e52fb"},{url:"robots.txt",revision:"95324f9ec892902e095e5b426cbe29a2"},{url:"manifest.webmanifest",revision:"263a0ea836d52c6ea40043d4d2ebdaee"}],{}),e.cleanupOutdatedCaches(),e.registerRoute(new e.NavigationRoute(e.createHandlerBoundToURL("index.html"))),e.registerRoute(/^https:\/\/fonts\.googleapis\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.gstatic\.com\/.*/i,new e.CacheFirst({cacheName:"gstatic-fonts-cache",plugins:[new e.ExpirationPlugin({maxEntries:10,maxAgeSeconds:31536e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET"),e.registerRoute(/^https:\/\/images\.unsplash\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"unsplash-images-cache",plugins:[new e.ExpirationPlugin({maxEntries:50,maxAgeSeconds:2592e3}),new e.CacheableResponsePlugin({statuses:[0,200]})]}),"GET")}));
