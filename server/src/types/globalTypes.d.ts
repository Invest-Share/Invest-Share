// import type { RequestHandler } from 'express';

// declare namespace GlobalTypes {
//   export interface Controller {
//     [index: string]: RequestHandler;
//   }
// }

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
}

// interface Holding {
//   user_id: number;
//   stock_quantity: number;
//   stock_id: number;
//   ticker: string;
//   company_name: string;
//   closing_price: number | string;
//   market_value?: number | string;
//   percent_of_holdings?: string;
// }
