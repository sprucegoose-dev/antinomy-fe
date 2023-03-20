import React from 'react';
import ReactDOM from 'react-dom/client';
import {
    BrowserRouter,
    Routes,
    Route,
} from 'react-router-dom';
import { store, persistor } from './store/store';
import './index.css';
import App from './App';
import Login from './pages/Login/Login-container';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { Rooms } from './components/Rooms/Rooms';
import { Game } from './components/Game/Game';

const root = ReactDOM.createRoot(
    document.getElementById('root') as HTMLElement
);

root.render(
    <React.StrictMode>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<App />}>
                            <Route path="login/:signUp" element={<Login />} />
                            <Route path="login" element={<Login />} />
                            <Route path="rooms" element={<Rooms />} />
                            <Route path="profile" element={<Rooms />} />
                            <Route path="game/:id" element={<Game />} />
                        </Route>
                    </Routes>
                </BrowserRouter>
            </PersistGate>
        </Provider>
    </React.StrictMode>
);
