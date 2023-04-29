import { Box} from '@mui/material';


function Rightbar(): JSX.Element {
	return (
		<Box flex={2} p={2} sx={{ display: { backgroundColor:"#F2F2F2", xs: 'none', sm: 'block' } }}>
			Rightbar
		</Box>
	);
}

export default Rightbar;
