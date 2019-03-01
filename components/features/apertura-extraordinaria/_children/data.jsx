'use strict'

class Data 
{
    constructor(customFields, data, website){
        this.customFields = customFields
        this.data = data
        this.website = website
    }
    get title() {
        return this.customFields.title || (this.data && this.data.headlines && this.data.headlines.basic) || ''
    }
    get subTitle() {
        return this.customFields.subTitle || (this.data && this.data.headlines && this.data.subheadlines.basic) || ''
    }
    get multimediaOrientation(){
        return this.customFields.multimediaOrientation || 'bottom'
    }
    get contentOrientation(){
        return this.customFields.contentOrientation || 'left'
    }
    get author(){
        return this.getDataAuthor(this.data).name
    }
    get authorLink(){
        return this.getDataAuthor(this.data).url
    }
    get multimedia(){
        return this.getThumbnail(this.data, this.getTypeMultimedia(this.data))
    }
    get section(){
        return this.customFields.section || this.getDataSection(this.data).name
    }
    get link(){
        return (this.data && this.data.website_url + '?_website=' + this.website|| '#')
    }
    get sectionLink(){
        return this.getDataSection(this.data).path + '?_website=' + this.website
    }
    getDataSection(data){
        const sectionData = data && data.websites && data.websites[this.website] 
            && data.websites[this.website].website_section || {}
        const section = sectionData.name || ''
        const path = sectionData.path || ''
        return {name: section, path: path}
    }
    getDataAuthor(data){
        const authorData = data && data.credits && data.credits.by || []
        let name = '', url = ''
        for (let i=0; i<authorData.length; i++) {
            if(authorData[i].type == 'author'){
                name = authorData[i].name
                url = authorData[i].url
                break
            }
        }
        return {name: name, url: url}
    }
    getTypeMultimedia(data){
        let typeMultimedia = ''
        const promoItems = data && data.promo_items && data.promo_items || {}
        const items = Object.keys(promoItems)
        let item = {}
        for(let i=0; i<=items.length; i++){
            item = promoItems[items[i]]
            if(typeof item == 'object' && item !== null){
                typeMultimedia = items[i]
                break
            }
        }
        return typeMultimedia;
    }
    getThumbnailVideo(data){
        const thumb = data && data.promo_items && data.promo_items.Basic 
            && data.promo_items.Basic.promo_image && data.promo_items.Basic.promo_image.url || ''
        return thumb
    }
    getThumbnailGallery(data){
        const thumb = data && data.promo_items && data.promo_items.gallery 
            && data.promo_items.gallery.promo_items && data.promo_items.gallery.promo_items.basic
            && data.promo_items.gallery.promo_items.basic.url || ''
        return thumb
    }
    getImage(data){
        const basicPromoItems = data && data.promo_items && data.promo_items.basic || null
        const typePromoItems = basicPromoItems && basicPromoItems.type || null
        return typePromoItems && typePromoItems == 'image' ? basicPromoItems.url : ''
    }
    getThumbnail(data, type){
        if(type == 'Basic'){
            return this.getThumbnailVideo(data)
        }else if(type == 'gallery'){
            return this.getThumbnailGallery(data)
        }else if(type == 'basic'){
            return this.getImage(data)
        }else{
            return ''
        }
    }
}

export default Data