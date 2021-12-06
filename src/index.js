import React from 'react';
import ReactDOM from 'react-dom';
import { createTheme, CssBaseline, ThemeProvider } from '@mui/material';

import App from './App';

const THEME = createTheme({
	palette: {
		mode: 'light',
		primary: {
			main: '#4e5c6f',
			contrastText: '#fff'
		},
	}
});

ReactDOM.render(
	<React.StrictMode>
		<ThemeProvider theme={THEME}>
			<CssBaseline />
			<App />
		</ThemeProvider>
	</React.StrictMode>,
	document.getElementById('root')
);
