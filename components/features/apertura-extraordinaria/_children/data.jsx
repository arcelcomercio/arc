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
        const authorData =this.data && this.data.credits && this.data.credits.by || []
        return this.getValData(authorData, 'author')
    }
    get image(){
        const basicPromoItems = this.data && this.data.promo_items && this.data.promo_items.basic || null
        const typePromoItems = basicPromoItems && basicPromoItems.type || null
        return typePromoItems && typePromoItems == 'image' ? basicPromoItems.url : ''
    }
    get section(){
        return this.customFields.section || this.getDataSection().name
    }
    get link(){
        return this.getDataSection().path + (this.data && this.data.website_url || '#')
    }
    get sectionLink(){
        return this.getDataSection().path
    }
    getDataSection(data, type){
        const sectionData =this.data && this.data.taxonomy && this.data.taxonomy.sections || []
        let section = '', path = ''
        for (let i=0; i<sectionData.length; i++) {
            if(sectionData[i].type == 'section' && sectionData[i]._website == this.website){
                section = sectionData[i].name
                path = sectionData[i].path
                break
            }
        }
        return {name: section, path: path}
    }
    getValData(data, type){
        let val = ''
        for (let i=0; i<data.length; i++) {
            if(data[i].type == type){
                val = data[i].name
                break
            }
        }
        return val
    }
}

export default Data