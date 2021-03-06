declare module 'fusion:environment' {
  export interface Env {
    ENVIRONMENT: string
    CONTENT_BASE: string
    CONTEXT_PATH: string
    ARC_ACCESS_TOKEN: string
    resizerUrl: string
    resizerSecret: string
    BLOG_TOKEN: string
    BLOG_URL_API: string
    NEWSLETTER_API: string
    NEWSLETTER_COVID19_API: string
    MIDDLEWARE_TOKEN: string
    FB_SUBSCRIPTION_NODE_ID: string
    FB_APP_SECRET: string
    GS_EMAIL_CLIENT: string
    GS_PRIVATE_KEY: string
  }

  const Environment: Env

  export const ENVIRONMENT: string
  export const CONTENT_BASE: string
  export const CONTEXT_PATH: string
  export const ARC_ACCESS_TOKEN: string
  export const resizerUrl: string
  export const resizerSecret: string
  export const BLOG_TOKEN: string
  export const BLOG_URL_API: string
  export const NEWSLETTER_API: string
  export const NEWSLETTER_COVID19_API: string
  export const MIDDLEWARE_TOKEN: string
  export const FB_SUBSCRIPTION_NODE_ID: string
  export const FB_APP_SECRET: string
  export const GS_EMAIL_CLIENT: string
  export const GS_PRIVATE_KEY: string
  export default Environment
}
