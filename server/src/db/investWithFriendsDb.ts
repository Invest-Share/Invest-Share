import { Pool, QueryResult, QueryResultRow } from 'pg';
import { PG_URI, PG_URI_TEST } from '../utils/config';

console.log('PG_URI: ', PG_URI);

const pool = new Pool({
  connectionString: process.env.NODE_ENV === 'test' ? PG_URI_TEST : PG_URI,
});

// console.log('NODE_ENV: ', process.env.NODE_ENV);

export default {
  query: async (
    text: string,
    params?: Array<string | number>
    // callback: (err: Error, result: QueryResult<any>) => void
  ): Promise<QueryResult<QueryResultRow>> => {
    console.log('Executed Query: ', text);
    return pool.query<QueryResultRow, Array<string | number>>(text, params);
  },
};
