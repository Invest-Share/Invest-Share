// import axios from 'axios';
import db from '../db/investWithFriendsDb';
import type { QueryResultRow } from 'pg';
import {
  getClosingPriceAxios,
  updateClosingPrices,
} from '../services/updateStocksService';

export const updateLRUTicker = async (): Promise<void> => {
  try {
    const lruTicker = await getLRUTicker();
    // console.log(lruTicker);
    if (Date.now() - lruTicker.last_updated > 40_000_000) {
      const updatedPrice = await getClosingPriceAxios(lruTicker.ticker);
      await updateClosingPrices(lruTicker.ticker, updatedPrice);
    }
  } catch (err) {
    console.log(err);
  }
};

const getLRUTicker = async (): Promise<QueryResultRow> => {
  const query = `
    SELECT *
    FROM stocks
    WHERE last_updated = (SELECT MIN(last_updated) FROM stocks);
  `;
  const response = await db.query(query);

  return response.rows[0];
};
