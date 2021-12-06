import React from 'react';
import { NavLink } from 'react-router-dom';

import './NavItem.css';

//Expects:
//	to		- where to redirect
const NavItem = ({ to, children, ...props }) => (
	<li className={'NavItem'}>
		<NavLink
			to={to}
			className={({ isActive }) => isActive ? 'NavItem active' : ''}
		>
			{children}
		</NavLink>
	</li>
);

export default NavItem;