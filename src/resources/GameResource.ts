import api from '../services/api';
import { Method, requestOptions } from '../services/api-types';

export default class GameResource {

    static async getActiveGames() {
        const options = {
            ...requestOptions,
        }

        return await api.request(Method.GET, '/game/all', options);
    }

    static async join(gameId: number) {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.POST, `/game/${gameId}/join`, options);
    }

    static async create() {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.POST, '/game', options);
    }

    static async start(gameId: number) {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.POST, `/game/${gameId}/start`, options);
    }

    static async getState(gameId: number) {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.GET, `/game/${gameId}`, options);
    }

    static async getActions(gameId: number) {
        const options = {
            ...requestOptions,
            authorize: true,
        }

        return await api.request(Method.GET, `/game/${gameId}/actions`, options);
    }

}
