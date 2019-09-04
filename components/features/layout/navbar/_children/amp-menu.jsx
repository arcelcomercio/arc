import React, { PureComponent } from 'react'

const classes = {
  sidebar: 'amp-nav-sidebar w-full',
  item: 'amp-nav-sidebar__item uppercase border-b-1 border-solid border-gray',
  listItem: 'amp-nav-sidebar__list-item h-full title-sm line-h-xs pl-10 pr-10',
  link:
    'amp-nav-sidebar__link block pt-15 pb-15 text-md secondary-font font-bold',
  body: 'amp-nav-sidebar__body pt-15 pb-15 pr-0 pl-15',
  list: 'amp-nav-sidebar__list bg-gray-100',
  footer: 'amp-nav-sidebar__footer p-30 border-t-1 border-solid border-gray',
  social:
    'amp-nav-sidebar__sidebar-social bg-gray-100 flex items-center justify-center pl-20',
  close: 'amp-nav-sidebar__close position-absolute',
}

class NavbarChildMenu extends PureComponent {
  constructor(props) {
    super(props)
    this.inputSearchMovil = React.createRef()
  }

  renderSections = sections => {
    return (
      sections &&
      sections.map(({ children, name = '', _id: id = '' }) => (
        <>
          <li className={classes.item} key={`navbar-menu-${id}`}>
            <a href={id} className={classes.link}>
              {name}
            </a>
          </li>
          {children && this.renderSections(children)}
        </>
      ))
    )
  }

  render() {
    const {
      contextPath,
      deployment,
      siteProperties: { siteUrl },
      sections = [],
      footer = {},
    } = this.props
    const icon = {
      facebook:
        'M17.9 14h-3v8H12v-8h-2v-2.9h2V8.7C12 6.8 13.1 5 16 5c1.2 0 2 .1 2 .1v3h-1.8c-1 0-1.2.5-1.2 1.3v1.8h3l-.1 2.8z',
      twitter:
        'M21.3 10.5v.5c0 4.7-3.5 10.1-9.9 10.1-2 0-3.8-.6-5.3-1.6.3 0 .6.1.8.1 1.6 0 3.1-.6 4.3-1.5-1.5 0-2.8-1-3.3-2.4.2 0 .4.1.7.1l.9-.1c-1.6-.3-2.8-1.8-2.8-3.5.5.3 1 .4 1.6.4-.9-.6-1.6-1.7-1.6-2.9 0-.6.2-1.3.5-1.8 1.7 2.1 4.3 3.6 7.2 3.7-.1-.3-.1-.5-.1-.8 0-2 1.6-3.5 3.5-3.5 1 0 1.9.4 2.5 1.1.8-.1 1.5-.4 2.2-.8-.3.8-.8 1.5-1.5 1.9.7-.1 1.4-.3 2-.5-.4.4-1 1-1.7 1.5z',
    }
    const logoAmp = deployment(
      `${siteUrl}${contextPath}/resources/assets/amp/icon-cross.png`
    )

    return (
      <amp-sidebar
        class={classes.sidebar}
        id="sidebar"
        layout="nodisplay"
        side="left">
        <amp-img
          src={logoAmp}
          width="25"
          height="25"
          tabindex="0"
          on="tap:sidebar.close"
          role="button"
          class={classes.close}
        />

        <ul className={classes.list}>
          {sections && this.renderSections(sections)}
        </ul>

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
