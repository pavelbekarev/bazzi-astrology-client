import { AxiosInstance } from "axios";
import { api } from "#shared/api/axiosInstance";

/**
 *  ApiClient - класс для работы с REST-запросами
 */
export class ApiClient {
  private method: string;

  private apiEndPoint: string;

  private static instance: ApiClient;

  private info: any;

  private api: AxiosInstance;

  constructor({ method = "GET", apiEndPoint = "", info = {} }) {
    this.method = method;
    this.apiEndPoint = apiEndPoint;
    this.info = info;
    this.api = api;
  }

  public static getInstance(data?: {
    method?: string;
    apiEndPoint?: string;
    info?: any;
  }): ApiClient {
    if (!ApiClient.instance) {
      ApiClient.instance = new ApiClient(data || {});
    }
    return ApiClient.instance;
  }

  public async makeRequest() {
    console.debug("this.apiEndPoint", this.apiEndPoint);
    console.debug("this.info", this.info);
    console.debug("this.method", this.method);

    const response = await this.api.request({
      method: this.method,
      url: this.apiEndPoint,
      data: this.info,
    });
    return response.data;
  }

  private grabData(data) {}
}
