import React from 'react';
import Carousel from 'react-material-ui-carousel';

import './CoolCarousel.css';

const CoolCarousel = ({ images, ...props }) => {

	return (
		<div className={'carouselSize'}>
			<Carousel
				navButtonsAlwaysVisible={true}
			>
				{images.map((img, idx) =>
					<img
						key={idx}
						src={img}
						className={'carouselSize'}
						alt={`imagen ${idx}`}
					/>
				)}
			</Carousel>
		</div>
	);
}

export default CoolCarousel;