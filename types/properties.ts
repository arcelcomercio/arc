import { Domain } from './utils'

interface Urls {
  canonical: string
  image: string
}

export interface Paywall {
  title: string
  description: string
  urls: Urls
}

interface Facebook {
  user: string
  url: string
}

interface Twitter {
  user: string
}

export interface Social {
  facebook: Facebook
  twitter: Twitter
}
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
  mainColorTitle: string
  mainColorBtn: string
  authProviders: any[]
  primaryFont: string
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
  siteName: string
  sitemapNewsName: string
  siteTitle: string
  newsletterBrand: string
  colorPrimary: string
  siteDomain: Domain
  siteUrl: string
  resizerUrl: string
  resizerSecretKeyEnvVar: string
  urlPreroll: string
  urlPrerollAmp: string
  fbAppId: string
  googleTagManagerId: string
  googleTagManagerIdSandbox: string
  ampGoogleTagManagerId: string
  ampGoogleTagManagerName: string
  charbeatAccountNumber: number
  idGoogleAnalitics: string
  fbPixelId: string
  fbArticleStyle: string
  nameStoryRelated: string
  siteDescription: string
  googleNewsUrl: string
  googleNewsImage: string
  paywall: Paywall
  social: Social
  linkTabloide: string
  activeMagicLink: boolean
  activeSignwall: boolean
  activePaywall: boolean
  activeRegisterwall: boolean
  activeRulesCounter: boolean
  activeNewsletter: boolean
  activeVerifyEmail: boolean
  gda: boolean
  isDfp: boolean
  api: Api
  assets: Assets
  messages: Messages
  apps: Apps
  ids: Ids
  gecSites: GecSite[]
  signwall: Signwall
  googleTagManagerMobile: string
  taboola: Taboola
  stick: Stick
  archiveLimit: string
  jwplayers: Jwplayers
  jwplayersMatching: JwplayersMatching
}
