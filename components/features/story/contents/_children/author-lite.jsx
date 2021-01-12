import * as React from 'react'

import { formatDateTime } from '../../../../utilities/date-time/dates'
import {
  SITE_DEPOR,
  SITE_TROME,
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
  displayDate,
  publishDate: updateDate,
  arcSite,
}) => {
  const storyDatetime = () => {
    const formattedDisplayDate = formatDateTime(displayDate)
    const formattedUpdateDate = formatDateTime(updateDate)

    if (arcSite === SITE_TROME) {
      return `Actualizado el ${formattedUpdateDate}`
    }
    return `${arcSite === SITE_DEPOR ? '' : 'Lima,'} ${formattedDisplayDate} ${
      formattedDisplayDate !== formattedUpdateDate
        ? `| Actualizado ${formattedUpdateDate}`
        : ''
    }`
  }
  /*
  requestIdle(() => {
    const URLS_STORAGE = '_pais_mexico'
    const dateModifi = data => {
     const date =  document.getElementsByTagName('time')[0].innerHTML
      const newDate = date ? new Date(date) : new Date()
        newDate.setHours(newDate.getHours() - 1)
      const dateTime = new Intl.DateTimeFormat('pt-PE', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'America/Lima',
        hour12: true,
      })
      document.getElementById("time").innerHTML =dateTime.format(newDate)
    }
    const saveUrlSessionStorage = () => {
      let existArrUrls = false
      if (typeof Storage !== 'undefined') {
        existArrUrls = JSON.parse(window.sessionStorage.getItem(URLS_STORAGE))
        if (existArrUrls === null) {
          fetch(`https://geoapi.eclabs.io/location?callback=getgeoip`)
            .then(response => response.text())
            .then(data => {
              const pais = data.replace('getgeoip(', '').replace(');', ';')
              window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(pais))
              return pais
            })
          return existArrUrls
        }
      }
      return existArrUrls
    }
    const data = saveUrlSessionStorage()
    dateModifi(data)
  })
*/
  return (
    <>
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
          <time id="time" dateTime={displayDate}>
            {storyDatetime()}
          </time>
        </div>
      </div>
      <script
        type="text/javascript"
        dangerouslySetInnerHTML={{
          __html: `"use strict";

          requestIdle(function () {
            var URLS_STORAGE = "_pais_mexicoas11";
          
            var dateModifi = function dateModifi(data) {
              console.log('ddddd', data);
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
              document.getElementById("time").innerHTML = dateTime.format(newDate);
            };
          
            var saveUrlSessionStorage = function saveUrlSessionStorage() {
              var existArrUrls = false;
          
              if (typeof Storage !== "undefined") {
                existArrUrls = JSON.parse(window.sessionStorage.getItem(URLS_STORAGE));
          
                if (existArrUrls === null) {
                  fetch("https://geoapi.eclabs.io/location?callback=getgeoip")
                    .then(function (response) {
                      return response.text();
                    })
                    .then(function (data) {
                      var pais = data.replace('getgeoip(', "").replace(');', "");
                      window.sessionStorage.setItem(URLS_STORAGE, JSON.stringify(pais));
                      return pais;
                    });
                  return existArrUrls;
                }
              }
          
              return existArrUrls;
            };
          
            var data = saveUrlSessionStorage();
            dateModifi(data);
          });
          
          
                    

              `,
        }}
      />
    </>
  )
}

export default StoryContentChildAuthorLite
