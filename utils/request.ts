import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { TIMEOUT } from "@constants/axios.constant";
import { DEFAULT_ERROR_MESSAGE } from "@constants/text.constant";
import { IBaseResponse } from "@interfaces/base-response.interface";
import { Headers } from "@enums/header.enum";

const request: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_AXIOS_BASE_URL,
  timeout: TIMEOUT,
});

request.interceptors.request.use(
  (config: AxiosRequestConfig): AxiosRequestConfig => {
    config.headers[Headers.ContentType] = Headers.ApplicationJson;

    return config;
  },
  (error: AxiosError): Promise<AxiosError> => {
    return Promise.reject(error);
  }
);

request.interceptors.response.use(
  (response: AxiosResponse<IBaseResponse>): any => {
    const data = response.data;

    const { code } = data;

    // 当下载文件时，不会反回 code。 并且 data 此时会为 Blob
    // 此处额外判断 code !== undefined 用以过滤此场景
    if (code !== undefined && code !== 200) {
      return Promise.reject(data);
    }

    if (response.request.responseType === "blob") {
      return response;
    }
    return data;
  },
  (error: AxiosError<IBaseResponse>): Promise<IBaseResponse> => {
    if (error.response?.status !== 200) {
      return Promise.reject({ message: DEFAULT_ERROR_MESSAGE });
    }
    return Promise.reject(error.response.data);
  }
);

export default request;
