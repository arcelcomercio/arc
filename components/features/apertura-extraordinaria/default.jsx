import React, { Component } from 'react'
import Consumer from 'fusion:consumer'
import {customFields} from './_children/customfields'
import {filterSchema} from './_children/filterschema'
import AperturaExtraordinariaChildren from './_children/apertura-extraordinaria'

@Consumer
class AperturaExtraordinaria extends Component 
{
    constructor (props) {
        super(props)
        this.state = { data: {} }
        this.renderCount = 0
        this.fetch()
    }

    fetch() {
        if(this.props.customFields.link){
            const { fetched } = this.getContent(
                'get-story-by-websiteurl', 
                { website_url: this.props.customFields.link, website: this.props.arcSite }, 
                filterSchema
            )
            fetched.then(response => {
                this.setState({ data: response })
            })
        }
    }
    
    render(){
        console.log('apertura extraordinaria render', ++this.renderCount)
        //console.dir(this.state)
        const params = {
            customFields: this.props.customFields,
            data: this.state.data,
            editableField: this.props.editableField,
            website: this.props.arcSite
        }
        return <AperturaExtraordinariaChildren {...params} />
    }
}

AperturaExtraordinaria.propTypes = {
    customFields: customFields
}

export default AperturaExtraordinaria
