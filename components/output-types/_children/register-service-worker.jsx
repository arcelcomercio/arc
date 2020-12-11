import * as React from 'react'

/* 
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('${path}');
  });
}
*/

/* 
async function addToCache(urls) {
  const myCache = await window.caches.open('my-cache');
  await myCache.addAll(urls);
}

// Call addToCache whenever you'd like. E.g. to add to cache after a page load:
window.addEventListener('load', () => {
  // ...determine the list of related URLs for the current page...
  addToCache(['/static/relatedUrl1', '/static/relatedUrl2']);
});
 */

const RegisterServiceWorker = ({ register, path = "/sw.js?d=1" }) => register ? (
  <script dangerouslySetInnerHTML={{
    __html: `
      if ('serviceWorker' in navigator) {
        // Use the window load event to keep the page load performant
        window.addEventListener('load', () => {
          navigator.serviceWorker.register('${path}');
        });
      }
    `
  }} />
) : null

export default RegisterServiceWorker