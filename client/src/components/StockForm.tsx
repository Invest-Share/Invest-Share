import React, { useState, useEffect } from "react";
import {
  Box,
  styled,
  Typography,
  Stack,
  CssBaseline,
  InputBase,
  TextField,
  Button,
  // Grid,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import { Container } from "@mui/system";
import toast, { Toaster } from "react-hot-toast";
import RefreshIcon from "@mui/icons-material/Refresh";
import axios from "../api/axios";
import NewsFeed from "./NewsFeed";

interface StockData {
  closing_price: number | string;
  company_name: string;
  last_updated: string | number;
  market_value?: number | string;
  percent_of_holdings?: string;
  stock_id: number | string;
  stock_quantity: number | string;
  ticker: string;
  user_id: number;
}

function StockForm({
  stocksData,
  setStocksData,
  user,
  setUser,
}: {
  stocksData: StockData[];
  setStocksData: React.Dispatch<React.SetStateAction<User>>;
  user: User;
  setUser: React.Dispatch<React.SetStateAction<User>>;
}): JSX.Element {
  const HOLDINGS_URL: string = `api/holdings/${user.id}`;
  const ADDHOLDING_URL: string = "/api/addHolding";
  const UPDATEHOLDING_URL: string = "/api/updateHolding";
  const DELETEHOLDING_URL: string = "/api/deleteHolding";
  const UPDATECLOSINGPRICE_URL: string = `/api/closingPrice/${user.id}`;

  //Immplicit type declaration
  const [stockData, setStockData] = useState<StockData>({
    user_id: 0,
    stock_quantity: "",
    stock_id: "",
    ticker: "",
    company_name: "",
    closing_price: "",
    last_updated: "",
    market_value: "",
    percent_of_holdings: "",
  });

  const userData = JSON.parse(localStorage.getItem("user")!);

  //no types needed for useEffect, since it does not return values.
  useEffect(() => {
    setStockData({ ...stockData, user_id: userData.id });

    console.log(stockData);
  }, [stockData.ticker]);

  const addOnClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const existingStock = stocksData.find(
        (data): boolean => data.ticker === stockData.ticker
      );

      if (existingStock) {
        console.log("yes it exists");
        const updatedStock: StockData = {
          ...existingStock,
          stock_quantity:
            Number(existingStock.stock_quantity) +
            Number(stockData.stock_quantity),
        };
        console.log(updatedStock);
        const response = await axios.patch(
          UPDATEHOLDING_URL,
          JSON.stringify(updatedStock),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        console.log(response.data);
        if (response.data) {
          // setStockData(response.data[response.data.length - 1]);
          setStocksData(response.data);
          localStorage.setItem("stocksData", JSON.stringify(response.data));

          // setStocksData((prev) => {
          // 	console.log(prev);
          // 	const portfolio = [...prev, stockData];
          // 	return portfolio;
          // });
        }
      } else {
        console.log(stockData);
        const response = await axios.post(
          ADDHOLDING_URL,
          JSON.stringify(stockData),
          {
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          }
        );
        // console.log(response.data);
        if (response.data) {
          // setStockData(response.data[response.data.length - 1]);
          setStocksData(response.data);
          localStorage.setItem("stocksData", JSON.stringify(response.data));

          // setStocksData((prev) => {
          // 	console.log(prev);
          // 	const portfolio = [...prev, stockData];
          // 	return portfolio;
          // });
        }
      }
      setStockData({
        closing_price: "",
        company_name: "",
        last_updated: "",
        market_value: "",
        percent_of_holdings: "",
        stock_id: "",
        stock_quantity: "",
        ticker: "",
        user_id: 0,
      });
    } catch (err) {
      toast.error("The ticker does not exist.");
    }
  };

  const sellOnClick = async (event: { preventDefault: () => void }) => {
    event.preventDefault();
    try {
      const existingStock = stocksData.find(
        (data: { ticker: string }) => data.ticker === stockData.ticker
      );
      if (existingStock) {
        const updatedStock = {
          ...existingStock,
          stock_quantity:
            Number(existingStock.stock_quantity) -
            Number(stockData.stock_quantity),
        };
        // const jsonStock = JSON.stringify(updatedStock);
        if (updatedStock.stock_quantity === 0) {
          const response = await axios.delete(DELETEHOLDING_URL, {
            data: JSON.stringify(updatedStock),
            headers: { "Content-Type": "application/json" },
            withCredentials: true,
          });

          if (response.data) {
            // setStockData(response.data[response.data.length - 1]);
            setStocksData(response.data);
            localStorage.setItem("stocksData", JSON.stringify(response.data));

            // setStocksData((prev) => {
            // 	console.log(prev);
            // 	const portfolio = [...prev, stockData];
            // 	return portfolio;
            // });
          }
        } else if (updatedStock.stock_quantity > 0) {
          const response = await axios.patch(
            UPDATEHOLDING_URL,
            JSON.stringify(updatedStock),
            {
              headers: { "Content-Type": "application/json" },
              withCredentials: true,
            }
          );
          if (response.data) {
            // setStockData(response.data[response.data.length - 1]);
            setStocksData(response.data);
            localStorage.setItem("stocksData", JSON.stringify(response.data));

            // setStocksData((prev) => {
            // 	console.log(prev);
            // 	const portfolio = [...prev, stockData];
            // 	return portfolio;
            // });
          }
        } else {
          toast.error("You do not have enough shares");
        }
      }
      setStockData({
        closing_price: "",
        company_name: "",
        last_updated: "",
        market_value: "",
        percent_of_holdings: "",
        stock_id: "",
        stock_quantity: "",
        ticker: "",
        user_id: 0,
      });
    } catch (err) {
      toast.error("The ticker does not exist.");
    }
  };

  const refresh = async (event: { preventDefault: () => void }) => {
    try {
      const response = await axios.get(UPDATECLOSINGPRICE_URL);
      if (response.data) {
        setStocksData(response.data);
      }
    } catch (error) {
      toast.error("Data did not refresh.");
    }
  };

  const publish = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    try {
      const response = await axios.get(HOLDINGS_URL, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (response.data) {
        localStorage.setItem("stocksData", JSON.stringify(response.data));
        <NewsFeed
          portfolio={response.data}
          stocksData={stocksData}
          setStocksData={setStocksData}
        />;
      }
    } catch (error) {
      toast.error("Sorry, you cannot publish.");
    }
  };

  return (
    <>
      <Box p={2}>
        <Box sx={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <TextField
            size="small"
            id="ticker"
            label="Ticker"
            name="ticker"
            value={stockData.ticker}
            onChange={(e) =>
              setStockData({
                ...stockData,
                ticker: e.target.value.toUpperCase(),
              })
            }
            required
          />
          <TextField
            sx={{ width: "20%" }}
            size="small"
            id="stock_quantity"
            label="Quantity"
            name="stock_quantity"
            type="number"
            value={stockData.stock_quantity}
            onChange={(e) =>
              setStockData({
                ...stockData,
                stock_quantity: Number(e.target.value),
              })
            }
            required
          />
          <Button
            color="success"
            size="medium"
            type="submit"
            variant="contained"
            onClick={addOnClick}
          >
            BUY
          </Button>
          <Button
            color="error"
            size="medium"
            type="submit"
            variant="contained"
            onClick={sellOnClick}
          >
            SELL
          </Button>
          <Button
            variant="outlined"
            size="small"
            sx={{ width: 200, marginLeft: "10px" }}
            onClick={publish}
          >
            Publish to Newsfeed
          </Button>
          {/* <IconButton color="primary" sx={{ ml: '10px' }} onClick={refresh}>
						<RefreshIcon fontSize="small" sx={{ color: '#0F1B4C' }} />
					</IconButton> */}
        </Box>
      </Box>
    </>
  );
}
export default StockForm;

// const handleSubmit = async (event) => {
// 	event.preventDefault();
// 	try {
// 		console.log(stockData);
// 		const response = await axios.post(ADDHOLDING_URL, JSON.stringify({ stockData }), {
// 			headers: { 'Content-Type': 'application/json' },
// 			withCredentials: true,
// 		});
// 		// const individualStockData = response.data.pop();
// 		console.log(response.data);

// 		if (response.data) {
// 			// setStockData(response.data[response.data.length - 1]);
// 			setStocksData(response.data);
// 			// setStocksData((prev) => {
// 			// 	console.log(prev);
// 			// 	const portfolio = [...prev, stockData];
// 			// 	return portfolio;
// 			// });
// 		}
// 		setStockData({
// 			closing_price: '',
// 			company_name: '',
// 			last_updated: '',
// 			market_value: '',
// 			percent_of_holdings: '',
// 			stock_id: '',
// 			stock_quantity: '',
// 			ticker: '',
// 			user_id: '',
// 		});
// 	} catch (err) {
// 		toast.error('The ticker does not exist.');
// 	}
// };
