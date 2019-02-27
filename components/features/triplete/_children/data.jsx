'use strict'

class Data 
{
    constructor(customFields, state, website){
        this.customFields = customFields
        this.state = state
        this.website = website
    }
    get multimediaOrientation(){
        return this.customFields.multimediaOrientation || 'bottom'
    }
    get showAuthorOrSection(){
        return this.customFields.showAuthorOrSection || 'author'
    }
    getTitle(index){
        const dataIndex = 'data'+index
        const titleIndex = 'title'+index
        return this.customFields[titleIndex] || 
            (this.state[dataIndex] && this.state[dataIndex].headlines 
            && this.state[dataIndex].headlines.basic) || ''
    }
    getLink(index){
        const dataIndex = 'data'+index
        return (this.state[dataIndex] && this.state[dataIndex].website_url + '?_website=' + this.website|| '#')
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
    hasVideo(data){
        const video = data && data.promo_items && data.promo_items.Basic
        return typeof video == 'object' && video !== null
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
    //TODO: Improve loop or use if/else if to get multimedia items
    getTypeMultimedia(index){
        let typeMultimedia = ''
        const data = this.state['data'+index]
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
    getMultimedia(index){
        const data = this.state['data'+index]
        return this.getThumbnail(data, this.getTypeMultimedia(index))
    }
    getIconClass(index){
        const baseTypeThumb = {
            Basic: 'play',
            basic: '',
            gallery: 'gallery'
        }
        const typeThumb = this.getTypeMultimedia(index)
        return typeThumb != '' ? baseTypeThumb[typeThumb]: ''
    }
    getAuthor(index){
        const data = this.state['data'+index]
        return this.getDataAuthor(data).name
    }
    getAuthorLink(index){
        const data = this.state['data'+index]
        return this.getDataAuthor(data).url
    }
    getSection(index){
        const data = this.state['data'+index]
        return this.getDataSection(data).name
    }
    getSectionLink(index){
        const data = this.state['data'+index]
        return this.getDataSection(data).path
    }
    authorOrSection(index){
        return this.showAuthorOrSection === 'author' ? this.getAuthor(index) : this.getSection(index)
    }
    authorOrSectionLink(index){
        return this.showAuthorOrSection === 'author' ? this.getAuthorLink(index) : this.getSectionLink(index)
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
    getDataSection(data){
        const sectionData = data && data.websites && data.websites[this.website] 
            && data.websites[this.website].website_section || {}
        const section = sectionData.name || ''
        const path = sectionData.path || ''
        return {name: section, path: path}
    }
}

export default Data