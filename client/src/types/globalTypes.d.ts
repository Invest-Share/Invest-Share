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
