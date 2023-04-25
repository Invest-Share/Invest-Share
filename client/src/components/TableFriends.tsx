// ********** unused imports are commented out **********

// import React, { useState, useEffect } from 'react';
import React from 'react'; //removed uncalled imports from above
// import { Link } from 'react-router-dom';
// import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
import { styled, Button } from '@mui/material'; // removed uncalled imports from above
// import { Container } from '@mui/system';
// import axios from '../api/axios';
// import SearchIcon from '@mui/icons-material/Search';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import PropTypes from 'prop-types';
// import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
// import DialogContent from '@mui/material/DialogContent';
// import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
// import CustomPieChart from './CustomPieChart';
import FriendPieChart from './FriendPieChart';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import './TableFriends.css';

type TableFriendsProps = {
	friends: any; // **TODO** redefine type for better type checking
}
type Friend = {
	first_name: string;
	last_name: string;
	user_id: any; // **TODO** redefine type for better type checking
}

const TableFriends: React.FunctionComponent<TableFriendsProps> = ({ friends }) => {
	// *********************************
	// ********** unused code **********
	// *********************************
	// const BootstrapDialog = styled(Dialog)(({ theme }) => ({
	// 	'& .MuiDialogContent-root': {
	// 		padding: theme.spacing(2),
	// 	},
	// 	'& .MuiDialogActions-root': {
	// 		padding: theme.spacing(1),
	// 	},
	// }));

	function BootstrapDialogTitle(props: any): JSX.Element { // **TODO** redefine type for better type checking
		const { children, onClose, ...other } = props;

		return (
			<DialogTitle sx={{ m: 0, p: 2 }} {...other}>
				{children}
				{onClose ? (
					<IconButton
						aria-label="close"
						onClick={onClose}
						sx={{
							position: 'absolute',
							right: 8,
							top: 8,
							color: (theme) => theme.palette.grey[500],
						}}>
						<CloseIcon />
					</IconButton>
				) : null}
			</DialogTitle>
		);
	}

	BootstrapDialogTitle.propTypes = {
		children: PropTypes.node,
		onClose: PropTypes.func.isRequired,
	};

	const [open, setOpen] = React.useState(false);

	const handleClickOpen = (): void => {
		setOpen(true);
	};
	const handleClose = (): void => {
		setOpen(false);
	};

	return (
		<>
			<Table size="small" sx={{ width: '55%', mt: '25px' }}>
				<TableHead>
					<TableRow>
						<TableCell>First Name</TableCell>
						<TableCell>Last Name</TableCell>
						<TableCell>Portfolio</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{friends.map((friend: Friend, index: any) => (	// **TODO** redefine 'any' for better type checking
						<TableRow key={index}>
							<TableCell>{friend.first_name}</TableCell>
							<TableCell>{friend.last_name}</TableCell>
							<TableCell>
								<Popup trigger={<Button>View</Button>} position="right center">
									<FriendPieChart friendID={friend.user_id} />
								</Popup>
							</TableCell>
						</TableRow>
					))}
				</TableBody>
			</Table>
		</>
	);
}

export default TableFriends;
