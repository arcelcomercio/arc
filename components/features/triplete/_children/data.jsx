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
        const basicPromoItems = this.state.data1 && this.state.data1.promo_items && this.state.data1.promo_items.basic || null
        const typePromoItems = basicPromoItems && basicPromoItems.type || null
        return typePromoItems && typePromoItems == 'image' ? basicPromoItems.url : ''
    }
    get link1(){
        return (this.state.data1 && this.state.data1.website_url + '?_website=' + this.website|| '#')
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
        const basicPromoItems = this.state.data2 && this.state.data2.promo_items && this.state.data2.promo_items.basic || null
        const typePromoItems = basicPromoItems && basicPromoItems.type || null
        return typePromoItems && typePromoItems == 'image' ? basicPromoItems.url : ''
    }
    get link2(){
        return (this.state.data2 && this.state.data2.website_url + '?_website=' + this.website|| '#')
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
        const basicPromoItems = this.state.data3 && this.state.data3.promo_items && this.state.data3.promo_items.basic || null
        const typePromoItems = basicPromoItems && basicPromoItems.type || null
        return typePromoItems && typePromoItems == 'image' ? basicPromoItems.url : ''
    }
    get link3(){
        return (this.state.data3 && this.state.data3.website_url + '?_website=' + this.website|| '#')
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