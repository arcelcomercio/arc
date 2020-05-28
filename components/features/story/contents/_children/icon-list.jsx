import React from 'react'
import { useFusionContext } from 'fusion:context'
import UtilListKey from '../../../../utilities/list-keys'

const classes = {
  news:
    'story-content__icon-list no-mobile non-tablet md:pt-20 md:pb-0 md:pr-20',
  list: 'story-content__list',
  item: 'story-content__item mb-20 position-relative',
  link: 'story-content__link text-gray-200',
  more:
    'story-content__list-more bg-white position-absolute flex hidden top-0 justify-between p-10',
  moreList: 'story-content__list',
  moreItem: 'story-content__item',
  icon: 'title-md',
  moreLink: 'story-content__more-link flex items-center',
  mobileClass: 'flex justify-center',
  iconPrint: 'icon-print story-content__icon title-xl',
  iconZoom: 'icon-zoom story-content__icon title-xl',
  iconLink: 'icon-link story-content__icon title-xl',
  iconTwitter: 'icon-twitter-circle',
  iconFacebook: 'icon-facebook-circle',
  iconLinkedin: 'icon-linkedin-circle',
}

const windowW = 600
const windowH = 400
const PRINT = 'share-print'
const MORE = 'share-more'
const SHARE = 'share-social'
const ZOOM = 'share-zoom'

const popup = `(function(){window.addEventListener('load',
  function(){setTimeout(function() {  var $print = document.querySelector('a[data-social=${PRINT}]');  var $more = document.querySelector('a[data-social=${MORE}]');  var $zoom = document.querySelector('a[data-social=${ZOOM}]');
  var $shareB = document.querySelectorAll('a[data-social=${SHARE}]');  $print.addEventListener('click', function(e){    e.preventDefault();    window.print();  })$more.addEventListener('click', function(e){  e.preventDefault();    var $shareList = document.querySelector('.story-content__list-more');
    if ($shareList.classList.contains('block')) { $shareList.classList.remove('block');      $shareList.classList.add('hidden');  } else {   $shareList.classList.remove('hidden');      $shareList.classList.add('block');    }  })
  var incrIdx = 0;  $zoom.addEventListener('click', function(e){ e.preventDefault();  var $fontEl = document.querySelectorAll('.story-content__font--secondary');    if (incrIdx >= 9) incrIdx = 0;    incrIdx = incrIdx + 1;    $fontEl.forEach(function(el) { var currSize = 20;
      if(incrIdx >= 9) currSize = parseFloat(el.style.fontSize, 5) || 20
      el.style = 'font-size:'+(currSize + incrIdx)+'px'    })  })
  if ($shareB && $shareB.length > 0) { var windowLeft = window.screen.width / 2 - ${windowW} / 2; var windowTop = window.screen.height / 2 - ${windowH} / 2;
    $shareB.forEach($button => { $button.addEventListener('click', function(e) { e.preventDefault(); window.open(          $button.getAttribute('href'),'', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width=${windowW}, height=${windowH}, top='+windowTop+', left='+windowLeft+''
        )})})}}, 100)})})()`
// Funcion extraida de helpers
const socialMediaUrlShareList = (
  siteUrl,
  postPermaLink,
  postTitle,
  siteNameRedSocial = 'Gestionpe'
) => {
  return {
    facebook: `http://www.facebook.com/sharer.php?u=${siteUrl}${postPermaLink}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(
      postTitle
    )}&url=${siteUrl}${postPermaLink}&via=${siteNameRedSocial}`,
    linkedin: `http://www.linkedin.com/shareArticle?url=${siteUrl}${postPermaLink}`,
    // pinterest: `https://pinterest.com/pin/create/button/?url=${siteUrl}${postPermaLink}`,
    // whatsapp: `whatsapp://send?text=${siteUrl}${postPermaLink}`,
    // fbmsg: `fb-messenger://share/?link=${siteUrl}${postPermaLink}`,
  }
}

const StoryContentChildIcon = () => {
  const firstList = 'firstList'
  const currentList = firstList

  const {
    siteProperties: {
      social: {
        twitter: { user: siteNameRedSocial },
      },
      siteUrl,
    },
    globalContent: {
      website_url: postPermaLink,
      headlines: { basic: postTitle } = {},
    },
  } = useFusionContext()

  const urlsShareList = socialMediaUrlShareList(
    siteUrl,
    postPermaLink,
    postTitle,
    siteNameRedSocial
  )

  const shareButtons = {
    [firstList]: [
      {
        id: PRINT,
        name: 'Imprimir noticia',
        icon: classes.iconPrint,
        link: '',
        mobileClass: '',
      },
      {
        id: MORE,
        name: 'Enlaces para compartir',
        icon: classes.iconLink,
        link: '',
        mobileClass: '',
        more: [
          {
            id: SHARE,
            name: 'Compartir en facebook',
            icon: classes.iconFacebook,
            link: urlsShareList.facebook,
            mobileClass: classes.mobileClass,
          },
          {
            id: SHARE,
            name: 'Compartir en twitter',
            icon: classes.iconTwitter,
            link: urlsShareList.twitter,
            mobileClass: classes.mobileClass,
          },
          {
            id: SHARE,
            name: 'Compartir en linkedin',
            icon: classes.iconLinkedin,
            link: urlsShareList.linkedin,
            mobileClass: classes.mobileClass,
          },
        ],
      },
      {
        id: ZOOM,
        name: 'Aumentar tamaño de letra',
        icon: classes.iconZoom,
        link: '',
        mobileClass: '',
      },
    ],
  }

  return (
    <>
      <div className={classes.news}>
        <ul className={classes.list}>
          {shareButtons[currentList].map((item, i) => (
            <li
              key={UtilListKey(i)}
              className={` ${classes.item} ${item.mobileClass}`}>
              <a
                title={item.name}
                className={classes.link}
                href={item.link}
                data-social={item.id}
                role="button">
                <i className={item.icon} aria-hidden="true" />
              </a>
              {item.more && (
                <ul className={classes.more}>
                  {item.more.map((subItem, ii) => (
                    <li
                      key={UtilListKey(ii)}
                      className={` ${classes.moreItem} ${subItem.mobileClass}`}>
                      <a
                        title={subItem.name}
                        data-social={subItem.id}
                        className={classes.moreLink}
                        href={subItem.link}>
                        <i
                          className={`${subItem.icon} ${classes.icon}`}
                          aria-hidden="true"
                        />
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </div>
      <script dangerouslySetInnerHTML={{ __html: popup }}></script>
    </>
  )
}

export default StoryContentChildIcon
