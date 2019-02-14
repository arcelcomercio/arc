import React, {Component} from 'react'
import Consumer from 'fusion:consumer'
import {customFields} from './_children/customfields'
import Api from './_children/api'
import Tm from './_children/tm'

@Consumer
class Triplete extends Component
{
    constructor(props){
        super(props)
        this.state = { data1: {}, data2: {}, data3: {} }
        this.api = new Api(this.props, this.getContent)
        this.renderCount = 0
    }

    render(){
        console.log('render', ++this.renderCount)
        return <Tm/>
    }

    componentDidMount() {
        console.log('componentDidMount', this.api.state)
        this.setState(this.api.state)
    }
}

Triplete.propTypes = {
    customFields: customFields
}
export default Triplete