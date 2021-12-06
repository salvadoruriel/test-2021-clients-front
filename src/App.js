import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

//screens
import Empleados from './screens/Empleados/Empleados';
import Grupos from './screens/Grupos/Grupos';
import Inicio from './screens/Inicio/Inicio';
//components
import MainHeader from './navigation/MainHeader';
import { ROUTES } from './navigation/NavigationItems';

const App = (props) => {

	let routes = (
		<Routes>
			<Route path={ROUTES.INICIO} element={<Inicio />} />
			<Route path={ROUTES.EMPLEADOS} element={<Empleados />} />
			<Route path={ROUTES.GRUPOS} element={<Grupos />} />

			<Route path='*' element={<Navigate to={ROUTES.INICIO} />} />
		</Routes>
	);

	return (
		<>
			<Router>
				<MainHeader />
				<main>
					{routes}
				</main>
			</Router>
		</>
	);
}

export default App;
