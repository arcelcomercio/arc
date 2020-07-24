import React from 'react'
import { useEditableContent } from 'fusion:content'
import customFields from './_dependencies/custom-fields'

const classes = {
  container: 'editorial-team p-25 mt-25 bg-gray-100 rounded-sm w-full h-full',
  title: 'pb-20 title-xs font-xbold text-black',
  listItem: 'pb-10 secondary-font text-md text-gray-200',
}

const AuthorsEditorialTeam = props => {
  const {
    customFields: { title, editorialTeam },
  } = props
  const { editableField } = useEditableContent()

  return (
    <div className={classes.container}>
      <h2 {...editableField('title')} className={classes.title}>
        {title || 'Equipo editorial Principal'}
      </h2>
      <ul>
        {editorialTeam ? (
          Object.keys(editorialTeam).map(person => (
            <li className={classes.listItem}>
              <p>
                <strong>{person}: </strong>
                {editorialTeam[person]}
              </p>
            </li>
          ))
        ) : (
          <p>{editorialTeam}</p>
        )}
      </ul>
    </div>
  )
}

AuthorsEditorialTeam.propTypes = {
  customFields,
}

AuthorsEditorialTeam.label = 'Equipo editorial'
AuthorsEditorialTeam.static = true

export default AuthorsEditorialTeam
