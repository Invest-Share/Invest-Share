// Used imports
import { useState, useEffect } from 'react';
import { Box, styled, Typography, Stack, CssBaseline} from '@mui/material';
import { Container } from '@mui/system';
import SideNavbar from '../SideNavbar';
import TablePortfolio from '../TablePortfolio';
import axios from '../../api/axios';
import StockForm from '../StockForm';
import PieChart from '../CustomPieChart';
import toast from 'react-hot-toast';

//Unused imports
import SearchIcon from '@mui/icons-material/Search';
import CustomButton from '../CustomButton';
import NewsFeed from '../NewsFeed';


//Component
function Profile({ user, setUser }):JSX.Element {
	const HOLDINGS_URL = `api/getHoldings/${user.id}`;

	const [stocksData, setStocksData] = useState([]);


	useEffect(() => {
		console.log('Use Effect ', user);
		if (user.id) {
			const getAllStocks = async () => {
				console.log('stocks got');
				try {
					const response = await axios.get(HOLDINGS_URL);
					if (response.data) {
						setStocksData(response.data);
					}
				} catch (error) {
					toast.error('Server did not retrieve data appropriately.');
				}
			};
			getAllStocks();
		}
	}, [user]);


	return (
		<>
			<CssBaseline />
			<Box sx={{ display: 'flex', mt: '40px' }}>
				<Container sx={{ width: '20%', ml: '110px' }}>
					<SideNavbar />
				</Container>
				<Container sx={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingBottom: '10px' }}>
					<Typography sx={{ fontSize: '24px', paddingLeft: '15px' }}>Hello {user.firstName}! </Typography>
					<Stack direction="row">
						<Stack direction="column">
							<StockForm stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<TablePortfolio stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
							<PieChart stocksData={stocksData} setStocksData={setStocksData} user={user} setUser={setUser} />
						</Stack>
					</Stack>
				</Container>
			</Box>
		</>
	);
}

export default Profile;


