import React, {Component} from 'react'
import Consumer from 'fusion:consumer'
import {customFields} from './_children/customfields'
//import Api from './_children/api'
import {filterSchema} from './_children/filterschema'
import TripleteChildren from './_children/triplete';

@Consumer
class Triplete extends Component
{
    constructor(props){
        super(props)
        this.state = { data1: {}, data2: {}, data3: {} }
        //this.api = new Api(this.props, this.getContent)
        //console.log('this.api.state', this.api.state)
        this.renderCount = 0
        this.exec()
    }

    render(){
        console.log('render triplete manual', ++this.renderCount)
        console.dir(this.state)
        const params = {
            customFields: this.props.customFields,
            state: this.state,
            editableField: this.props.editableField,
            website: this.props.arcSite
        }
        return <TripleteChildren {...params} />
    }

    exec(){
        const LINK = 'link'
        const KEY_STATE = 'data'
        const LINK_LENGTH = 3

        for(let i=1; i<=LINK_LENGTH; i++){
            if(this.props.customFields[LINK+i]){
                const { fetched } = this.getContent(
                    'get-story-by-websiteurl', 
                    { website_url: this.props.customFields[LINK+i], website: this.props.arcSite }, 
                    filterSchema
                )
                let obj = {}
                fetched.then(response => {
                    obj[KEY_STATE+i] = response
                    //@todo improve set state for render just only times
                    this.setState(obj)
                })
            }
        }
    }
}

Triplete.propTypes = {
    customFields: customFields
}
export default Triplete