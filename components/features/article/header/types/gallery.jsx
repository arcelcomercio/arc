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
					<div
						key={index}
						style={{ background: `url('${item.url}') no-repeat center center` }}
					>
						<div className="center">
							<h1>{item.title}</h1>
							<p>{item.description}</p>
						</div>
					</div>
				))}
			</Slider>

		</Fragment >
	);
}

export default Gallery;
