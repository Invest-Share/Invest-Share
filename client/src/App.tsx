import { useState, useEffect } from 'react';
// import toast, { Toaster } from 'react-hot-toast';
import { Toaster } from 'react-hot-toast';
import 'react-toastify/dist/ReactToastify.css';
import { Routes, Route } from 'react-router-dom';
import './App.css';
import './scss/main.scss';
import Home from './components/pages/Home.js';
import Navbar from './components/Navbar';
import Features from './components/pages/Features';
import Contact from './components/pages/Contact';
import Register from './components/pages/Register';
import Login from './components/pages/Login';
import Dashboard from './components/pages/Dashboard';
// import SideNavbar from './components/SideNavbar';
import Profile from './components/pages/Profile';
import Friends from './components/pages/Friends';

const App: React.FC = (): JSX.Element => {
  // this hook is used to track ALL user information (id, first name, last name, email, password)
  const [user, setUser] = useState<User>({
    id: NaN, // this is a number type object, so it complies to the interface
    firstName: '',
    lastName: '',
    email: '',
    password: '',
  });

  // login:
  // ISSUE for TS refactoring: this function is called in Login and Register components, where it only requires email and pw
  // other components do not require all these obj properties!
  const login = (userData: User): void => {
    // console.log(userData);
    const { id, firstName, lastName, email, password } = userData;
    setUser({
      id,
      firstName,
      lastName,
      email,
      password,
    });
    localStorage.setItem('user', JSON.stringify(userData));
    console.log('logged in confirmed');
  };

  // logout: 1) resets user state; 2) clears localStorage
  const logout = (): void => {
    setUser({ id: NaN, firstName: '', lastName: '', email: '', password: '' });
    localStorage.clear();
    console.log('logged out confirmed');
  };

  // useEffect occurs once (on App component mount): 1) if there's no user obj on localStorage, the user stored in state is set on localStorage; 2) if there's a user obj on localStorage, the user info held in state is updated to the locally stored user
  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify(user));
    }
    setUser(JSON.parse(localStorage.getItem('user')));
  }, []);

  return (
    <>
      <Navbar user={user} logout={logout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/features" element={<Features />} />
        <Route path="/contactus" element={<Contact />} />
        <Route path="/register" element={<Register login={login} />} />
        <Route path="/login" element={<Login login={login} />} />
        <Route
          path="/dashboard"
          element={<Dashboard user={user} setUser={setUser} />}
        />
        <Route
          path="/profile"
          element={<Profile user={user} setUser={setUser} />}
        />
        <Route path="/friends" element={<Friends user={user} />} />
      </Routes>
      <Toaster />
    </>
  );
};

export default App;
