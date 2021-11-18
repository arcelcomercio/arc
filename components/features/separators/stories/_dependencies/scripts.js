/* eslint-disable no-template-curly-in-string */

/* window.addEventListener('DOMContentLoaded', () => {
  requestIdle(() => {
    const getPromoItemRezisedUrl = (story) =>
      story?.promo_items?.basic_video?.promo_items.basic?.resized_urls ||
      story?.promo_items?.basic_jwplayer?.embed?.config?.resized_urls ||
      story?.promo_items?.basic_gallery?.promo_items.basic?.resized_urls ||
      story?.promo_items?.basic?.resized_urls

    const item = document.querySelector('.sep-st__item')

    const contentService = 'story-feed-by-section'

    const ARC_SITE = '<ARC_SITE>'
    const defaultImage = '<DEFAULT_IMAGE>'

    document.querySelectorAll('.sep-st__btn').forEach((btn, i) => {
      const container = document.querySelectorAll('.sep-st__item-c')[i]

      btn.addEventListener('click', () => {
        if (
          btn.getAttribute('data-next') === null ||
          btn.getAttribute('data-next') === 'undefined'
        ) {
          btn.style = 'display:none'
        } else {
          btn.classList.add('loading')
          btn.setAttribute('disabled', true)
          const fetchQuery = {
            section: btn.id,
            stories_qty: btn.getAttribute('data-stories_qty'),
            presets: 'mobile:231x132',
            includedFields: '<separatorStories>',
            feedOffset: btn.getAttribute('data-next'),
          }
          fetch(
            `/pf/api/v3/content/fetch/${contentService}?query=${encodeURI(
              JSON.stringify(fetchQuery)
            )}&_website=${ARC_SITE}`
          )
            .then((res) => res.json())
            .then((stories) => {
              stories?.content_elements?.forEach((story) => {
                const newItem = item.cloneNode(true)

                newItem.href = story?.websites?.[ARC_SITE]?.website_url
                newItem.querySelector('.sep-st__i-title').textContent =
                  story?.headlines?.basic
                newItem.querySelector(
                  '.sep-st__i-img'
                ).src = getPromoItemRezisedUrl(story)?.mobile || defaultImage
                container.appendChild(newItem)
              })
              btn.setAttribute('data-next', stories?.next)
              btn.classList.remove('loading')
              btn.removeAttribute('disabled')
            })
        }
      })
    })
  })
}) */

export const seeMoreButtonScript = (arcsite, defaultImage) =>
  '"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){var e=document.querySelector(".sep-st__item");document.querySelectorAll(".sep-st__btn").forEach(function(i,t){var o=document.querySelectorAll(".sep-st__item-c")[t];i.addEventListener("click",function(){if(null===i.getAttribute("data-next")||"undefined"===i.getAttribute("data-next"))i.style="display:none";else{i.classList.add("loading"),i.setAttribute("disabled",!0);var t={section:i.id,stories_qty:i.getAttribute("data-stories_qty"),presets:"mobile:231x132",includedFields:"<separatorStories>",feedOffset:i.getAttribute("data-next")};fetch("/pf/api/v3/content/fetch/".concat("story-feed-by-section","?query=").concat(encodeURI(JSON.stringify(t)),"&_website=").concat("elcomercio")).then(function(e){return e.json()}).then(function(t){var l;null==t||null===(l=t.content_elements)||void 0===l||l.forEach(function(i){var t,l,n,d,s=e.cloneNode(!0);s.href=null==i?void 0:null===(t=i.websites)||void 0===t?void 0:null===(l=t.elcomercio)||void 0===l?void 0:l.website_url,s.querySelector(".sep-st__i-title").textContent=null==i?void 0:null===(n=i.headlines)||void 0===n?void 0:n.basic,s.querySelector(".sep-st__i-img").src=(null===(d=function(e){var i,t,o,l,n,d,s,r,u,c,v,a;return(null==e?void 0:null===(i=e.promo_items)||void 0===i?void 0:null===(t=i.basic_video)||void 0===t?void 0:null===(o=t.promo_items.basic)||void 0===o?void 0:o.resized_urls)||(null==e?void 0:null===(l=e.promo_items)||void 0===l?void 0:null===(n=l.basic_jwplayer)||void 0===n?void 0:null===(d=n.embed)||void 0===d?void 0:null===(s=d.config)||void 0===s?void 0:s.resized_urls)||(null==e?void 0:null===(r=e.promo_items)||void 0===r?void 0:null===(u=r.basic_gallery)||void 0===u?void 0:null===(c=u.promo_items.basic)||void 0===c?void 0:c.resized_urls)||(null==e?void 0:null===(v=e.promo_items)||void 0===v?void 0:null===(a=v.basic)||void 0===a?void 0:a.resized_urls)}(i))||void 0===d?void 0:d.mobile)||"https://cdna.elcomercio.pe/resources/dist/elcomercio/images/default-sm.png",o.appendChild(s)}),i.setAttribute("data-next",null==t?void 0:t.next),i.classList.remove("loading"),i.removeAttribute("disabled")})}})})})});'
    .replace(/<ARC_SITE>/g, arcsite)
    .replace(/<DEFAULT_IMAGE>/g, defaultImage)
