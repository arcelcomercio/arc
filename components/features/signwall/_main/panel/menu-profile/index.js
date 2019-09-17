import React from 'react'
import { WrapperMenu } from './styles'
import { Avatar } from './avatar'

// eslint-disable-next-line import/prefer-default-export
export const MenuProfile = props => {
  return (
    // eslint-disable-next-line react/jsx-filename-extension
    <>
      <Avatar />
      <WrapperMenu>
        <h1 className="hello">Hola Jorge</h1>
        <p className="welcome">Bienvenido a tu Perfil</p>
        <div className="cont-menu">
          <ul>
            <li>
              <a href="#" onClick={() => props.home()}>
                Inicio
              </a>
            </li>
            <li>
              <a href="#">Mis Datos</a>
            </li>
            <li>
              <a href="#" onClick={() => props.subs()}>
                Mi Suscripción
              </a>
            </li>
            <li>
              <a href="#" onClick={() => props.news()}>
                Newsletters
              </a>
            </li>
            <li>
              <a href="#">Contáctanos</a>
            </li>
            <li>
              <a className="close-sesion" href="#">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      </WrapperMenu>
    </>
  )
}
