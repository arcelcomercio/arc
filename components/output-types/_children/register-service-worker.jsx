import * as React from 'react'

/* 
if ('serviceWorker' in navigator) {
  // Use the window load event to keep the page load performant
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('${path}');
  });
}
*/

const RegisterServiceWorker = ({ disable = false, path = '/sw.js?d=1' }) =>
  disable ? null : (
    <script
      dangerouslySetInnerHTML={{
        __html: `"use strict";"serviceWorker"in navigator&&window.addEventListener("load",function(){navigator.serviceWorker.register("${path}")});`,
      }}
    />
  )

export default React.memo(RegisterServiceWorker)

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
