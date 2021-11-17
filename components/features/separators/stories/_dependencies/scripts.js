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

    const ARC_SITE = 'elcomercio'

    document.querySelectorAll('.sep-st__btn').forEach((btn, i) => {
      const container = document.querySelectorAll('.sep-st__item-c')[i]

      btn.addEventListener('click', () => {
        btn.classList.add('loading')
        btn.setAttribute('disabled', true)
        const fetchQuery = {
          section: btn.id,
          stories_qty: btn.getAttribute('data-stories_qty'),
          presets: 'mobile:231x132',
          includedFields: '<separatorStories>',
          feedOffset:
            btn.getAttribute('data-stories_qty') *
            btn.getAttribute('data-page'),
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
              ).src = getPromoItemRezisedUrl(story)?.mobile
              container.appendChild(newItem)
            })
            btn.setAttribute(
              'data-page',
              parseInt(btn.getAttribute('data-page')) + 1
            )
            btn.classList.remove('loading')
            btn.removeAttribute('disabled')
          })
      })
    })
  })
}) */

export const seeMoreButtonScript =
  '"use strict";window.addEventListener("DOMContentLoaded",()=>{requestIdle(()=>{const e=document.querySelector(".sep-st__item");document.querySelectorAll(".sep-st__btn").forEach((i,t)=>{const o=document.querySelectorAll(".sep-st__item-c")[t];i.addEventListener("click",()=>{i.classList.add("loading"),i.setAttribute("disabled",!0);const t={section:i.id,stories_qty:i.getAttribute("data-stories_qty"),presets:"mobile:231x132",includedFields:"<separatorStories>",feedOffset:i.getAttribute("data-stories_qty")*i.getAttribute("data-page")};fetch(`/pf/api/v3/content/fetch/story-feed-by-section?query=${encodeURI(JSON.stringify(t))}&_website=elcomercio`).then(e=>e.json()).then(t=>{var l;null==t||null===(l=t.content_elements)||void 0===l||l.forEach(i=>{var t,l,d,s;const n=e.cloneNode(!0);n.href=null==i?void 0:null===(t=i.websites)||void 0===t?void 0:null===(l=t.elcomercio)||void 0===l?void 0:l.website_url,n.querySelector(".sep-st__i-title").textContent=null==i?void 0:null===(d=i.headlines)||void 0===d?void 0:d.basic,n.querySelector(".sep-st__i-img").src=null===(s=(e=>{var i,t,o,l,d,s,n,r,u,v,a,c;return(null==e?void 0:null===(i=e.promo_items)||void 0===i?void 0:null===(t=i.basic_video)||void 0===t?void 0:null===(o=t.promo_items.basic)||void 0===o?void 0:o.resized_urls)||(null==e?void 0:null===(l=e.promo_items)||void 0===l?void 0:null===(d=l.basic_jwplayer)||void 0===d?void 0:null===(s=d.embed)||void 0===s?void 0:null===(n=s.config)||void 0===n?void 0:n.resized_urls)||(null==e?void 0:null===(r=e.promo_items)||void 0===r?void 0:null===(u=r.basic_gallery)||void 0===u?void 0:null===(v=u.promo_items.basic)||void 0===v?void 0:v.resized_urls)||(null==e?void 0:null===(a=e.promo_items)||void 0===a?void 0:null===(c=a.basic)||void 0===c?void 0:c.resized_urls)})(i))||void 0===s?void 0:s.mobile,o.appendChild(n)}),i.setAttribute("data-page",parseInt(i.getAttribute("data-page"))+1),i.classList.remove("loading"),i.removeAttribute("disabled")})})})})});'
