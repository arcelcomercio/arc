import React from 'react'

/*
  window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    const $anchor = document.getElementById("h-anchor")
    $anchor.addEventListener("click", () => {
      top.postMessage({id: "anchor-top"}, location.origin);
    })
  })})
*/
const anchorScript = `"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){document.getElementById("h-anchor").addEventListener("click",function(){top.postMessage({id:"anchor-top"},location.origin)})})});`

const classes = {
  header: 'h-continuous f f-center pos-rel',
  somos: 'h-continuous--somos',
  image: 'h-continuous__img',
  anchor: 'h-continuous__anchor pos-abs',
}

const HeaderContinuousChild = ({
  siteDomain,
  mainImage,
  title,
  hideAnchor,
  isSomos,
}) => {
  return (
    <header
      className={`${classes.header} ${isSomos ? classes.somos : ''}`}
      id="h-continuous">
      <a itemProp="url" href="/" title={siteDomain}>
        <img
          className={classes.image}
          src={mainImage}
          alt={title}
          title={title}
        />
      </a>
      {hideAnchor ? null : (
        <>
          <button
            type="button"
            aria-label="Ir al inicio de la página"
            id="h-anchor"
            className={classes.anchor}>
            <svg
              aria-disabled="true"
              xmlns="http://www.w3.org/2000/svg"
              width="25"
              viewBox="0 0 451.8 451.8">
              <path d="M345.4 248.3L151.2 442.6c-12.4 12.4-32.4 12.4-44.7 0 -12.4-12.4-12.4-32.4 0-44.7L278.3 225.9 106.4 54c-12.4-12.4-12.4-32.4 0-44.7 12.4-12.4 32.4-12.4 44.8 0l194.3 194.3c6.2 6.2 9.3 14.3 9.3 22.4C354.7 234 351.6 242.1 345.4 248.3z" />
            </svg>
          </button>
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: anchorScript,
            }}
          />
        </>
      )}
    </header>
  )
}

export default React.memo(HeaderContinuousChild)
