import React, { Component } from 'react'

class ContentLayout extends Component {
    render() {
        //console.log('--------> Content')
        //console.log(this.props.elements, this.props.elements.length)
        return(
            <main alt="content" className='content over-content'>
                {this.props.elements}
                <div className="q col-12 row-1"> Breaking new</div>
                <div className="q col-4 row-2"></div>
                <div className="q col-8 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
                <div className="q col-4 row-2"></div>
            </main>
        )
    }
}

export default ContentLayout;