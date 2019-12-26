/* eslint-disable react/no-danger */
import React from 'react'
import Content from 'fusion:content'

const getSectionSlug = (sectionId = '') => {
  return sectionId.split('/')[1] || ''
}

const Dfp = ({
  deployment,
  contextPath,
  siteProperties = {},
  metaValueId,
  globalContent = {},
}) => {
  const { adsAmp: { dataSlot } = {} } = siteProperties
  const initAds = `"use strict";var arcAds=new ArcAds({dfp:{id:"${dataSlot}"}},function(d){console.log("Advertisement has loaded...",d)});
  googletag.cmd.push(function() {
    googletag.pubads().enableLazyLoad({
      fetchMarginPercent: 500,  // Fetch slots within 5 viewports.
      renderMarginPercent: 100,  // Render slots within 2 viewports.
      mobileScaling: 2.0  // Double the above values on mobile.
    });
    googletag.enableServices();
  });
  `

  const {
    section_id: sectionId,
    _id,
    taxonomy: { primary_section: { _id: primarySection } = {} } = {},
  } = globalContent

  let contentConfigValues = {}
  switch (metaValueId) {
    case 'meta_section':
      contentConfigValues = {
        page: 'sect',
        section: getSectionSlug(sectionId || _id),
      }
      break
    case 'meta_story':
      contentConfigValues = {
        page: 'post',
        section: getSectionSlug(primarySection),
      }
      break
    case 'meta_home':
      contentConfigValues = {
        page: 'home',
      }
      break
    default:
      contentConfigValues = {
        page: sectionId || _id ? 'sect' : 'home',
        section: getSectionSlug(sectionId || _id || ''),
      }
      break
  }

  const adsRegister = `
  const ads= [{
    id: 'div-gpt-ad-1575672648476-0',
    slotName: 'publimetro_home_web_medrec1',
    dimensions:  [[320, 50], [300, 250], [300, 100], [300, 600], [320, 100], [300, 50]], 
    display: 'desktop',
  },
  {
    id: 'div-gpt-ad-1575481232603-0',
    slotName: 'pub_ia_interna4',
    dimensions: [[300, 250]],
    display: 'desktop',
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
    <Content
      {...{
        contentService: 'story-by-section',
        contentConfigValues,
      }}>
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
              __html: `var aa = ${JSON.stringify(content)}`,
            }}
          />
        </>
      )}
    </Content>
  )
}

export default Dfp
