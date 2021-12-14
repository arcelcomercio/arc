/* eslint-disable no-template-curly-in-string */
import { useContent } from 'fusion:content'
import * as React from 'react'
import { NavigationItem } from 'types/navigation'

import schemaFilter from '../_dependencies/schema-filter'
import { NavbarDefaultChildrenMenu } from './components/menu'

/* requestIdle(() => {
		const btn = document.querySelector(".nav-d__menu-b")
		const menu = document.querySelector(".nav-d__menu")
		
		btn.addEventListener("click", () => {
				menu.classList.toggle("active")
				document.body.classList.toggle("oflow-h")
		})
	}) */
const menuScript =
  '"use strict";requestIdle(()=>{const e=document.querySelector(".nav-d__menu-b"),t=document.querySelector(".nav-d__menu");e.addEventListener("click",()=>{t.classList.toggle("active"),document.body.classList.toggle("oflow-h")})});'

/* requestIdle(() => {
	const formNode = document.getElementById("nav-d__form-search")
	const inputNode = document.querySelector(".nav-d__search-i")

	formNode.addEventListener("submit", (event) => {
		if(inputNode.classList.contains("active") && inputNode.value) {
      const newQuery = encodeURIComponent(inputNode.value).replace(/%20/g, '+')
      window.location.href = `/buscar/${newQuery}/todas/descendiente/?query=${newQuery}`
		}
		inputNode.classList.toggle("active")

		event.preventDefault()
	});
}) */
const searchScript =
  '"use strict";requestIdle(()=>{const e=document.getElementById("nav-d__form-search"),t=document.querySelector(".nav-d__search-i");e.addEventListener("submit",e=>{if(t.classList.contains("active")&&t.value){const e=encodeURIComponent(t.value).replace(/%20/g,"+");window.location.href=`/buscar/${e}/todas/descendiente/?query=${e}`}t.classList.toggle("active"),e.preventDefault()})});'

