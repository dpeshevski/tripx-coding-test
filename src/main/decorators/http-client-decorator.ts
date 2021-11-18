import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http';

export class HttpClientDecorator implements HttpClient {
  constructor(
    private readonly httpClient: HttpClient
  ) {}

  async request(data: HttpRequest): Promise<HttpResponse> {
    const httpResponse = await this.httpClient.request(data);
    return httpResponse;
  }
}