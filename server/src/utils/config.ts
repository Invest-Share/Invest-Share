import dotenv from 'dotenv';

dotenv.config();
// { path: path.join(__dirname, '../../.env') }

const { API_KEY, PG_URI, PG_URI_TEST, JWT_SECRET } = process.env;

// console.log('PG_URI: ', PG_URI);
export { API_KEY, PG_URI, PG_URI_TEST, JWT_SECRET };
