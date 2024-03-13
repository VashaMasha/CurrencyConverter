import Axios, { AxiosResponse } from 'axios';
import {
  IGetCurrenciesResponse,
  IConvertValueResponse,
} from '../types/types';

const api = {
  getCurrencies: async (): Promise<AxiosResponse<IGetCurrenciesResponse>> => await Axios.get('https://api.fxratesapi.com/currencies'),
  getRates: async (from: string): Promise<AxiosResponse<IConvertValueResponse>> =>
    await Axios.get(`https://api.fxratesapi.com/latest?base=${from}&resolution=1m&amount=1&places=2&format=json`),
};

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    throw error;
  }
);

export default api;
