import React from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import { useFusionContext } from 'fusion:context'
import Markdown from 'react-markdown/with-html'

import ClientOnly from '../_children/client-only'
import { useStrings } from '../_children/contexts'
import * as S from './styled'
import {FaqGES, FaqECO } from './data'

const Faqs = () => {
  const msgs = useStrings()
  const [data, setData] = React.useState([])
  const { arcSite } = useFusionContext()

  const loadFakeQuestions = React.useCallback(
    () => Promise.resolve( arcSite ==='elcomercio' ? FaqECO : FaqGES ).then(setData),
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
        <FaqList site={arcSite} faqs={data} />
      </S.Container>
    </ClientOnly>
  )
}
Faqs.propTypes = {
  url: PropTypes.string.isRequired,
  author: PropTypes.string.isRequired,
  perPage: PropTypes.number.isRequired,
}

const FaqList = withTheme(({ theme, site, faqs = [], ...props }) => {
  const [expanded, setExpanded] = React.useState()
  const { lighten } = theme.palette

  const handleChange = panel => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false)
  }

  return faqs.map((faqGroup, idx1) => (
    <S.ExpansionPanel
      id={`panel${idx1}`}
      collapsedColor={
        site === 'elcomercio'
          ? lighten(theme.palette.secondary.main, 0.9)
          : lighten(theme.palette.primary.main, 0.9)
      }
      expandedColor={theme.palette.background.paper}
      expanded={expanded === `panel${idx1}`}
      onChange={handleChange(`panel${idx1}`)}
      {...props}>
      <S.ExpansionPanelSummary expandIcon={<ExpandMoreIcon fontSize="large" />}>
        <S.Title>
          <Markdown source={faqGroup.group} />
        </S.Title>
      </S.ExpansionPanelSummary>
      <S.ExpansionPanelDetails>
        {faqGroup.faqs.map((faq, idx2) => {
          const question = Array.isArray(faq.q) ? faq.q.join(' \n') : faq.q
          const answer = Array.isArray(faq.a) ? faq.a.join(' \n') : faq.a
          return (
            <div id={`${faqGroup.group}---${idx2}`}>
              <S.FaqMarkdown question source={question} />
              <S.FaqMarkdown source={answer} />
              {faqGroup.faqs.length > idx2 + 1 && <S.Separator />}
            </div>
          )
        })}
      </S.ExpansionPanelDetails>
    </S.ExpansionPanel>
  ))
})
FaqList.propTypes = PropTypes.arrayOf(
  PropTypes.shape({
    group: PropTypes.string.isRequired,
    site: PropTypes.string.isRequired,
    faqs: PropTypes.arrayOf(
      PropTypes.shape({
        q: PropTypes.string.isRequired,
        a: PropTypes.string.isRequired,
      })
    ),
  })
)

export default withTheme(Faqs)
