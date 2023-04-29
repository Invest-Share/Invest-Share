// import { PureComponent } from 'react';
// import { CategoryScale } from 'chart.js';
// import Chart from 'chart.js/auto';
// import { Box, styled, Typography, Stack, CssBaseline, InputBase, TextField, Button, Grid } from '@mui/material';
// import TableBody from '@mui/material/TableBody';
// import ChartDataLabels from 'chartjs-plugin-datalabels';

import React, { Dispatch, SetStateAction } from 'react';
import './CustomPieChart.css';
import { Pie } from 'react-chartjs-2';
import Table from '@mui/material/Table';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';

interface Stock {
  ticker: string;
  company_name: string;
  closing_price: number;
  last_updated: number;
}

interface PieChartProps {
  stocksData: Array<Holding>;
  setStocksData?: React.Dispatch<React.SetStateAction<Holding[]>>;
  user?: User,
  setUser?: React.Dispatch<React.SetStateAction<User>>
}

interface Dataset {
  label: string;
  backgroundColor: string[];
  borderColor: string[];
  borderWidth: number;
  data: number[];
}

interface State {
  labels: string[];
  datasets: Dataset[];
}

interface Options {
  // don't declare an interface for options prop passed into Pie component -> error
  plugins: {
    legend: {};
    datalabels: {};
  };
}

const PieChart: React.FC<PieChartProps> = ({
  stocksData,
  setStocksData,
}): JSX.Element => {
  // const quantity = stocksData.map((stock) => stock.stock_quantity);
  const numberfy = (): number[] => {
    // percent_of_holdings is not on any DB table
    const percents = stocksData.map((stock) => stock.percent_of_holdings);
    const finalData = [];
    for (let i = 0; i < percents.length; i++) {
      finalData.push(Number(percents[i].slice(0, -2)));
    }
    return finalData;
  };
  const numberHoldings = numberfy();

  const tickers = stocksData.map((stock) => stock.ticker);
  const state: State = {
    labels: tickers,
    datasets: [
      {
        label: 'Percentages of Holdings',
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)',
        ],
        borderWidth: 0.5,
        data: numberHoldings,
      },
    ],
  };

  const options: Options = {
    plugins: {
      legend: {
        display: true,
        position: 'right',
      },
      datalabels: {
        display: true,
        color: 'white',
      },
    },
  };

  return (
    <>
      <Table size="medium" sx={{ mt: '40px' }}>
        <TableHead>
          <TableRow>
            <TableCell sx={{ fontSize: '20px', backgroundColor: 'none' }}>
              My Portfolio
            </TableCell>
          </TableRow>
        </TableHead>
      </Table>

      <div className="pie">
        <Pie data={state} options={options} />
      </div>
    </>
  );
};

export default PieChart;

// 	<ResponsiveContainer width="100%" height="100%">
// 	<PieChart width={400} height={400}>
// 		<Pie nameKey="ticker" dataKey="stock_quantity" isAnimationActive={false} data={stocksData} cx="50%" cy="50%" outerRadius={80} fill="#8884d8" label />
// 		<Tooltip />
// 	</PieChart>
// </ResponsiveContainer>
