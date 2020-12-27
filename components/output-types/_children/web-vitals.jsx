import * as React from 'react'

/* 
addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    function sendToGTM({name, delta, id}) {
      dataLayer = dataLayer || []
      dataLayer.push({
        event: 'web-vitals',
        event_category: 'Web Vitals',
        event_action: name,
        event_value: Math.round(name === 'CLS' ? delta * 1000 : delta),
        event_label: id,
      });
    }
    webVitals.getCLS(sendToGTM);
    webVitals.getFID(sendToGTM);
    webVitals.getLCP(sendToGTM);

    webVitals.getFCP(sendToGTM);
    webVitals.getTTFB((metric) => {
      const requestTime = metric.value - metric.entries[0].requestStart;
      metric.value = requestTime
      sendToGTM(metric)
    });
  })
});
 */

/* Se agrega el parametro `report` en caso que se quiera deshabilitar 
WebVitals dinamicamente, por ejemplo, desde siteProperties */

const WebVitals = ({ report = true }) =>
  report ? (
    <>
      <script defer src="https://unpkg.com/web-vitals"></script>
      <script
        dangerouslySetInnerHTML={{
          __html: `"use strict";addEventListener("DOMContentLoaded",function(){requestIdle(function(){function e(e){var t=e.name,a=e.delta,n=e.id;dataLayer=dataLayer||[],dataLayer.push({event:"web-vitals",event_category:"Web Vitals",event_action:t,event_value:Math.round("CLS"===t?1e3*a:a),event_label:n})}webVitals.getCLS(e),webVitals.getFID(e),webVitals.getLCP(e),webVitals.getFCP(e),webVitals.getTTFB(function(t){var a=t.value-t.entries[0].requestStart;t.value=a,e(t)})})});`,
        }}
      />
    </>
  ) : null

export default React.memo(WebVitals)
