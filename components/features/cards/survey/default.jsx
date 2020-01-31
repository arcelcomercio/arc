import React from 'react'
import { useContent } from 'fusion:content'
import { useFusionContext } from 'fusion:context'

import { setSurveyCookie, getCookie } from '../../../utilities/helpers'
import CardSurveyChildSurvey from './_children/survey'

const BASE_PATH = '/encuesta'

const CardSurvey = () => {
  const { contextPath } = useFusionContext()
  const currentSurveyId = 674
  const hasVote = getCookie(`idpoll${currentSurveyId}`) === '1'

  const quizData = useContent({
    source: 'quiz-by-id',
    query: {
      id: currentSurveyId,
    },
  })

  const sendQuiz = optionSelected => {
    const body = {
      id: currentSurveyId,
      option: optionSelected,
      website: 'peru21',
    }
    const URL = 'https://jab.pe/f/arc/services/encuesta.php'
    fetch(URL, {
      method: 'POST',
      mode: 'cors',
      body: JSON.stringify(body),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .catch(error => error)
      .then(response => {
        if (response.status === 200) {
          const { slug = '' } = quizData || {}
          setSurveyCookie(body.id, 1)
          window.location.href = `${BASE_PATH}/${slug}`
        }
      })
  }

  const { title = '', slug = '', choices = [] } = quizData || {}
  const params = {
    BASE_PATH,
    contextPath,
    title,
    slug,
    choices,
    hasVote,
    sendQuiz,
  }

  return <CardSurveyChildSurvey {...params} />
}

CardSurvey.label = 'Encuesta'

export default CardSurvey
