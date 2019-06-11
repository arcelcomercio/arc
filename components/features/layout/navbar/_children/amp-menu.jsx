import React, { PureComponent } from 'react'

const classes = {
  sidebar: 'amp-nav-sidebar w-full',
  item: 'amp-nav-sidebar__item uppercase',
  listItem: 'amp-nav-sidebar__list-item h-full position-relative',
  link: 'amp-nav-sidebar__link block',
  body: 'amp-nav-sidebar__body',
  list: 'amp-nav-sidebar__list',
  footer: 'amp-nav-sidebar__footer',
  social: 'amp-nav-sidebar__sidebar-social',
  close: 'amp-nav-sidebar__close position-absolute',
}

class NavbarChildMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  renderSections = sections => {
    const { contextPath } = this.props

    return (
      sections &&
      sections.map(({ children, name = '', _id: id = '' }) => (
        <>
          <li className={classes.item} key={`navbar-menu-${id}`}>
            <a href={`${contextPath}${id}`} className={classes.link}>
              {name}
            </a>
          </li>
          {children && this.renderSections(children)}
        </>
      ))
    )
  }

  render() {
    const { deployment, contextPath, sections = [], footer = {} } = this.props
    const icon = {
      facebook:
        'M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z',
      youtube:
        'M8.8 12c-.1 2.9 2 5.7 4.7 6.6 2.6.9 5.8.2 7.5-2 1.3-1.6 1.6-3.6 1.4-5.6h-6.7v2.4h4c-.3 1.2-1.1 2.2-2.3 2.7-2.3 1-5.1-.3-5.8-2.7-.9-2.3.5-5 2.9-5.7 1.4-.5 2.9.1 4.1.8l1.8-1.8c-1.4-1.2-3.2-1.9-5-1.7-3.6.1-6.8 3.4-6.6 7zm18-3v2h-2v2h2v2h2v-2h2v-2h-2V9h-2z',
      twitter:
        'M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z',
    }

    return (
      <amp-sidebar
        className={classes.sidebar}
        id="sidebar"
        layout="nodisplay"
        side="left">
        <amp-img
          src={deployment(`${contextPath}/resources/assets/amp/icon-cross.png`)}
          width="25"
          height="25"
          on="tap:sidebar.close"
          role="button"
          class={classes.close}
        />

        <div className={classes.body}>
          <ul className={classes.list}>
            {sections && this.renderSections(sections)}
          </ul>
        </div>

        <ul className={classes.social}>
          {footer.socialNetworks.map(el => (
            <li className={classes.listItem} key={el.url}>
              <a className={classes.listLink} href={el.url}>
                <svg width="32" height="32" viewbox="-2 -2 32 32">
                  <path d={icon[el.name]} />
                </svg>
              </a>
            </li>
          ))}
        </ul>
      </amp-sidebar>
    )
  }
}

export default NavbarChildMenu
