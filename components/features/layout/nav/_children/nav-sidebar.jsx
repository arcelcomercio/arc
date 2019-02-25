import React from 'react'
import Button from '../../../../../resources/components/button'

const classes = {
  navSidebar: `
  	nav-sidebar`,
  navSidebarContent: `
  	nav-sidebar__content
    flex
    flex--column
    flex--justify-between`,
  navBarBtn: `
  	flex-center btn bg-color--white nav-sidebar__btn`,
}

const NavSidebar = props => {
	const { sections, showSidebar } = props
  return (
		<div className={`${classes.navSidebar} ${showSidebar ? 'active' : ''}`}>
      <div className={classes.navSidebarContent}>
        <div className="nav-sidebar__top">
          <div className="nav-sidebar__header">
            <div className="nav-sidebar__box-btn">
              <Button
                btnClass={classes.navBarBtn}
                btnLink="#"
                btnText="Suscríbete"
              />
            </div>
          </div>
          <div className="nav-sidebar__body">
            <ul className="nav-sidebar__list">
              {sections
                ? sections.map((item, key) => {
                    return (
                      <li key={key} className="nav-sidebar__item">
                        <a href={item._id} className="nav-sidebar__link">
                          {item.name}
                        </a>
                      </li>
                    )
                  })
                : null}
            </ul>
          </div>
        </div>
        <div className="nav-sidebar__footer">
          <a href="/" className="nav-sidebar__text">
            washingtonpost.com
          </a>
          <a href="/" className="nav-sidebar__text">
            1996-2019 The Washington Post
          </a>
          <a href="/" className="nav-sidebar__text">
            Policies and Standards
          </a>
          <a href="/" className="nav-sidebar__text">
            Terms of Service
          </a>
          <a href="/" className="nav-sidebar__text">
            Privacy Policy
          </a>
          <a href="/" className="nav-sidebar__text">
            Submissions and Discussion Policy
          </a>
          <a href="/" className="nav-sidebar__text">
            RSS Terms of Service
          </a>
          <a href="/" className="nav-sidebar__text">
            Ad Choices
          </a>
        </div>
      </div>
    </div>
  )
}

export default NavSidebar
