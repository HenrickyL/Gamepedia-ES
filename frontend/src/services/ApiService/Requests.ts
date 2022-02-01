import { AxiosResponse } from 'axios';
import { api } from '.';
export const checkAuthentication = ():Promise<AxiosResponse>=>{
    return api.get('/users/me')
}

