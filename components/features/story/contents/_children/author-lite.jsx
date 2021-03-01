import * as React from 'react'

import { formatDateTime } from '../../../../utilities/date-time/dates'
import {
  SITE_DEPOR,
  SITE_TROME,
  SITE_PERU21,
  SITE_ELBOCON,
} from '../../../../utilities/constants/sitenames'

const classes = {
  author: 'story-contents__author  ',
  authorNameLink: 'story-contents__author-link ',
  authorDate: 'story-contents__author-date f ',
  authorEmail: 'story-contents__author-email  ',
}

const StoryContentChildAuthorLite = ({
  author,
  authorLink,
  authorEmail,
  displayDate,
  publishDate: updateDate,
  arcSite,
}) => {
  const storyDatetime = () => {
    const formattedDisplayDate = formatDateTime(displayDate)
    const formattedUpdateDate = formatDateTime(updateDate)
    if (
      arcSite === SITE_TROME ||
      arcSite === SITE_PERU21 ||
      arcSite === SITE_ELBOCON
    ) {
      return `Actualizado el ${formattedUpdateDate}`
    }
    return `${arcSite === SITE_DEPOR ? '' : 'Lima,'} ${formattedDisplayDate} ${
      formattedDisplayDate !== formattedUpdateDate
        ? `| Actualizado ${formattedUpdateDate}`
        : ''
    }`
  }
  /*
 function getgeoip(data) {
  if (data && data.country_code === 'PE'){
  var date = document.getElementsByTagName("time")[0].innerHTML;
  var newDate = date ? new Date(date) : new Date();
  newDate.setHours(newDate.getHours() - 1);
  var dateTime = new Intl.DateTimeFormat("pt-PE", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Lima",
    hour12: true
  });
  document.getElementsByTagName("time")[0].innerHTML = dateTime.format(newDate);
  }
}
window.addEventListener("load", function () {
  requestIdle(function () {
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://geoapi.eclabs.io/location?callback=getgeoip";
        document.getElementsByTagName("head")[0].appendChild(script);
  });
});
  */

  return (
    <>
      {arcSite === SITE_PERU21 || arcSite === SITE_ELBOCON ? (
        <div className={classes.author}>
          <div>
            {author && (
              <a
                itemProp="url"
                href={authorLink}
                className={classes.authorNameLink}>
                {author}
              </a>
            )}
            {authorEmail && (
              <p itemProp="description" className={classes.authorEmail}>
                <a href={`mailto:${authorEmail}`}>{authorEmail}</a>
              </p>
            )}
          </div>

          <div className={classes.authorDate}>
            <time dateTime={displayDate}>{storyDatetime()}</time>
          </div>
        </div>
      ) : (
        <div className={classes.author}>
          {author && (
            <a
              itemProp="url"
              href={authorLink}
              className={classes.authorNameLink}>
              {author}
            </a>
          )}
          <div className={classes.authorDate}>
            <time dateTime={displayDate}>{storyDatetime()}</time>
          </div>
        </div>
      )}
      {arcSite === SITE_DEPOR && (
        <script
          type="text/javascript"
          dangerouslySetInnerHTML={{
            __html: ` 
            function getgeoip(data) {
              if (data && data.country_code === 'MX'){
              var date = document.getElementsByTagName("time")[0].innerHTML; var newDate = date ? new Date(date) : new Date(); newDate.setHours(newDate.getHours() - 1);  var dateTime = new Intl.DateTimeFormat("es-419-u-hc-h12", { year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit",  timeZone: "America/Lima",  hour12: true  });  document.getElementsByTagName("time")[0].innerHTML = dateTime.format(newDate);
              }
            }window.addEventListener("load", function () {
              requestIdle(function () {
                    var script = document.createElement("script");
                    script.type = "text/javascript";
                    script.src = "https://geoapi.eclabs.io/location?callback=getgeoip";
                    document.getElementsByTagName("head")[0].appendChild(script);
              });
            });
              `,
          }}
        />
      )}
    </>
  )
}

export default StoryContentChildAuthorLite