export const NavbarDefaultChildrenWithMenu: React.FC = () => {
  const navbarData: NavigationItem =
    useContent({
      source: 'navigation-by-hierarchy',
      query: { hierarchy: 'navbar-default' },
      filter: schemaFilter,
    }) || []

  return (
    <div className="nav-d__main">
      <nav className="nav-d">
        <div className="nav-d__wrap">
          <div className="nav-d__left-c">
            <button className="nav-d__menu-b" type="button">
              <svg
                width="16"
                height="14"
                viewBox="0 0 16 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <path d="M0 1H16" stroke="#4D4D4D" strokeWidth="2" />
                <path d="M0 7H16" stroke="#4D4D4D" strokeWidth="2" />
                <path d="M0 13H16" stroke="#4D4D4D" strokeWidth="2" />
              </svg>
            </button>
            <div className="nav-d__search-c">
              <form action="" id="nav-d__form-search">
                <input
                  className="nav-d__search-i"
                  type="text"
                  placeholder="¿Qué buscas?"
                />
                <button className="nav-d__search-b" type="submit">
                  <svg
                    width="16"
                    fill="none"
                    viewBox="0 0 16 16"
                    xmlns="http://www.w3.org/2000/svg">
                    <path
                      d="m15.755 14.394-3.6271-3.6271c0.8732-1.1626 1.3446-2.5776 1.343-4.0315 0-3.7138-3.0215-6.7354-6.7353-6.7354-3.7138 0-6.7354 3.0215-6.7354 6.7354 0 3.7138 3.0215 6.7353 6.7354 6.7353 1.454 0.0016 2.869-0.4698 4.0315-1.343l3.6271 3.6271c0.1836 0.1641 0.4231 0.2517 0.6692 0.2448 0.2462-0.0069 0.4804-0.1077 0.6545-0.2819 0.1742-0.1741 0.275-0.4083 0.2819-0.6545 0.0069-0.2461-0.0807-0.4856-0.2448-0.6692zm-13.83-7.6586c0-0.95152 0.28216-1.8817 0.81079-2.6728 0.52864-0.79116 1.28-1.4078 2.1591-1.7719s1.8464-0.4594 2.7796-0.27377c0.93324 0.18563 1.7905 0.64383 2.4633 1.3167 0.6729 0.67283 1.1311 1.5301 1.3167 2.4633 0.1856 0.93323 0.0903 1.9006-0.2738 2.7796s-0.9807 1.6305-1.7719 2.1591c-0.79116 0.5287-1.7213 0.8108-2.6728 0.8108-1.2755-0.0015-2.4983-0.5089-3.4002-1.4108-0.9019-0.90186-1.4093-2.1247-1.4108-3.4001z"
                      fill="#000"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          <ul className="nav-d__list">
            {navbarData?.children?.map((item) => (
              <li
                key={item.node_type === 'link' ? item.url : item._id}
                className="nav-d__item">
                <a href={item.node_type === 'link' ? item.url : `${item._id}/`}>
                  {item.node_type === 'link' ? item.display_name : item.name}
                </a>
              </li>
            ))}
          </ul>
          <a href="/" className="nav-d__sign">
            <svg
              width="22"
              height="22"
              viewBox="0 0 22 22"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M11.1783 20.2C13.5708 20.2 15.8653 19.2496 17.5571 17.5578C19.2488 15.8661 20.1992 13.5715 20.1992 11.179C20.1996 9.99412 19.9666 8.82074 19.5134 7.72592C19.0603 6.6311 18.3958 5.63627 17.5581 4.79828C16.7204 3.96028 15.7258 3.29553 14.6311 2.842C13.5365 2.38846 12.3632 2.15503 11.1783 2.15503C9.99334 2.1549 8.82002 2.3882 7.72529 2.84161C6.63057 3.29503 5.63589 3.95967 4.79809 4.79757C3.96028 5.63547 3.29575 6.63022 2.84245 7.725C2.38916 8.81977 2.15599 9.99312 2.15625 11.178C2.15612 12.3629 2.38939 13.5361 2.84274 14.6308C3.29609 15.7254 3.96064 16.72 4.79844 17.5578C5.63624 18.3956 6.63087 19.0602 7.72552 19.5135C8.82018 19.9669 9.99343 20.2002 11.1783 20.2V20.2Z"
                stroke="#4D4D4D"
                strokeWidth="1.6"
              />
              <path
                d="M13.2956 13.051C13.8472 12.6978 14.3011 12.2115 14.6156 11.637C14.9302 11.0624 15.0952 10.418 15.0956 9.76302C15.096 9.24846 14.995 8.73887 14.7984 8.26336C14.6018 7.78784 14.3134 7.35573 13.9497 6.99169C13.5861 6.62766 13.1542 6.33885 12.6789 6.14176C12.2036 5.94466 11.6941 5.84315 11.1796 5.84302C10.665 5.84302 10.1554 5.94444 9.68005 6.14149C9.20468 6.33854 8.77281 6.62734 8.40912 6.9914C8.04544 7.35546 7.75707 7.78763 7.56051 8.2632C7.36394 8.73877 7.26304 9.24842 7.26357 9.76302C7.26365 10.4153 7.42704 11.0572 7.73883 11.6301C8.05062 12.203 8.50089 12.6888 9.04857 13.043C5.98657 14.136 3.91357 16.729 4.63357 17.256C5.47972 18.178 6.50982 18.9124 7.65735 19.4116C8.80489 19.9109 10.0444 20.164 11.2958 20.1546C12.5472 20.1452 13.7827 19.8734 14.9226 19.3569C16.0625 18.8404 17.0814 18.0907 17.9136 17.156C18.3866 16.736 16.2896 14.133 13.2956 13.051Z"
                stroke="#4D4D4D"
                strokeWidth="1.6"
              />
            </svg>
            <span>Inicia sesión</span>
          </a>
        </div>
      </nav>
      <NavbarDefaultChildrenMenu />
      <script
        dangerouslySetInnerHTML={{ __html: `${menuScript}${searchScript}` }}
      />
    </div>
  )
}
