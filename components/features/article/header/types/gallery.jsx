import React, { Component, Fragment } from "react";
import Slider from './slider'
import { FormatClassName } from '../../../../../resources/utilsJs/utilities';
import Image from "@arc-core-components/element_image";

const classes = FormatClassName({
	itemSlideImg: [
		'slider__slide',
		'slider__slide--image'
	],
	itemImageComponent: [
		'visual__image',
		'visual__image--cover'
	],
	itemDetail: [
		'slider__slide__details'
	],
	itemDetailPagImage: [
		'slider__slide__details__image-ord',
		'num-photos'
	],
	itemDetailDescription: [
		'slider__slide__details__foto-description ',
		'openSansRegular4'
	]
});

const Gallery = (props) => {
	//console.log(props.data);debugger;
	const { content_elements: elements } = props.data;
	return (
		<Fragment>
			<Slider>
				{elements.map((item, index) => (
					<div className='item'>
						<div
							className={ classes.itemSlideImg }
							key={index}						>
							<Image url={item.url} alt="" className={ classes.itemImageComponent } />
						</div>
						<div className={ classes.itemDetail }>
							<span className={ classes.itemDetailPagImage }>{index + 1} / 5</span>
							<p id="m203-2-204" className={ classes.itemDetailDescription }>A continuación, te mostramos en qué países (Perú, Brasil, Colombia y Chile) se miente más en las hojas de vida. (Foto: Shutterstock)</p>
						</div>

					</div>
				))}
			</Slider>

		</Fragment >
	);
}

export default Gallery;
