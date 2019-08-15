import React from 'react'
import PropTypes from 'prop-types'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import Markdown from 'react-markdown'

import ClientOnly from '../_children/client-only'
import * as S from './styled'
import faqsData from './data'

const Faqs = () => {
  const [data, setData] = React.useState([])

  const loadFakeQuestions = React.useCallback(
    () => Promise.resolve(faqsData).then(setData),
    []
  )

  React.useLayoutEffect(() => {
    loadFakeQuestions()
  }, [loadFakeQuestions])

  return (
    <ClientOnly>
      <S.Container>
        <S.TitleContainer>
          <S.Title>Preguntas Frecuentes</S.Title>
        </S.TitleContainer>
        <FaqList faqs={data} />
      </S.Container>
    </ClientOnly>
  )
}
Faqs.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
}

const FaqList = ({ faqs = [], ...props }) => {
  const [expanded, setExpanded] = React.useState()

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return faqs.map((faqGroup, idx1) => (
    <S.ExpansionPanel
      id={`panel${idx1}`}
      expanded={expanded === `panel${idx1}`}
      onChange={handleChange(`panel${idx1}`)}
      {...props}>
      <S.ExpansionPanelSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
        <S.Title>
          <Markdown>{faqGroup.group}</Markdown>
        </S.Title>
      </S.ExpansionPanelSummary>
      <S.ExpansionPanelDetails>
        {faqGroup.faqs.map((faq, idx2) => {
          const question = Array.isArray(faq.q) ? faq.q.join(' \n') : faq.q
          const answer = Array.isArray(faq.a) ? faq.a.join(' \n') : faq.a
          return (
            <div id={`${faqGroup.group}---${idx2}`}>
              <S.FaqMarkdown question>{question}</S.FaqMarkdown>
              <S.FaqMarkdown>{answer}</S.FaqMarkdown>
              {faqGroup.faqs.length > idx2 + 1 && <S.Separator />}
            </div>
          )
        })}
      </S.ExpansionPanelDetails>
    </S.ExpansionPanel>
  ))
}
FaqList.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    group: PropTypes.string.isRequired,
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        q: PropTypes.string.isRequired,
        a: PropTypes.string.isRequired,
      })
    ),
  })
)

export default Faqs
