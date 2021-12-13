import { AnyObject } from 'fusion:content'
import { string } from 'prop-types'
import React from 'react'
import { EmbedConfig } from 'types/story'

import {
  SITE_DEPOR,
  SITE_ELBOCON,
  SITE_ELCOMERCIO,
  SITE_ELCOMERCIOMAG,
  SITE_GESTION,
  SITE_TROME,
} from '../../utilities/constants/sitenames'

const style = `html{overflow-x:hidden!important}html.i-amphtml-fie{height:100%!important;width:100%!important}html:not([amp4ads]),html:not([amp4ads]) body{height:auto!important}html:not([amp4ads]) body{margin:0!important}body{-webkit-text-size-adjust:100%;-moz-text-size-adjust:100%;-ms-text-size-adjust:100%;text-size-adjust:100%}html.i-amphtml-singledoc.i-amphtml-embedded{-ms-touch-action:pan-y pinch-zoom;touch-action:pan-y pinch-zoom}html.i-amphtml-fie>body,html.i-amphtml-singledoc>body{overflow:visible!important}html.i-amphtml-fie:not(.i-amphtml-inabox)>body,html.i-amphtml-singledoc:not(.i-amphtml-inabox)>body{position:relative!important}html.i-amphtml-ios-embed-legacy>body{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important}html.i-amphtml-ios-embed{overflow-y:auto!important;position:static}#i-amphtml-wrapper{overflow-x:hidden!important;overflow-y:auto!important;position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;margin:0!important;display:block!important}html.i-amphtml-ios-embed.i-amphtml-ios-overscroll,html.i-amphtml-ios-embed.i-amphtml-ios-overscroll>#i-amphtml-wrapper{-webkit-overflow-scrolling:touch!important}#i-amphtml-wrapper>body{position:relative!important;border-top:1px solid transparent!important}#i-amphtml-wrapper+body{visibility:visible}#i-amphtml-wrapper+body .i-amphtml-lightbox-element,#i-amphtml-wrapper+body[i-amphtml-lightbox]{visibility:hidden}#i-amphtml-wrapper+body[i-amphtml-lightbox] .i-amphtml-lightbox-element{visibility:visible}#i-amphtml-wrapper.i-amphtml-scroll-disabled,.i-amphtml-scroll-disabled{overflow-x:hidden!important;overflow-y:hidden!important}amp-instagram{padding:54px 0px 0px!important;background-color:#fff}amp-iframe iframe{box-sizing:border-box!important}[amp-access][amp-access-hide]{display:none}[subscriptions-dialog],body:not(.i-amphtml-subs-ready) [subscriptions-action],body:not(.i-amphtml-subs-ready) [subscriptions-section]{display:none!important}amp-experiment,amp-live-list>[update]{display:none}amp-list[resizable-children]>.i-amphtml-loading-container.amp-hidden{display:none!important}amp-list [fetch-error],amp-list[load-more] [load-more-button],amp-list[load-more] [load-more-end],amp-list[load-more] [load-more-failed],amp-list[load-more] [load-more-loading]{display:none}amp-list[diffable] div[role=list]{display:block}amp-story-page,amp-story[standalone]{min-height:1px!important;display:block!important;height:100%!important;margin:0!important;padding:0!important;overflow:hidden!important;width:100%!important}amp-story[standalone]{background-color:#000!important;position:relative!important}amp-story-page{background-color:#757575}amp-story .amp-active>div,amp-story .i-amphtml-loader-background{display:none!important}amp-story-page:not(:first-of-type):not([distance]):not([active]){transform:translateY(1000vh)!important}amp-autocomplete{position:relative!important;display:inline-block!important}amp-autocomplete>input,amp-autocomplete>textarea{padding:0.5rem;border:1px solid rgba(0,0,0,0.33)}.i-amphtml-autocomplete-results,amp-autocomplete>input,amp-autocomplete>textarea{font-size:1rem;line-height:1.5rem}[amp-fx^=fly-in]{visibility:hidden}amp-script[nodom],amp-script[sandboxed]{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}
            /*# sourceURL=/css/ampdoc.css*/[hidden]{display:none!important}.i-amphtml-element{display:inline-block}.i-amphtml-blurry-placeholder{transition:opacity 0.3s cubic-bezier(0.0,0.0,0.2,1)!important;pointer-events:none}[layout=nodisplay]:not(.i-amphtml-element){display:none!important}.i-amphtml-layout-fixed,[layout=fixed][width][height]:not(.i-amphtml-layout-fixed){display:inline-block;position:relative}.i-amphtml-layout-responsive,[layout=responsive][width][height]:not(.i-amphtml-layout-responsive),[width][height][heights]:not([layout]):not(.i-amphtml-layout-responsive),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-layout-responsive){display:block;position:relative}.i-amphtml-layout-intrinsic,[layout=intrinsic][width][height]:not(.i-amphtml-layout-intrinsic){display:inline-block;position:relative;max-width:100%}.i-amphtml-layout-intrinsic .i-amphtml-sizer{max-width:100%}.i-amphtml-intrinsic-sizer{max-width:100%;display:block!important}.i-amphtml-layout-container,.i-amphtml-layout-fixed-height,[layout=container],[layout=fixed-height][height]:not(.i-amphtml-layout-fixed-height){display:block;position:relative}.i-amphtml-layout-fill,.i-amphtml-layout-fill.i-amphtml-notbuilt,[layout=fill]:not(.i-amphtml-layout-fill),body noscript>*{display:block;overflow:hidden!important;position:absolute;top:0;left:0;bottom:0;right:0}body noscript>*{position:absolute!important;width:100%;height:100%;z-index:2}body noscript{display:inline!important}.i-amphtml-layout-flex-item,[layout=flex-item]:not(.i-amphtml-layout-flex-item){display:block;position:relative;-ms-flex:1 1 auto;flex:1 1 auto}.i-amphtml-layout-fluid{position:relative}.i-amphtml-layout-size-defined{overflow:hidden!important}.i-amphtml-layout-awaiting-size{position:absolute!important;top:auto!important;bottom:auto!important}i-amphtml-sizer{display:block!important}@supports (aspect-ratio:1/1){i-amphtml-sizer.i-amphtml-disable-ar{display:none!important}}.i-amphtml-blurry-placeholder,.i-amphtml-fill-content{display:block;height:0;max-height:100%;max-width:100%;min-height:100%;min-width:100%;width:0;margin:auto}.i-amphtml-layout-size-defined .i-amphtml-fill-content{position:absolute;top:0;left:0;bottom:0;right:0}.i-amphtml-replaced-content,.i-amphtml-screen-reader{padding:0!important;border:none!important}.i-amphtml-screen-reader{position:fixed!important;top:0px!important;left:0px!important;width:4px!important;height:4px!important;opacity:0!important;overflow:hidden!important;margin:0!important;display:block!important;visibility:visible!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:8px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:12px!important}.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader~.i-amphtml-screen-reader{left:16px!important}.i-amphtml-unresolved{position:relative;overflow:hidden!important}.i-amphtml-select-disabled{-webkit-user-select:none!important;-ms-user-select:none!important;user-select:none!important}.i-amphtml-notbuilt,[layout]:not(.i-amphtml-element),[width][height][heights]:not([layout]):not(.i-amphtml-element),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-element){position:relative;overflow:hidden!important;color:transparent!important}.i-amphtml-notbuilt:not(.i-amphtml-layout-container)>*,[layout]:not([layout=container]):not(.i-amphtml-element)>*,[width][height][heights]:not([layout]):not(.i-amphtml-element)>*,[width][height][sizes]:not([layout]):not(.i-amphtml-element)>*{display:none}amp-img:not(.i-amphtml-element)[i-amphtml-ssr]>img.i-amphtml-fill-content{display:block}.i-amphtml-notbuilt:not(.i-amphtml-layout-container),[layout]:not([layout=container]):not(.i-amphtml-element),[width][height][heights]:not([layout]):not(.i-amphtml-element),[width][height][sizes]:not(img):not([layout]):not(.i-amphtml-element){color:transparent!important;line-height:0!important}.i-amphtml-ghost{visibility:hidden!important}.i-amphtml-element>[placeholder],[layout]:not(.i-amphtml-element)>[placeholder],[width][height][heights]:not([layout]):not(.i-amphtml-element)>[placeholder],[width][height][sizes]:not([layout]):not(.i-amphtml-element)>[placeholder]{display:block;line-height:normal}.i-amphtml-element>[placeholder].amp-hidden,.i-amphtml-element>[placeholder].hidden{visibility:hidden}.i-amphtml-element:not(.amp-notsupported)>[fallback],.i-amphtml-layout-container>[placeholder].amp-hidden,.i-amphtml-layout-container>[placeholder].hidden{display:none}.i-amphtml-layout-size-defined>[fallback],.i-amphtml-layout-size-defined>[placeholder]{position:absolute!important;top:0!important;left:0!important;right:0!important;bottom:0!important;z-index:1}amp-img[i-amphtml-ssr]:not(.i-amphtml-element)>[placeholder]{z-index:auto}.i-amphtml-notbuilt>[placeholder]{display:block!important}.i-amphtml-hidden-by-media-query{display:none!important}.i-amphtml-element-error{background:red!important;color:#fff!important;position:relative!important}.i-amphtml-element-error:before{content:attr(error-message)}i-amp-scroll-container,i-amphtml-scroll-container{position:absolute;top:0;left:0;right:0;bottom:0;display:block}i-amp-scroll-container.amp-active,i-amphtml-scroll-container.amp-active{overflow:auto;-webkit-overflow-scrolling:touch}.i-amphtml-loading-container{display:block!important;pointer-events:none;z-index:1}.i-amphtml-notbuilt>.i-amphtml-loading-container{display:block!important}.i-amphtml-loading-container.amp-hidden{visibility:hidden}.i-amphtml-element>[overflow]{cursor:pointer;position:relative;z-index:2;visibility:hidden;display:initial;line-height:normal}.i-amphtml-layout-size-defined>[overflow]{position:absolute}.i-amphtml-element>[overflow].amp-visible{visibility:visible}template{display:none!important}.amp-border-box,.amp-border-box *,.amp-border-box :after,.amp-border-box :before{box-sizing:border-box}amp-pixel{display:none!important}amp-analytics,amp-auto-ads,amp-story-auto-ads{position:fixed!important;top:0!important;width:1px!important;height:1px!important;overflow:hidden!important;visibility:hidden}html.i-amphtml-fie>amp-analytics{position:initial!important}[visible-when-invalid]:not(.visible),form [submit-error],form [submit-success],form [submitting]{display:none}amp-accordion{display:block!important}@media (min-width:1px){:where(amp-accordion>section)>:first-child{margin:0;background-color:#efefef;padding-right:20px;border:1px solid #dfdfdf}:where(amp-accordion>section)>:last-child{margin:0}}amp-accordion>section{float:none!important}amp-accordion>section>*{float:none!important;display:block!important;overflow:hidden!important;position:relative!important}amp-accordion,amp-accordion>section{margin:0}amp-accordion:not(.i-amphtml-built)>section>:last-child{display:none!important}amp-accordion:not(.i-amphtml-built)>section[expanded]>:last-child{display:block!important}
            /*# sourceURL=/css/ampshared.css*/`
