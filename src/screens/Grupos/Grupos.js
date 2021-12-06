import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/system';
import { Button, Checkbox, Divider, FormControlLabel, IconButton, InputAdornment, TextField, Typography } from '@mui/material';
import { ArrowForward, Delete, Search } from '@mui/icons-material';

import './Grupos.css';
import { getGroups } from '../../connections/getGroups';
import { getEmployeesByGroup } from '../../connections/getEmployees';


const Grupos = (props) => {
	const [groups, setGroups] = useState([]);;
	const [shownData, setShownData] = useState([]);
	//selected
	const [selectedGroup, setSelectedGroup] = useState({});
	const [groupEmployees, setGroupEmployees] = useState([]);
	//for handling checks, an alternative could have been adding to each employee item
	const [selectedEmployees, setSelectedEmployees] = useState([]);
	//searching
	const [searchText, setSearchText] = useState('');
	const timedSearch = useRef();

	//loading groups
	useEffect(() => {
		(async () => {
			let ans = await getGroups();
			if (ans.status < 300) {
				setGroups(ans.data.groups);
				setShownData(ans.data.groups);
			}
		})();
	}, []);

	const emptySelection = () => {
		setSelectedGroup({})
		setGroupEmployees([]);
		setSelectedEmployees([]);
	}

	//loading employees
	useEffect(() => {
		(async () => {
			if (!selectedGroup?.id) {
				setGroupEmployees([]);
				return;
			}

			let ans = await getEmployeesByGroup(selectedGroup.id);
			if (ans.status < 300) {
				setGroupEmployees(ans.data.employees);
				setSelectedEmployees([...Array(ans.data.employees.length).fill(true)]);
			} else {
				emptySelection();
			}
		})();
	}, [selectedGroup]);


	//searching
	useEffect(() => {
		//timeout clearing to prevent spamming timeouts
		if (timedSearch.current)
			clearTimeout(timedSearch.current)

		timedSearch.current = setTimeout(() => {
			//lowercasing
			let toSearch = searchText.toLowerCase()

			let filtered = groups.filter(item =>
				item.name.toLowerCase().includes(toSearch)
			)

			setShownData(filtered);
		}, 150);
	}, [searchText, groups]);



	return (
		<div className={'groupsContainer'}>
			{/* left */}
			<Box className={'leftDiv'}>
				<Typography
					variant='body1'
					className={'groupsTitle'}
					sx={{ backgroundColor: 'primary.main' }}
					color='primary.contrastText'
				>
					Grupos
				</Typography>
				{/* Busqueda */}
				<TextField
					fullWidth
					label='Buscar'
					value={searchText}
					onChange={(event) => setSearchText(event.target.value)}
					InputProps={{
						startAdornment: <InputAdornment position='start'>
							<Search />
						</InputAdornment>
					}}
					sx={{ marginY: '12px' }}
				/>
				<Divider />

				<Box className={'groupsList'} sx={{ maxHeight: 300, overflow: 'auto' }}>
					{shownData.map((item, idx) => (
						<Button
							key={item + 'g' + idx}
							fullWidth
							variant='contained'
							onClick={() => {
								if (item.id !== selectedGroup.id)
									setSelectedGroup(item)
							}}
							sx={{ height: '50px', justifyContent: 'flex-start', borderRadius: 0 }}
						>
							{item.name}
						</Button>
					))}
				</Box>
			</Box>


			{/* right */}
			<Box className={'rightDiv'}>
				{selectedGroup?.id && [
					/* Header */
					<Box
						key='annRea'
						className={'rightTitle'}
						sx={{ backgroundColor: 'primary.main' }}
						color='primary.contrastText'
					>
						<FormControlLabel
							label={selectedGroup.name}
							control={
								<Checkbox
									checked={selectedEmployees.some((item) => item) ?? false}
									color='default'
									onChange={(event) => {
										setSelectedEmployees([...Array(groupEmployees.length).fill(event.target.checked)])
									}}
								/>
							}
						/>

						<IconButton
							color='default'
							onClick={emptySelection}
						>
							<Delete />
						</IconButton>
					</Box>,
					/* employees in group */
					<Box
						key='annEmpl'
						className={'employeesList'}
						sx={{ maxHeight: 250, overflow: 'auto' }}
					>
						{groupEmployees.map((item, idx) => (
							<FormControlLabel
								key={'e' + item + ' ' + idx}
								label={item.name}
								control={
									<Checkbox
										checked={selectedEmployees[idx] ?? false}
										onChange={(event) => {
											let newChecks = [...selectedEmployees];
											newChecks[idx] = event.target.checked;
											setSelectedEmployees([...newChecks])
										}}
									/>
								}
							/>
						))}
					</Box>,
					<Button
						variant="contained"
						endIcon={<ArrowForward />}
						sx={{ alignSelf: 'flex-end' }}
						onClick={() => {
							groupEmployees.forEach((item, idx) => {
								if (selectedEmployees[idx])
									console.log(item)
							})
						}}
					>
						Continuar
					</Button>
				]}
			</Box>
		</div>
	);
}

export default Grupos;