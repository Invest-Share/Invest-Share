interface User {
  id?: number;
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
}

interface UserProps {
  login: (userData: User) => void;
}

interface Holding {
  user_id: number;
  stock_quantity: number;
  stock_id: number;
  ticker: string;
  company_name: string;
  closing_price: number | string;
  market_value?: number | string;
  percent_of_holdings?: string;
}