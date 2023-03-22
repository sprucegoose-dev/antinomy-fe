import React, { useEffect } from 'react';
import './App.scss';
import { socket } from './socket';

import './styles/styles.scss';
import { Header } from './components/Header/Header';
import { Outlet, useLocation } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import UserResource from './resources/UserResource';
import { useDispatch, useSelector } from 'react-redux';
import { IRootReducer } from './store/reducers-types';
import { IAuthReducer, RESET_AUTH_DETAILS } from './components/Auth/Auth-types';

function App() {
    const auth = useSelector<IRootReducer>((state) => state.auth) as IAuthReducer;
    const dispatch = useDispatch();

    useEffect(() => {
        socket.connect();

        const validateLoginState = async () => {
            const response = await (await UserResource.getDetails()).json();

            if (response.code === 401) {
                dispatch({ type: RESET_AUTH_DETAILS });
            }
        }

        if (auth.userId) {
            console.log('got here');
            validateLoginState();
        }
    }, [auth, dispatch]);

    const { pathname } = useLocation();

    const inGame = pathname.includes('game');

    return (
        <div className="app">
            {inGame ? null : <Header />}
            <div className="content">
                <Outlet />
            </div>
            {inGame ? null : <Footer />}
            <ToastContainer autoClose={2000} pauseOnFocusLoss={false} />
        </div>
    );
}

export default App;
