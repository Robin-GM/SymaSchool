import axios from "axios"

import { HttpMethod } from "@/app/enums/HttpMethod"
import { ApiRequest } from "@/app/models/api/ApiRequest"

const httpClient = axios.create({
    baseURL: "http://localhost:9099",
    timeout: 30000
});

class ApiService{
    
    setRequestAuthorizationHeader(accessToken: string) {
        httpClient.defaults.headers.common[
          "Authorization"
        ] = `Bearer ${accessToken}`;
    }

    setRequestAcceptLanguageHeader(locale: string) {
      httpClient.defaults.headers.common["Accept-Language"] = locale;
    }

    async get<T = any>(url: string, params?: Record<string, any>): Promise<T> {
      return await this.perform<T>({
        method: HttpMethod.GET,
        url,
        params
      });
    }
  
    async post<T = any>(url: string, data?: any, params?: Record<string, any>): Promise<T> {
      return await this.perform<T>({
        method: HttpMethod.POST,
        url,
        data,
        params
      });
    }
  
    async patch<T = any>(url: string, data?: any): Promise<T> {
      return await this.perform<T>({
        method: HttpMethod.PATCH,
        url,
        data
      });
    }
  
    async put<T = any>(url: string, data?: any): Promise<T> {
      return await this.perform<T>({
        method: HttpMethod.PUT,
        url,
        data
      });
    }
  
    async delete<T = any>(url: string, params?: Record<string, any>): Promise<T> {
      return await this.perform<T>({
        method: HttpMethod.DELETE,
        url,
        params
      });
    }


    private async perform<T = any>(request: ApiRequest): Promise<T> { //POURQUOI L'APPELER "PERFORM" ? COMMENT ÇA FONCTIONNE QUAND IL EST IMPLÉMENTÉ ?
        try {
          const response = await httpClient({
            method: request.method,
            url: request.url,
            params: request.params,
            data: request.data
          });
          return response.data;
        } catch (error) {
          const message = error.response
            ? error.response.data.message
            : error.message;
    
          throw Error(message);
        }
    }
}

export const apiService = new ApiService();