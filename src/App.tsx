import React from 'react';
import './App.scss';
import './styles/styles.scss';
import { Header } from './components/Header/Header';
import { Outlet } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <div className="app">
        <Header />
        <div className="content">
            <Outlet />
        </div>
        {/* Header / Navigation */}
        <Footer />
    </div>
  );
}

export default App;
