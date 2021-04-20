declare module 'fusion:properties' {
  import type { ArcSite } from 'fusion:context'

  export default function getProperties(arcSite: ArcSite): SiteProperties

  interface Urls {
    eventsRegexp: string
    corporateSuscription: string
    faqs: string
    digitalSubscriptions: string
    digitalSubscriptionsHome: string
    arcEntitlements: string
    canonical: string
    image: string
    reviewVideo: string
    clickToCall: string
    pwaDomain: string
    originApi: string
    originIdentitySdk: string
    originSalesSdk: string
    originPayuSdk: string
    originPayuTags: string
    originPaymentTraker: string
    originSubscriptionCorpApi: string
    originSubscriptionOnlineToken: string
    originSubscriptions: string
    originSubscriptionsBundles: string
    originSubsPrinted: string
    originSubsDigitalPrinted: string
    privacyPolicy: string
    disclaimer: string
    terms: string
    originSubsOnline: string
    contactEmailRef: string
    contactPhoneRef: string
    androidAppDownload: string
    iosAppDownload: string
    facebook: string
    twitter: string
    instagram: string
    codeCxense: string
    profileSignwall: string
  }

  interface Images {
    pixel: string
    icon: string
    apple_icon: string
    apple_icon_76: string
    apple_icon_120: string
    apple_icon_144: string
    apple_icon_152: string
    apple_icon_180: string
    lector: string
    corporativo: string
    confirmation: string
    support: string
    backgroundx1: string
    backgroundReview: string
    reviewPoster: string
    mainLogo: string
  }
  export interface Paywall {
    title: string
    description: string
    descriptionPayment: string
    urls: Urls
    images: Images
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
    siteName: string
    sitemapNewsName: string
    siteTitle: string
    newsletterBrand: string
    colorPrimary: string
    siteDomain: string
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
    newsletterBrand: string
    activeSignwall: boolean
    activePaywall: boolean
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
