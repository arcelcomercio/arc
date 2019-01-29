import React, { Component, Fragment } from 'react'

let uriStr, uriTitle

class CustomMeta extends Component {

    fetchDynamicMetaData = () => uriStr = 'Llamado al servicio'

    isAHomepage = uri => {
        uriStr = 'Es una Homepage'
    }

    /* -- Functions to handle the static and sections uri's --*/

    separateUri = uri => {
        uriStr = uri.match(/\w.*/),         // Deletes the first '/' in the namePath
        uriStr = uriStr[0].split('?')[0]    // Avoid any query
        uriStr = uriStr.replace(/\/$/,'')   // Deletes the last '/' in the namePath
        uriStr = uriStr.split('/')          // Splits the uri
    }

    resolvePageTitle = uri => {
        if (uri[1]) {
            uriTitle = 
                `${uri[0].charAt(0).toUpperCase()}${uri[0].slice(1)} y ${uri[1].charAt(0).toUpperCase()}${uri[1].slice(1)}`
        } else {
            uriTitle = `${uri[0].charAt(0).toUpperCase()}${uri[0].slice(1)}`
        }
    }

    /* --------------------------------------------------------*/

    isStaticOrSection = uri => {
        
        this.separateUri(uri)
        this.resolvePageTitle(uriStr)

        // Hacer un ciclo FOR para esto
        // También hay que hacer algo para cuando una cadena tiene texto separado por -

    }

    // If it's not a Story, is it a Homepage or StaticPage?
    identifyPageType = uri =>
        uri.split('?')[0].length === 1
            ? this.isAHomepage(uri)
            : this.isStaticOrSection(uri)

    // Check if the namePath has any date, in that case is a Story
    isAStory = uri =>
        uri.match(/[0-9]{4}\/[0-9]{2}\/[0-9]{2}\//) && true
    
    render(){
        
        const { properties, uri } = this.props

        // First check. Is it a Story?
        !this.isAStory(uri)
            ? this.identifyPageType(uri)
            : this.fetchDynamicMetaData()

        return(
         <Fragment>
            {
                uriTitle &&
                    <meta name='title' content={uriTitle} />
            }
            {
                uriStr &&
                    <meta name='keywords' content={uriStr} />
            }
                
         </Fragment>
        )
    }
}

export default CustomMeta