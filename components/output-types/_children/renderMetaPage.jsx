import React from 'react'
import MetaArchive from './meta-archive'
import MetaSearch from './meta-search'
import MetaAuthor from './meta-author'
import MetaHome from './meta-home'

const renderMetaPage = (page, params) => {
	const options = {
    meta_section: <MetaArchive {...params} />,
    meta_home: 		<MetaHome {...params} />,
    meta_search: 	<MetaSearch {...params} />,
    meta_archive: <MetaArchive {...params} />,
		meta_author: 	<MetaAuthor {...params} />,
		default: false
  }
	return options[page] || options.default
}
export default renderMetaPage



// switch (page) {
//   case 'meta_section':
//     return <MetaArchive {...params} />
//   case 'meta_home':
// 		return <MetaHome {...params} />
//   case 'meta_search':
//     return <MetaSearch {...params} />
//   case 'meta_archive':
//     return <MetaArchive {...params} />
//   case 'meta_author':
//     return <MetaAuthor {...params} />
//   default:
//     return false
// }
