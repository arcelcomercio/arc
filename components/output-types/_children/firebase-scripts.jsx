import React from 'react'
import { useFusionContext } from 'fusion:context'

const FirebaseScripts = () => {
  const { metaValue, arcSite } = useFusionContext()

  const fidPolyfills =
    '!function(n,e){var t,o,i,c=[],f={passive:!0,capture:!0},r=new Date,a="pointerup",u="pointercancel";function p(n,c){t||(t=c,o=n,i=new Date,w(e),s())}function s(){o>=0&&o<i-r&&(c.forEach(function(n){n(o,t)}),c=[])}function l(t){if(t.cancelable){var o=(t.timeStamp>1e12?new Date:performance.now())-t.timeStamp;"pointerdown"==t.type?function(t,o){function i(){p(t,o),r()}function c(){r()}function r(){e(a,i,f),e(u,c,f)}n(a,i,f),n(u,c,f)}(o,t):p(o,t)}}function w(n){["click","mousedown","keydown","touchstart","pointerdown"].forEach(function(e){n(e,l,f)})}w(n),self.perfMetrics=self.perfMetrics||{},self.perfMetrics.onFirstInputDelay=function(n){c.push(n),s()}}(addEventListener,removeEventListener);'

  const performanceStandalone =
    '"https://www.gstatic.com/firebasejs/6.4.0/firebase-performance-standalone.js"'
  const firebaseConfig =
    '{apiKey:"AIzaSyB2e3iql1AFHBpaiQvCxd9hF-PAPkRLV2s",authDomain:"pagespeed-comercio.firebaseapp.com",databaseURL:"https://pagespeed-comercio.firebaseio.com",projectId:"pagespeed-comercio",storageBucket:"pagespeed-comercio.appspot.com",messagingSenderId:"581352883274",appId:"1:581352883274:web:8692e6bcc724550bff12b3"}'

  const sdk = `(function(sa,fbc){function load(f,c){var a=document.createElement('script');a.async=1;a.src=f;var s=document.getElementsByTagName('script')[0];s.parentNode.insertBefore(a,s)}load(sa);window.onload=function(){firebase.initializeApp(fbc).performance()}})(${performanceStandalone},${firebaseConfig})`

  return (
    <>
      {arcSite === 'elcomercio' && metaValue('id') === 'meta_home' && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: `${fidPolyfills}${sdk}`,
          }}
        />
      )}
    </>
  )
}

export default FirebaseScripts
