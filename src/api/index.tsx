import Axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import { IGetCurrenciesResponse, SortType } from '../types/types';

// It's better to store variables like this in Secrets Management Tools
const API_KEY = '085438b8b313ab9190eb2787432cc249ee6a5eb528463ea4bc12c83a5300';
const api = {
  getCurrencies: async (
    sort?: SortType,
    offset?: number,
    symbol?: string,
  ): Promise<AxiosResponse<IGetCurrenciesResponse>> => {
    const params: AxiosRequestConfig = {
      params: {
        api_key: API_KEY,
        sort,
        offset: offset || 0,
        limit: 10,
        symbol
      },
    };
    const response = await Axios.get(
      `https://api.cryptorank.io/v1/currencies`,
      params
    );
    return response;
  },
};

Axios.interceptors.response.use(
  (response) => response,
  async (error) => {
    throw error;
  }
);

export default api;