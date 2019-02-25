import React, { Component } from 'react';
import Consumer from 'fusion:consumer';

@Consumer
class MoreReads extends Component {
    constructor(props) {
        super(props);
        this.fetch();
    }
    
    fetch() {
        /* const { path, imageSize, size } = this.props.customFields */
        const { arcSite, requestUri } = this.props;

        const source = 'get-story-more-reads'
        const params = {
            website: arcSite,
            section: requestUri.split('/')[1],
            num_notes: 5
        }
        /* const schema = `{ 
            headlines { basic }
            credits { by { name } }
        }` */

        const { fetched } = this.getContent(source, params)
        fetched.then(response => {
            console.log(response)
            console.log(this.props)
        })
    }

    render () {
        return(
            <h1>Prueba</h1>
        ); 
    }
}

export default MoreReads;