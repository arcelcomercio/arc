import { useContext } from 'react'
import { AppContext } from '../../context/app-context'

export const Navbar: React.FC = () => {
  const {
    page,
    handleSubPageChange,
    subPage,
    contentPowerUpsList,
  } = useContext(AppContext)

  return (
    <nav className="navbar navbar-dark bg-dark navbar-expand">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">
          Bloques personalizados EC | {page}
        </a>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav">
            <li className="nav-item">
              <a
                className="nav-link active"
                href="#"
                onClick={() => handleSubPageChange('home')}>
                {'> Home'}
              </a>
            </li>
            {subPage !== 'home' && (
              <li className="nav-item">
                <a className="nav-link active" href="#">
                  {'> '}
                  {contentPowerUpsList.find((x) => x.id === subPage)?.name ||
                    ''}
                </a>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  )
}
