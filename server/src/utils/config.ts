import path from 'path';
import dotenv from 'dotenv';

dotenv.config({ path: path.join(__dirname, '../../.env') });

const { API_KEY, PG_URI, JWT_SECRET } = process.env;

module.exports = {
  API_KEY,
  PG_URI,
  JWT_SECRET,
};
