import {
    IRequestOptions,
    Method,
    requestOptions,
} from './api-types';
import {
    store
} from '../store/store';

class Api {

    async request(method: Method, url: string, options: IRequestOptions = requestOptions) {
        const {
            authorize,
            payload,
        } = options;

        const baseUrl = process.env.REACT_APP_API_BASE_URL;

        const fetchOptions: any = {
            method,
            headers: {
                'Content-Type': 'application/json',
            },
        };

        if (authorize) {
            const sessionId = store.getState().auth.sessionId;
            fetchOptions.headers.Authorization = `Bearer ${sessionId}`;
        }

        if (payload && typeof payload === 'object') {
            fetchOptions.body = JSON.stringify(payload);
        }

        const response = await fetch(`${baseUrl}${url}`, fetchOptions);

        // handle 401

        return response;
    }
}

export default new Api();
