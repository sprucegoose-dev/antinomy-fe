import api from '../services/api';
import { Method, requestOptions } from '../services/api-types';
import { ICreateUserRequest, ILoginRequest } from '../types/user';

export default class UserResource {

    static async createUser(payload: ICreateUserRequest) {
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

        return await api.request(Method.POST, '/user/signUp', options);
    }

}
