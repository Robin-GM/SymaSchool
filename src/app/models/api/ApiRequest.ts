import { HttpMethod } from "@/app/enums/HttpMethod";

export interface ApiRequest {
  method: HttpMethod;
  url: string;
  params?: Record<string, any>;
  data?: any;
}
