import api from '../services/api';
import { Method, requestOptions } from '../services/api-types';
import { ISignUpRequest, ILoginRequest } from '../types/user.interface';

export default class UserResource {

    static async signUp(payload: ISignUpRequest) {
        const options = {
            ...requestOptions,
            payload,
        }

        return await api.request(Method.POST, '/user/signUp', options);
    }

    static async login(payload: ILoginRequest) {
        const options = {
            ...requestOptions,
            payload,
        }

        return await api.request(Method.POST, '/user/login', options);
    }

    static async getDetails() {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.GET, '/user', options);
    }

}
