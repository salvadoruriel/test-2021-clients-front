import React from 'react';
import NavItem from './NavItem';

import './NavigationItems.css';

export const ROUTES = {
	INICIO: '/inicio',
	EMPLEADOS: '/empleados',
	GRUPOS: '/grupo'
}

const NavigationItems = (props) => {

	return (
		<ul className='NavigationItems'>
			<NavItem to={ROUTES.INICIO}>Inicio</NavItem>
			<NavItem to={ROUTES.EMPLEADOS}>Empleados</NavItem>
			<NavItem to={ROUTES.GRUPOS}>Grupo</NavItem>
		</ul>
	);
}

export default NavigationItems;