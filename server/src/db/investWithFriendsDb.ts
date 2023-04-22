import { Pool, QueryResult, QueryResultRow } from 'pg';
import { PG_URI } from '../utils/config';

const pool = new Pool({
  connectionString: PG_URI,
});

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
