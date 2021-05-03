import { useFusionContext } from 'fusion:context'
import React from 'react'

import SectionTitle from '../../../global-components/independent-title'
import { addSlashToEnd } from '../../../utilities/parse/strings'
import customFields from './_dependencies/custom-fields'

const HeaderSectionTitle = ({
  customFields: {
    section = '',
    sectionUrl = '',
    bgColor = '',
    fontColor = '',
    TextType = 'h1',
  } = {},
}) => {
  const { globalContent } = useFusionContext()
  const {
    taxonomy: {
      primary_section: {
        name: primarySection = '',
        path: primarySectionLink = '/',
      } = {},
    } = {},
  } = globalContent || {}

  const title = section || primarySection
  const link = sectionUrl || primarySectionLink

  const params = {
    title,
    link: addSlashToEnd(link),
    bgColor,
    fontColor,
    TextType,
  }

  return <SectionTitle {...params} />
}

HeaderSectionTitle.propTypes = {
  customFields,
}

HeaderSectionTitle.label = 'Cabecera - Título independiente'
HeaderSectionTitle.static = true

export default HeaderSectionTitle
