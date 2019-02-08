import React, { Component } from 'react'

const styles = [
    'flex',
    'flex__column'
]

class ContentLayout extends Component {
    render() {

        return(
            <div className={styles.join(' ')}>
                {this.props.children}
            </div>
        )
    }
}

export default ContentLayout;