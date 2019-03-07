import React, {Component} from 'react'
import DataStory from './utils/data-story'
import DataStoryArchivo from './../../components/features/global/archivo/_children/data-story'
import {reduceWord, formatDate} from './../utilsJs/helpers'


class CardNotice extends Component {
	constructor(props) {
		super(props)

	}

	getIcon(type) {
		switch (type) {
			case 'basic_gallery':
				return 'G'
				break;
			case 'basic_video':
				return 'V'
			default:
				return ''
				break;
		}
	}


	render() {
		const { arcSite, data } = this.props
		// const element = new DataStory({}, arcSite)
		const element = new DataStoryArchivo({}, arcSite)
		return (
			<div>
				{data.map((el, index) => {
					element._data = el
					// const element = new DataStory(el, arcSite)
					return <div key={index} className="card-notice">
						<div className="card-notice__top">
							<a href={element.sectionLink} className="card-notice__section">{element.section}</a>
							<p className="card-notice__date">{formatDate(element.displayDate)}</p>
						</div>
						<div className="card-notice__bottom">
							<div className="card-notice__left">
								<div>
									<h2><a className="card-notice__title" href={element.link}>{element.title}</a></h2>
									<p className="card-notice__subtitle">{reduceWord(element.subTitle)}</p>
								</div>
								<div>
									<a href={element.authorLink} className="card-notice__author">{element.author}</a>
								</div>
							</div>
							<div className="card-notice__right">
								<a href={element.link}>
									{
										element.multimediaType === 'basic'
											? '' : <span className="card-notice__icon">{this.getIcon(element.multimediaType)}</span>
									}
									<img alt={element.title} className="card-notice__figure" src={element.multimedia} />
								</a>
							</div>
						</div>
					</div>
				})}
			</div>
		)
	}
}

export default CardNotice