import React from 'react'
import { useFusionContext } from 'fusion:context'
import AuthorBiography from './_children/author_biography'

const AuthorDescription = () => {
  const { globalContent, arcSite, deployment, contextPath } = useFusionContext()

  const logoAuthor = `${contextPath}/resources/dist/${arcSite}/images/author.png`

  const { author = {} } = globalContent || {}

  if (typeof author.resized_urls === 'undefined') author.resized_urls = {}
  author.resized_urls.image_xs =
    (author.resized_urls && author.resized_urls.image_xs) ||
    deployment(logoAuthor)

  author.resized_urls.image_lg =
    (author.resized_urls && author.resized_urls.image_lg) ||
    deployment(logoAuthor)

  return <AuthorBiography {...author} arcSite={arcSite} />
}

AuthorDescription.label = 'Autor - Descripción'
AuthorDescription.static = true

export default AuthorDescription
