import { useAppContext } from 'fusion:context'
import * as React from 'react'

const classes = {
  box: 'react-calendar__box flex flex-col',
  header:
    'react-calendar__header flex justify-between items-center pt-10 pb-10 pr-20 pl-20',
  title: 'react-calendar__title uppercase w-full position-relative font-bold',
  brand: 'react-calendar__brand rounded flex justify-center items-center',
  icon: 'icon-marca react-calendar__icon',
  content: 'react-calendar__content-calendar p-10',
}

const AgendaCalendario = (props) => {
  const { isYesterday = false, grayLaterDays = false } = props
  const {
    globalContentConfig: { query },
  } = useAppContext()
  const { date: urlDate } = query || {}

  const getCalendarDate = (date = new Date()) => {
    if (date instanceof Date) return date
    const [year, month, day] = date.split('-')
    const newDate = [year, Number(month - 1), Number(day)]
    return new Date(...newDate)
  }

  // if que reduce 1 dia si el isYesterday esta habilitado
  let retro = 0
  let ant = 0
  if (isYesterday === true) {
    ant = 1
    retro = ant * 24 * 60 * 60 * 1000
  }

  const renderNewURL = (date) => {
    const mydate = new Date(date)
    const year = mydate.getFullYear()
    const month = Number(mydate.getMonth() + 1)
    const day = mydate.getDate()
    const dayFormat = day < 10 ? `0${day}` : day
    const monthFormat = month < 10 ? `0${month}` : month
    const newDateFormat = `${year}-${monthFormat}-${dayFormat}`

    return `/agenda-presidencial/${newDateFormat}/`
  }

  const setNewDate = (data) => {
    window.location.href = renderNewURL(data)
  }

  const Calendar = React.lazy(() =>
    import(
      /* webpackChunkName: "calendar" */
      'react-calendar/dist/entry.nostyle'
    )
  )

  /*
    window.addEventListener('DOMContentLoaded', () => {requestIdle(() => {
    let jp = '${ant}';
    let num=0;
    const d = new Date();
    const day = d.getDate();
    var allbbr = document.getElementsByTagName("abbr");

    for (var i = 0; i < allbbr.length; i+=1) {
    
      if(allbbr[i].innerHTML == day ){
    
  
        for (var j = 0; j < allbbr.length; j+=1){
        if(j > (i-jp)){
          allbbr[j].style.color = "rgb(211 221 231)";
        }  
       
      }
      
      }
    }

    })})
     
    */

  let customJs = ''
  customJs = `"use strict";window.addEventListener("DOMContentLoaded",function(){requestIdle(function(){for(var e=(new Date).getDate(),t=document.getElementsByTagName("abbr"),n=0;n<t.length;n+=1)if(t[n].innerHTML==e)for(var r=0;r<t.length;r+=1)r>n-"${ant}"&&(t[r].style.color="rgb(211 221 231)")})});`

  return (
    <>
      <div className={classes.box}>
        <div className={classes.content}>
          {typeof window !== 'undefined' && (
            <React.Suspense fallback="Cargando...">
              <Calendar
                activeStartDate={getCalendarDate(urlDate)}
                maxDate={new Date(Date.now() - retro)}
                // new Date(day(isLastDayClick))
                minDate={new Date(2021, 6, 28)}
                onChange={(newDate) => setNewDate(newDate)}
                //  value={getCalendarDate2(urlDate, isYesterday)}
                value={new Date(Date.now() - retro)}
                locale="es-419"
                // navigationLabel={({ date, locale }) =>
                //   `${mes(date.toLocaleDateString(locale))}`
                // }
                prev2Label=""
                next2Label=""
                formatShortWeekday={(locale, value) =>
                  ['DO', 'LU', 'MA', 'MI', 'JU', 'VI', 'SA'][value.getDay()]
                }
              />
            </React.Suspense>
          )}
        </div>
        {grayLaterDays && (
          <script
            type="text/javascript"
            dangerouslySetInnerHTML={{
              __html: customJs,
            }}
          />
        )}
      </div>
    </>
  )
}

export default AgendaCalendario
