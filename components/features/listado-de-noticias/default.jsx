import React, { Component } from 'react'

class CardNotice extends Component {
	constructor() {
		super()
		this.data = [
			{
				canonical_url: '/politica/yonhy-lescano-victima-de-acoso-en-el-congreso-acusa-al-legislador-de-ap',
				basic: 'Yonhy Lescano: víctima de acoso en el Congreso acusa al legislador de AP',
				subheadlines: 'La periodista narró los hechos ante el procurador del Congreso este viernes.',
				section_name: 'Política',
				section_path: '/politica',
				display_date: '2019-03-05T21:52:26.747Z',
				author_name: 'Patricia del Rio',
				author_url: '/people/patricia-del-rio/',
				promo_items: {
					basic: {
						url: 'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/DODFOGLKK5AFZMDJZ5AL35BHSE.jpeg',
					}
				}
			},
			{
				canonical_url: 'politica/economia/fiscalia-suprema-de-control-interno-abre-investigacion-preliminar-a-rafael-velazzzz-dfdsf',
				basic: 'Fiscalía Suprema de Control Interno abre investigación preliminar a Rafael Velazzzz dfdsf',
				subheadlines: 'La diligencia se realizará en las oficinas de la Dirección Nacional de Registro de Organizaciones Políticas.',
				section_name: 'Economía',
				section_path: '/economia',
				display_date: '2019-02-08T16:31:03.899Z"',
				author_name: 'Patricia del Rio',
				author_url: '/people/patricia-del-rio/',
				promo_items: {
					promo_video: {
						basic: {
							url: 'https://arc-anglerfish-arc2-sandbox-sandbox-elcomercio.s3.amazonaws.com/public/TK2GQW7PDNGX5KNC5XA42NYACE.jpeg',
						}
					}
				}
			},
			{
				canonical_url: '/2019/01/29/asistencia-de-luis-advincula-title/',
				basic: 'Asistencia de Luis advincula - title',
				subheadlines: 'Asistencia de Luis advincula - tease.',
				section_name: 'Política',
				section_path: '/politica',
				display_date: '2019-01-29T16:32:16Z',
				author_name: 'Patricia del Rio',
				author_url: '/people/patricia-del-rio/',
				promo_items: {
					promo_gallery: {
						basic: {
							url: 'https://dvgnzpfv30f28.cloudfront.net/01-29-2019/t_cbbdbe0fe89e495580aeea50cf9bd6ca_name_5c4a2acf4512c_r_1548367706707_0_92_3000_1815.jpeg',
						}
					}
				}
			}
		]
	}

	getImage(obj) {
		let url;
		let type;
		if (obj.hasOwnProperty('promo_gallery')) {
			type = 'gallery'
			url = obj.promo_gallery.basic.url
		}
		if (obj.hasOwnProperty('promo_video')) {
			type = 'video'
			url = obj.promo_video.basic.url
		}
		if (obj.basic) {
			type = 'image'
			url = obj.basic.url
		}
		return {
			type,
			url
		}
	}

	getIcon(type) {
		switch (type) {
			case 'gallery':
				return 'G'
				break;
			case 'video':
				return 'V'
			default:
				return ''
				break;
		}
	}

	reduceSubtitle(subtitle) {
		return subtitle.length > 145 ? subtitle.slice(0, 145).concat('...') : subtitle
	}

	formatDate(date) {
		const actual = new Date()
		const day = actual.getDate()
		const month = (actual.getMonth() + 1)
		const year = actual.getFullYear()

		const formatDay = day < 10 ? `0${day}` : day
		const formatMonth = month < 10 ? `0${month}` : month
		const fechaGenerada = `${year}-${formatMonth}-${formatDay}`

		const fechaEntrante = date.slice(0, 10)
		const fecha = (fechaEntrante === fechaGenerada) ? date.slice(date.indexOf('T') + 1, 16) : fechaEntrante
		return fecha
	}

	render() {
		return (
			<div>
				{this.data.map((el, index) => {
					return <div key={index} className="card-notice">
						<div className="card-notice__top">
							<a href={el.section_path} className="card-notice__section">{el.section_name}</a>
							<p className="card-notice__date">{this.formatDate(el.display_date)}</p>
						</div>
						<div className="card-notice__bottom">
							<div className="card-notice__left">
								<div>
									<h2><a className="card-notice__title" href={el.canonical_url}>{el.basic}</a></h2>
									<p className="card-notice__subtitle">{this.reduceSubtitle(el.subheadlines)}</p>
								</div>
								<div>
									<a href={el.author_url} className="card-notice__author">{el.author_name}</a>
								</div>
							</div>
							<div className="card-notice__right">
								<a href={el.canonical_url}>
									{
										this.getImage(el.promo_items).type === 'image'
											? '' : <span className="card-notice__icon">{this.getIcon(this.getImage(el.promo_items).type)}</span>
									}
									<img alt="" className="card-notice__figure" src={this.getImage(el.promo_items).url} />
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