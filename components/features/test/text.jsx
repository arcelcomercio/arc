import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { customWidth } from '../../../resources/utilsJs/customFields';

class TextTest extends Component {
    render() {
        const column = this.props.customFields.layout;
        return (
            <p className={ column }>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Impedit magnam eaque itaque reprehenderit, commodi est pariatur ducimus repudiandae reiciendis vero consequuntur ea expedita cumque nobis sapiente autem, qui architecto in!</p>
        );
    }
}

TextTest.propTypes = {
    id: PropTypes.string.isRequired,
    customFields: PropTypes.shape({
        layout: customWidth
    })
}

export default TextTest;