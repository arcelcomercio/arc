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
    get title1() {
        return this.customFields.title1 || (this.state.data1 && this.state.data1.headlines && this.state.data1.headlines.basic) || ''
    }
    get author1(){
        return this.getDataAuthor(this.state.data1).name
    }
    get authorLink1(){
        return this.getDataAuthor(this.state.data1).url
    }
    get section1(){
        return this.getDataSection(this.state.data1).name
    }
    get sectionLink1(){
        return this.getDataSection(this.state.data1).path
    }
    get image1(){
        return this.getImage(this.state.data1)
    }
    get link1(){
        return (this.state.data1 && this.state.data1.website_url + '?_website=' + this.website|| '#')
    }
    get multimedia1(){
        return this.getMultimedia(1)
    }
    get title2() {
        return this.customFields.title2 || (this.state.data2 && this.state.data2.headlines && this.state.data2.headlines.basic) || ''
    }
    get author2(){
        return this.getDataAuthor(this.state.data2).name
    }
    get authorLink2(){
        return this.getDataAuthor(this.state.data2).url
    }
    get section2(){
        return this.getDataSection(this.state.data2).name
    }
    get sectionLink2(){
        return this.getDataSection(this.state.data2).path
    }
    get image2(){
        return this.getImage(this.state.data2)
    }
    get link2(){
        return (this.state.data2 && this.state.data2.website_url + '?_website=' + this.website|| '#')
    }
    get multimedia2(){
        return this.getMultimedia(2)
    }
    get title3() {
        return this.customFields.title3 || (this.state.data3 && this.state.data3.headlines && this.state.data3.headlines.basic) || ''
    }
    get author3(){
        return this.getDataAuthor(this.state.data3).name
    }
    get authorLink3(){
        return this.getDataAuthor(this.state.data3).url
    }
    get section3(){
        return this.getDataSection(this.state.data3).name
    }
    get sectionLink3(){
        return this.getDataSection(this.state.data3).path
    }
    get image3(){
        return this.getImage(this.state.data3)
    }
    get link3(){
        return (this.state.data3 && this.state.data3.website_url + '?_website=' + this.website|| '#')
    }
    get multimedia3(){
        return this.getMultimedia(3)
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
    getMultimedia2(index){
        let multimedia = ''
        const data = this.state['data'+index]
        if(this.hasVideo(data))
            multimedia = this.getThumbnailVideo(data)
        else
            multimedia = this['image'+index]
        return multimedia
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
    authorOrSection(index){
        return this.showAuthorOrSection === 'author' ? this['author'+index] : this['section'+index]
    }
    authorOrSectionLink(index){
        return this.showAuthorOrSection === 'author' ? this['authorLink'+index] : this['sectionLink'+index]
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