'use strict'
import {filterSchema} from './filterschema'

const LINK = 'link'
const KEY_STATE = 'data'
const LINK_LENGTH = 3

class Api
{
    constructor(props, getContent){
        this.props = props
        this.dataState = {}
        this.getContent = getContent
        this.exec()
    }

    /*async exec(){
        for(let i=1; i<=LINK_LENGTH; i++){
            if(this.props.customFields[LINK+i]){
                this.dataState[KEY_STATE+i] = await this.getContent(
                    'get-story-by-websiteurl', 
                    { website_url: this.props.customFields[LINK+i], website: this.props.arcSite }, 
                    filterSchema
                )
            }
        }
    }*/

    exec(){
        for(let i=1; i<=LINK_LENGTH; i++){
            if(this.props.customFields[LINK+i]){
                const { fetched } = this.getContent(
                    'get-story-by-websiteurl', 
                    { website_url: this.props.customFields[LINK+i], website: this.props.arcSite }, 
                    filterSchema
                )
                fetched.then(response => {
                    this.dataState[KEY_STATE+i] = response
                })
            }
        }
    }

    get state() {
        return this.dataState
    }

}

export default Api