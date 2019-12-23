/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'

const Dfp = ({ deployment, contextPath, siteProperties = {} }) => {
  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});`
  const adsRegister = `
  const ads= [{
    id: 'div-gpt-ad-1575672648476-0',
    slotName: 'publimetro_home_web_medrec1',
    dimensions:  [[320, 50], [300, 250], [300, 100], [300, 600], [320, 100], [300, 50]], 
    display: 'desktop',
    prerender: window.addLazyLoad,
  },
  {
    id: 'div-gpt-ad-1575481232603-0',
    slotName: 'pub_ia_interna4',
    dimensions: [[300, 250]],
    display: 'desktop',
    prerender: window.addLazyLoad,
  },
  {
    id: 'div-gpt-ad-1575672648476-1',
    slotName: 'publimetro_home_web_medrec1',
    dimensions:  [[320, 50], [300, 250], [300, 100], [300, 600], [320, 100], [300, 50]], 
    display: 'desktop'
  },
  {
    id: 'div-gpt-ad-1575672648476-2',
    slotName: 'publimetro_home_web_medrec1',
    dimensions:  [[320, 50], [300, 250], [300, 100], [300, 600], [320, 100], [300, 50]], 
    display: 'desktop'
  }];

  arcAds.registerAdCollection(ads);

  `
  return (
    <Content {...{ contentService: 'get-ads-spaces' }}>
      {content => (
        <>
          <script
            src={deployment(`${contextPath}/resources/assets/js/arcads.js`)}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: initAds }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{ __html: adsRegister }}
          />
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: `var aa = "${JSON.stringify(content)}"`,
            }}
          />
        </>
      )}
    </Content>
  )
}

export default Dfp
