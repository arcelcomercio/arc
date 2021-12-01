import { useContext } from 'react'
import { AppContext } from '../../context/app-context'

export const PowerUpsList: React.FC = () => {
  const { handleSubPageChange, contentPowerUpsList } = useContext(AppContext)

  return (
    <div className="p-5">
      <h5 className="mb-4">Bloques para el contenido de la nota</h5>
      <ul className="list-group">
        {contentPowerUpsList.map((item) => (
          <li
            className="list-group-item list-group-item-action"
            key={item.id}
            onClick={() => {
              handleSubPageChange(item.id)
            }}>
            {item.name}
          </li>
        ))}
      </ul>
    </div>
  )
}
