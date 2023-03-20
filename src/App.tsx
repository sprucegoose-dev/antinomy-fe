import React from 'react';
import './App.scss';
import './styles/styles.scss';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <div className="app">
        <Header />
        <div className="content">
            <Outlet />
        </div>
        <Footer />
        <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
    </div>
  );
}

export default App;
