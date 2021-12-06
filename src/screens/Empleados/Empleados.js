import React, { useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import { Search } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { getEmployees } from '../../connections/getEmployees';
import { postEmployees } from '../../connections/postEmployees';

import './Empleados.css';

const headersMUI = [
	{ field: 'id', headerName: 'id', width: 20, align: 'center' },
	{ field: 'name', headerName: 'Nombre', width: 200, align: 'left' },
	{ field: 'last_name', headerName: 'Apellidos', width: 200, align: 'left' },
	{ field: 'birthday', headerName: 'Cumpleaños', width: 150 },
];

const validationYup = yup.object({
	name: yup.string().required('Este campo es obligatorio').max(30),
	last_name: yup.string().required('Este campo es obligatorio').max(30),
	birthday: yup.string()
		.matches(/^\d{4}\/\d{2}\/\d{2}$/, 'La fecha debe ser YYYY/MM/DD')
		.required('Este campo es obligatorio'),
})

const Empleados = (props) => {
	const [reload, setReload] = useState(false);
	const [employees, setEmployees] = useState([]);
	const [shownData, setShownData] = useState([]);
	//searching
	const [searchText, setSearchText] = useState('');
	const timedSearch = useRef();
	//toSendData
	const formik = useFormik({
		initialValues: {
			name: '',
			last_name: '',
			birthday: ''
		},
		validationSchema: validationYup,
		onSubmit: (values) => {
			//send & refresh page
			postEmployees(values);
			setReload(prev => !prev);
		}
	})


	//loading employees
	useEffect(() => {
		(async () => {
			let ans = await getEmployees();
			if (ans.status < 300) {
				setEmployees(ans.data.employees);
				setShownData(ans.data.employees);
			}
		})();
	}, [reload]);


	//searching
	useEffect(() => {
		//timeout clearing to prevent spamming timeouts
		if (timedSearch.current)
			clearTimeout(timedSearch.current)

		timedSearch.current = setTimeout(() => {
			//lowercasing
			let toSearch = searchText.toLowerCase()

			let filtered = employees.filter(item =>
				item.name.toLowerCase().includes(toSearch)
				|| item.last_name.toLowerCase().includes(toSearch)
			)

			setShownData(filtered);
		}, 150);
	}, [searchText, employees]);


	return (
		<div className='pageContainer'>
			{/* Busqueda */}
			<TextField
				label='Buscar'
				value={searchText}
				onChange={(event) => setSearchText(event.target.value)}
				InputProps={{
					startAdornment: <InputAdornment position='start'>
						<Search />
					</InputAdornment>
				}}
			/>

			{/* Tabla */}
			<div className={'tableContainer'}>
				<DataGrid
					rows={shownData}
					columns={headersMUI}
					pageSize={10}
					rowHeight={30}
					headerHeight={40}
					rowsPerPageOptions={[10]}
				/>
			</div>

			{/* Formulario */}
			<form onSubmit={formik.handleSubmit}>
				<TextField
					id='name'
					name='name'
					label='Nombre(s)'
					value={formik.values.name}
					onChange={formik.handleChange}
					error={formik.touched.name && Boolean(formik.errors.name)}
					helperText={formik.touched.name && formik.errors.name}
					inputProps={{ maxLength: 30 }}
				/>
				<TextField
					id='last_name'
					name='last_name'
					label='Apellido(s)'
					value={formik.values.last_name}
					onChange={formik.handleChange}
					error={formik.touched.last_name && Boolean(formik.errors.last_name)}
					helperText={formik.touched.last_name && formik.errors.last_name}
					inputProps={{ maxLength: 30 }}
				/>
				<TextField
					id='birthday'
					name='birthday'
					label='Cumpleaños ( YYYY/MM/DD )'
					value={formik.values.birthday}
					onChange={formik.handleChange}
					error={formik.touched.birthday && Boolean(formik.errors.birthday)}
					helperText={formik.touched.birthday && formik.errors.birthday}
					inputProps={{ maxLength: 15 }}
				/>
				<Button type='submit' variant='contained'>
					Enviar datos
				</Button>
			</form>

		</div>
	);
}

export default Empleados;