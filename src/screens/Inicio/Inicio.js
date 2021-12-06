import React from 'react';
import { Typography } from '@mui/material';
import CoolCarousel from './CoolCarousel';

import './Inicio.css';

const images = [
	'https://thumbs.dreamstime.com/z/businesspeople-working-modern-office-collaborating-businesspeople-working-office-136883685.jpg',
	'https://static5.depositphotos.com/1000423/523/i/950/depositphotos_5235617-stock-photo-young-business-man-in-office.jpg',
	'https://media.istockphoto.com/photos/adult-education-a-male-office-worker-at-his-desk-picture-id157292623',
	'https://d2gg9evh47fn9z.cloudfront.net/800px_COLOURBOX2630405.jpg',
	'https://st3.depositphotos.com/5392356/18398/i/1600/depositphotos_183983550-stock-photo-company-employees-working-in-office.jpg'
];

const Inicio = (props) => {

	return (
		<div className={'inicio-container'}>
			<Typography variant='h2'>Inicio</Typography>
			<Typography variant='h5'>En este sitio muestra de presentan un carousel, una lista de empleados y formulario y una seleccion de grupos.</Typography>
			<CoolCarousel images={images} />
		</div>
	);
}

export default Inicio;