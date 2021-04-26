import type { ArcSite } from 'fusion:context'

import { AnyObject } from './utils'

export type StoryType = 'story' | 'video' | 'gallery'
export type ContentElementType =
  | 'image'
  | 'video'
  | 'gallery'
  | 'table'
  | 'quote'
  | 'custom_embed'
  | 'oembed_response'
  | 'story'
  | 'raw_html'
  | 'infografia'
  | 'text'
  | 'list'
  | 'header'
  | 'blockquote'
  | 'Articulo Nota Simple'
  | 'youtube_id'
  | 'path_mp3'
  | 'interstitial_link'
  | 'link_list'
  | 'correction'
export type ContentCode = 'premium' | 'metered' | 'free'
export type Subtype =
  | 'special'
  | 'special_basic'
  | 'gallery_slider'
  | 'gallery_vertical'
  | 'image_big'
  | 'story_correction'
  | 'work_type_revision'
  | 'image_link'
  | 'story_custom_block'
  | 'stamp_trust'
  | 'minuto_minuto'
  | 'video_jwplayer'
  | 'video_jwplayer_matching'
  | 'parallax'
export type PromoItemType =
  | 'basic_video'
  | 'basic_jwplayer'
  | 'youtube_id'
  | 'basic_html'
  | 'basic'
  | 'basic_gallery'
interface ContentElementAdditionalProperties {
  comments: any[]
  inline_comments: any[]
  _id: number
}
export interface ContentElement {
  _id: string
  type: ContentElementType
  additional_properties: ContentElementAdditionalProperties
  content: string
}
export interface Headlines {
  basic: string
  mobile: string
  native: string
  print: string
  tablet: string
  web: string
  meta_title: string
}
interface Owner {
  sponsored: boolean
  id: string
}
export interface ContentRestrictions {
  content_code: ContentCode
}
interface Workflow {
  status_code: number
  note: string
}
interface Source {
  system: string
  name: string
  source_type: string
}
export interface LabelElement {
  url: string
  text: string
  display: boolean
}
export interface Label {
  contenido: LabelElement
  facebook_ia: LabelElement
  formato: LabelElement
  genero: LabelElement
  nucleo: LabelElement
  trustproject: LabelElement
}
export interface Tag {
  text: string
  description: string
  slug: string
}
interface SectionAdditionalProperties {
  original: {
    _id: string
    name: string
    parent: {
      default: string
    }
    inactive: boolean
    order: {
      default: number
    }
    _website: ArcSite
    node_type: string
    ancestors: {
      default: string[]
    }
  }
}
export interface Section {
  _id: string
  _website: ArcSite
  type: string
  version: string
  name: string
  path: string
  parent_id: string
  parent: {
    default: string
  }
  additional_properties: SectionAdditionalProperties
  _website_section_id: string
}
export interface Taxonomy {
  tags?: Tag[]
  sections?: Section[]
  seo_keywords?: string[]
  primary_section: Section
}
interface Reference {
  type: 'reference'
  referent: {
    id: string
  }
}
export interface RelatedContent {
  basic: any[]
  redirect: any[]
  clonedFromParent: Reference[]
  clonedChildren: any[]
}
interface Distributor {
  name: string
  category: string
  subcategory: string
}
interface Planning {
  scheduling: {
    will_have_image: boolean
  }
  internal_note: string
  story_length: {
    word_count_actual: number
    character_count_actual: number
    character_encoding: string
    line_count_actual: number
    inch_count_actual: number
  }
}
export interface SocialLink {
  site: string
  url: string
}
export interface AuthorAdditionalProperties {
  original: {
    _id: string
    status: boolean
    byline: string
    firstName: string
    bio_page: string
    lastName: string
    affiliations: string
    email: string
    books: any[]
    podcasts: any[]
    education: any[]
    awards: any[]
    last_updated_date: string
    image: string
    longBio: string
    slug: string
    bio: string
    personal_website: string
    twitter: string
    location: string
    role: string
  }
}
export interface Author {
  _id: string
  type: string
  version: string
  name: string
  org: string
  image: {
    url: string
    version: string
  }
  description: string
  url: string
  slug: string
  social_links: SocialLink[]
  additional_properties: AuthorAdditionalProperties
}
export interface Credits {
  by: Author[]
}

export type Websites = {
  [key in ArcSite]?: {
    website_section: Section
    website_url: string
  }
}
interface AdditionalProperties {
  clipboard: AnyObject
  has_published_copy: boolean
  is_published: boolean
  publish_date: string
}

interface ResizedUrls {
  landscape_s: string
  landscape_xs: string
  portrait_md: string
}

interface Config {
  date: number
  duration: string
  has_ads: number
  size: string
  description: string
  thumbnail_url: string
  title: string
  updated: number
  account: string
  key: string
  status: string
  resized_urls: ResizedUrls
}

interface Embed {
  id: string
  config: Config
  url: string
}

export interface GalleryContentElement {
  caption: string
  taxonomy?: Taxonomy
  type: string
  version: string
  url: string
  licensable: boolean
  credits?: Credits
  subtitle: string
  width: number
  _id: string
  additional_properties: AdditionalProperties
  height: number
  image_type?: string
  copyright?: string
  creditIPTC?: string
  status?: string
  created?: string
  created_date?: string
  last_updated_date?: string
}

interface BasicJwplayer {
  subtype: string
  embed: Embed
  type: string
}

export interface BasicVideo {
  _id: string
  additional_properties: AdditionalProperties
  duration: number
  embed_html: string
  headlines: Headlines
  promo_items: PromoItems
  publish_date: string
  type: string
}

interface BasicGallery {
  content_elements: GalleryContentElement[]
  taxonomy: Taxonomy
  canonical_url: string
  promo_items: PromoItems
  type: string
  version: string
  canonical_website: string
  display_date: string
  credits: Credits
  headlines: Headlines
  first_publish_date: string
  websites: Websites
  _id: string
  additional_properties: AdditionalProperties
  created_date: string
  last_updated_date: string
  publish_date: string
}

interface Basic {
  width: number
  resized_urls: ResizedUrls
  url: string
  type: string
  height: number
}
interface PromoItems {
  basic?: Basic
  basic_jwplayer?: BasicJwplayer
  basic_gallery?: BasicGallery
  basic_video?: BasicVideo
}

export interface Story {
  _id: string
  type: StoryType
  version: string
  content_elements: ContentElement[]
  created_date: string
  last_updated_date: string
  canonical_url: string
  headlines: Headlines
  owner: Owner
  content_restrictions: ContentRestrictions
  address: AnyObject
  workflow: Workflow
  subheadlines: Pick<Headlines, 'basic'>
  description: Pick<Headlines, 'basic'>
  language: string
  source: Source
  label: Label
  taxonomy: Taxonomy
  related_content: RelatedContent
  promo_items: PromoItems
  distributor: Distributor
  canonical_website: ArcSite
  geo: AnyObject
  planning: Planning
  display_date: string
  credits: Credits
  subtype: Subtype
  first_publish_date: string
  websites: Websites
  additional_properties: AdditionalProperties
  publish_date: string
  website: ArcSite
  website_url: string
}

export interface Stories {
  type: string
  version: string
  content_elements: Story[]
  additional_properties: AdditionalProperties
  count: number
  next: number
  siteName: string
  tag_name: string
  page_number: number
  _id: string
}
