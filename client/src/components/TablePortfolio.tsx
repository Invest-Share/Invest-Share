import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

type TablePortfolioProps = {
	stocksData : Array<Holding>,
	setStocksData: React.Dispatch<React.SetStateAction<Array<Holding>>>,
	user: User,
	setUser: React.Dispatch<React.SetStateAction<User>>
}

function TablePortfolio({ stocksData, setStocksData, user, setUser }:TablePortfolioProps):JSX.Element {
	return (
		<>
			<Table size="small">
				<TableHead>
					<TableRow>
						<TableCell>Ticker</TableCell>
						<TableCell>Company</TableCell>
						<TableCell>Closing Price</TableCell>
						<TableCell>Stock Quantity</TableCell>
						<TableCell>Market Value</TableCell>
						<TableCell>% of Holdings</TableCell>
					</TableRow>
				</TableHead>
				<TableBody>
					{stocksData &&
						stocksData.map((stock, index) => (
							<TableRow key={index}>
								<TableCell>{stock.ticker}</TableCell>
								<TableCell>{stock.company_name}</TableCell>
								<TableCell>{stock.closing_price}</TableCell>
								<TableCell>{stock.stock_quantity}</TableCell>
								<TableCell>{stock.market_value}</TableCell>
								<TableCell>{stock.percent_of_holdings}</TableCell>
							</TableRow>
						))}
				</TableBody>
			</Table>
		</>
	);
}

export default TablePortfolio;