type GetParametersStyle = {
  children: string
  props: string
}

const Style = ({ children, ...props }: GetParametersStyle): JSX.Element => (
  <style {...props} dangerouslySetInnerHTML={{ __html: children }} />
)

Style.propTypes = {
  children: string.isRequired,
}

const AmpBoilerplateStyle = (): JSX.Element => (
  <Style amp-runtime="" i-amphtml-version="012111060251003">
    {style}
  </Style>
)

type GetParametersScriptAmp = {
  mp3Path: string
  hasPowaVideoDate: string
  hasGallery: boolean
  metaValue: any
  hasEmbedCard: string
  hasIframe: string
  hasYoutube: string
  arcSite: string
  promoItemJwplayer: EmbedConfig
  jwplayerSeo: string
  haveJwplayerMatching: string
  hasInstagram: string
  hasTwitter: string
  hasFacebook: string
  isTrivia: string
  hasSoundcloud: string
  hasJwVideo: string
}

export const ScriptAmp = ({
  mp3Path,
  hasPowaVideoDate,
  hasGallery,
  metaValue,
  hasEmbedCard,
  hasIframe,
  hasYoutube,
  arcSite,
  promoItemJwplayer,
  jwplayerSeo,
  haveJwplayerMatching,
  hasInstagram,
  hasTwitter,
  hasFacebook,
  isTrivia,
  hasSoundcloud,
  hasJwVideo,
}: GetParametersScriptAmp): JSX.Element => (
  <>
    <script
      async
      custom-element="amp-analytics"
      src="https://cdn.ampproject.org/v0/amp-analytics-0.1.mjs"
      type="module"
      crossOrigin="anonymous"
    />
    <script
      async
      noModule
      src="https://cdn.ampproject.org/v0/amp-analytics-0.1.js"
      crossOrigin="anonymous"
      custom-element="amp-analytics"
    />

    {mp3Path && (
      <>
        <script
          async
          custom-element="amp-audio"
          src="https://cdn.ampproject.org/v0/amp-audio-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-audio-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-audio"
        />
      </>
    )}
    {hasGallery && (
      <>
        <script
          async
          custom-element="amp-carousel"
          src="https://cdn.ampproject.org/v0/amp-carousel-0.2.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-carousel-0.2.js"
          crossOrigin="anonymous"
          custom-element="amp-carousel"
        />
      </>
    )}
    {hasPowaVideoDate && (
      <>
        <script
          async
          custom-element="amp-ima-video"
          src="https://cdn.ampproject.org/v0/amp-ima-video-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-ima-video-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-ima-video"
        />
      </>
    )}
    <script
      async
      custom-element="amp-social-share"
      src="https://cdn.ampproject.org/v0/amp-social-share-0.1.mjs"
      type="module"
      crossOrigin="anonymous"
    />
    <script
      async
      noModule
      src="https://cdn.ampproject.org/v0/amp-social-share-0.1.js"
      crossOrigin="anonymous"
      custom-element="amp-social-share"
    />
    {metaValue('exclude_ads_amp') !== 'true' && (
      <>
        <script
          async
          custom-element="amp-sticky-ad"
          src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-sticky-ad-1.0.js"
          crossOrigin="anonymous"
          custom-element="amp-sticky-ad"
        />

        <script
          async
          custom-element="amp-ad"
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-ad-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-ad"
        />
      </>
    )}

    {hasIframe && (
      <>
        <script
          async
          custom-element="amp-iframe"
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-iframe-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-iframe"
        />
      </>
    )}

    {hasEmbedCard && (
      <>
        <script
          async
          custom-element="amp-embedly-card"
          src="https://cdn.ampproject.org/v0/amp-embedly-card-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-embedly-card-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-embedly-card"
        />
      </>
    )}
    {hasYoutube && (
      <>
        <script
          async
          custom-element="amp-youtube"
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-youtube-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-youtube"
        />
      </>
    )}

    {arcSite !== SITE_ELCOMERCIO &&
      arcSite !== SITE_DEPOR &&
      arcSite !== SITE_ELCOMERCIOMAG && (
        <>
          <script
            async
            custom-element="amp-sidebar"
            src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.mjs"
            type="module"
            crossOrigin="anonymous"
          />
          <script
            async
            noModule
            src="https://cdn.ampproject.org/v0/amp-sidebar-0.1.js"
            crossOrigin="anonymous"
            custom-element="amp-sidebar"
          />
        </>
      )}

    {(arcSite === SITE_DEPOR || arcSite === SITE_ELBOCON) && hasJwVideo && (
      <>
        <script
          async
          custom-element="amp-jwplayer"
          src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-jwplayer"
        />
      </>
    )}
    {(promoItemJwplayer.key || jwplayerSeo[0] || hasPowaVideoDate) && (
      <>
        <script
          async
          custom-element="amp-video-docking"
          src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-video-docking-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-video-docking"
        />
      </>
    )}
    {(promoItemJwplayer.key || jwplayerSeo[0] || haveJwplayerMatching) && (
      <>
        <script
          async
          custom-element="amp-jwplayer"
          src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-jwplayer-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-jwplayer"
        />
      </>
    )}

    {hasTwitter && (
      <>
        <script
          async
          custom-element="amp-twitter"
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-twitter-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-twitter"
        />
      </>
    )}
    {hasInstagram && (
      <>
        <script
          async
          custom-element="amp-instagram"
          src="https://cdn.ampproject.org/v0/amp-instagram-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-instagram-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-instagram"
        />
      </>
    )}
    {hasFacebook && (
      <>
        <script
          async
          custom-element="amp-facebook"
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-facebook-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-facebook"
        />
      </>
    )}
    {arcSite === SITE_DEPOR && hasSoundcloud && (
      <>
        <script
          async
          custom-element="amp-soundcloud"
          src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-soundcloud-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-soundcloud"
        />
      </>
    )}
    {arcSite === SITE_TROME && (
      <>
        <script
          async
          custom-element="amp-bind"
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-bind-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-bind"
        />
      </>
    )}
    {arcSite === SITE_ELCOMERCIOMAG && (
      <>
        <script
          async
          custom-element="amp-fit-text"
          src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-fit-text-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-fit-text"
        />
      </>
    )}
    {arcSite === SITE_GESTION && (
      <>
        <script
          async
          custom-element="amp-next-page"
          src="https://cdn.ampproject.org/v0/amp-next-page-0.1.mjs"
          type="module"
          crossOrigin="anonymous"
        />
        <script
          async
          noModule
          src="https://cdn.ampproject.org/v0/amp-next-page-0.1.js"
          crossOrigin="anonymous"
          custom-element="amp-next-page"
        />
      </>
    )}

    {isTrivia && (
      <>
        <link
          rel="preload"
          as="script"
          href="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
        <script
          async
          custom-element="amp-story"
          src="https://cdn.ampproject.org/v0/amp-story-1.0.js"
        />
        <script
          async
          custom-element="amp-story-interactive"
          src="https://cdn.ampproject.org/v0/amp-story-interactive-0.1.js"
        />
        <script
          async
          custom-element="amp-story-auto-ads"
          src="https://cdn.ampproject.org/v0/amp-story-auto-ads-0.1.js"
        />
      </>
    )}
  </>
)

type GetParametersBaseAmp = {
  canonicalUrl: string
}

export const BaseMarkup = ({
  canonicalUrl,
}: GetParametersBaseAmp): JSX.Element => (
  <>
    <meta charSet="utf-8" />
    <meta
      name="viewport"
      content="width=device-width,minimum-scale=1,initial-scale=1"
    />
    <script
      async
      src="https://cdn.ampproject.org/v0.mjs"
      type="module"
      crossOrigin="anonymous"
    />
    <script
      async
      noModule
      src="https://cdn.ampproject.org/v0.js"
      crossOrigin="anonymous"
    />

    <link rel="canonical" href={canonicalUrl} />
    <AmpBoilerplateStyle />
  </>
)
export const Html = (props: AnyObject): JSX.Element => (
  // eslint-disable-next-line jsx-a11y/html-has-lang
  <html
    amp=""
    i-amphtml-layout=""
    i-amphtml-no-boilerplate=""
    transformed="self;v=1"
    {...props}
  />
)

BaseMarkup.propTypes = {
  canonicalUrl: string.isRequired,
}
