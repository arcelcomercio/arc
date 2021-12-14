export interface NavigationItem {
  _website: string
  _id: string
  name: string
  node_type: string
  children: Children[]
}

interface Children {
  _id: string
  _website: string
  display_name?: string
  url?: string
  parent: Parent
  order: Order
  node_type: 'link' | 'section'
  children: any[]
  name?: string
  inactive?: boolean
  ancestors?: Ancestors
  _admin?: Admin
  site?: Site
  social?: Social
  site_topper?: SiteTopper
  navigation?: Navigation
}

interface Parent {
  'menu-default': string
  'navbar-default'?: string
  default?: string
  'sitemap-default'?: string
  'header-default': any
  'search-filter-default'?: string
  Provecho: any
}

interface Order {
  'menu-default': number
  'navbar-default'?: number
  default?: number
  'sitemap-default'?: number
  'search-filter-default'?: number
}

interface Ancestors {
  default?: any[]
  'menu-default': string[]
  'sitemap-default'?: string[]
  'navbar-default'?: string[]
  'header-default'?: any[]
  'search-filter-default'?: string[]
}

interface Admin {
  alias_ids: string[]
}

interface Site {
  site_url: any
  site_keywords: any
  site_tagline: any
  site_title: any
  site_description: any
  site_about: any
  pagebuilder_path_for_native_apps: any
}

interface Social {
  instagram: any
  facebook: any
  rss: any
  twitter: any
}

interface SiteTopper {
  site_logo_image: any
}

interface Navigation {
  nav_title: any
}
