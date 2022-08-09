
export const ERROR_BAD_REQUEST = 'ERROR_BAD_REQUEST';
export const ERROR_NOT_FOUND = 'ERROR_NOT_FOUND';
export const ERROR_SERVER = 'ERROR_SERVER';
export const ERROR_UNAUTHORIZED = 'ERROR_UNAUTHORIZED';
export const ERROR_UNKNOWN = 'ERROR_UNKNOWN';

export const STATUS_SUCCESS = 200;

export interface IRequestOptions {
    payload?: any;
    authorize?: boolean;
    baseUrl?: string;
}

export const requestOptions: IRequestOptions = {

}

export enum Method {
    GET = 'GET',
    POST = 'POST',
    PATCH = 'PATCH',
    DELETE = 'DELETE',
}
