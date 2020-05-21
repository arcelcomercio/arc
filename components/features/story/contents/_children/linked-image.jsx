import React from 'react'
import StoryContentsChildImage from './image'

const StoryContentsChildLinkedImage = ({ link, title, alt, photo }) => {
  return (
    photo && (
      <a href={link || '/'} title={title || ''} className="block w-full">
        <StoryContentsChildImage caption={alt || ''} multimediaLarge={photo} />
      </a>
    )
  )
}

export default StoryContentsChildLinkedImage

/**
 * Elemento en ANS
 * 
 * {
  "_id": "2BAEY4ISCZCR5A65UROAVTF5IE",
  "type": "custom_embed",
  "subtype": "image_link",
  "additional_properties": {
    "_id": "ASB6B5J5OFF4JJQ7JMYOLGYQVU",
    "comments": []
  },
  "embed": {
    "id": "OMJD72PFS5HS5KVDK2DHFBDG5I",
    "url": "/pf/api/v3/content/fetch/photo-by-id",
    "config": {
      "link": "https://elcomercio.pe",
      "photo": "https://cloudfront-us-east-1.images.arcpublishing.com/sandbox.elcomercio/OMJD72PFS5HS5KVDK2DHFBDG5I.jpg",
      "title": "'Lolo' Fernández cumpliría 107 años este 20 de mayo del 2020. (Foto: Universitario de Deportes)",
      "alt": "'Lolo' Fernández cumpliría 107 años este 20 de mayo del 2020. (Foto: Universitario de Deportes)"
    }
  }
}
 */
