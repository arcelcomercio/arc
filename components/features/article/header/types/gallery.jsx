import React, { Component, Fragment } from "react";
import horizontalCss from './galery.css';
import Slider from './slider'

const Gallery = (props) => {
	//console.log(props.data);debugger;

	const { content_elements: elements } = props.data;
	return (
		<Fragment>
			<Slider classNames={horizontalCss}>
				{elements.map((item, index) => (
					<div className='item'>

						<div
							className='slide image'
							key={index}
							style={{ background: `url('${item.url}') no-repeat center center` }}
						>
						</div>
						<div className="slider-details-container">
							<span className="num-photos image-ord">{index + 1} / 5</span>
							<h2 className="foto-title openSansBold3"></h2>
							<p id="m203-2-204" className="foto-description openSansRegular4">A continuación, te mostramos en qué países (Perú, Brasil, Colombia y Chile) se miente más en las hojas de vida. (Foto: Shutterstock)</p>
						</div>

					</div>
				))}
			</Slider>

		</Fragment >
	);
}

export default Gallery;
