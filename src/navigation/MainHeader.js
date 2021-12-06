import React from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import logo from '../shared/assets/logo.svg';

import './MainHeader.css';
import NavigationItems from './NavigationItems';

const MainHeader = (props) => {

	return (
		<AppBar position='static'>
			<Toolbar className='main-header'>

				<div className="main-header__brandContainer">
					<div className="main-header__logoContainer">
						<img className="App-logo" src={logo} alt='React' />
					</div>

					<Typography
						variant="h3"
						noWrap
						component="div"
						sx={{
							flexGrow: 1,
							display: { xs: 'none', sm: 'block' },
							zIndex: 7 //needed for logo positioning
						}}
					>
						Clients
					</Typography>
				</div>

				<NavigationItems />

			</Toolbar>
		</AppBar>
	);
}

export default MainHeader;