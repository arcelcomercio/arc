declare module 'fusion:properties' {
  export function getProperties(
    arcSite: string
  ): { siteProperties: SiteProperties }

  /** ********************************************** */

  export interface Api {
    blog: string
  }

  export interface Nav {
    logo: string
    logoSomos: string
  }

  export interface Header {
    logo: string
    inverted: string
    auxLogo: string
  }

  export interface Footer {
    logo: string
  }

  export interface Seo {
    logoAmp: string
    width: number
    height: number
    widthAmp: number
    heightAmp: number
  }

  export interface Premium {
    logo: string
  }

  export interface Assets {
    nav: Nav
    header: Header
    footer: Footer
    seo: Seo
    premium: Premium
  }

  export interface Messages {
    errorTitle: string
    errorDescription: string
  }

  export interface Android {
    url: string
  }

  export interface Ios {
    url: string
  }

  export interface Apps {
    android: Android
    ios: Ios
  }

  export interface Ids {
    opta: string
  }

  export interface GecSite {
    name: string
    arcSite: string
    url: string
  }

  export interface Signwall {
    mainColorBg: string
    mainColorTxt: string
    mainLogo: string
    mainColorBr: string
    mainColorLink: string
    authProviders: any[]
  }

  export interface Taboola {
    dataModeAmp: string
    mode: string
  }

  export interface Stick {
    logo: string
  }

  export interface Gec {
    playerAds: string
    player: string
  }

  export interface Jwplayers {
    gec: Gec
  }

  export interface JwplayersMatching {
    playerId: string
    videoId: string
  }

  export interface SiteProperties {
    linkTabloide: string
    newsletterBrand: string
    api: Api
    assets: Assets
    messages: Messages
    apps: Apps
    ids: Ids
    gecSites: GecSite[]
    activeSignwall: boolean
    activePaywall: boolean
    activeRulesCounter: boolean
    activeNewsletter: boolean
    activeVerifyEmail: boolean
    signwall: Signwall
    gda: boolean
    googleTagManagerMobile: string
    taboola: Taboola
    stick: Stick
    isDfp: boolean
    archiveLimit: string
    jwplayers: Jwplayers
    jwplayersMatching: JwplayersMatching
  }
}
