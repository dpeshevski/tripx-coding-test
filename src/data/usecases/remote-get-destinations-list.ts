import { HttpClient, HttpStatusCode } from '@/data/protocols/http';
import { RemoteDestinationModel } from '@/data/models';

import { AccessDeniedError, UnexpectedError } from '@/domain/errors';
import { GetDestinationsList } from '@/domain/usecases';

export class RemoteGetDestinationsList implements GetDestinationsList {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteGetDestinationsList.Model[]>
  ) {}

  async getDestinationsList(): Promise<GetDestinationsList.Model[]> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'GET',
    })

    const remoteDestinationsList = httpResponse.body || [] as RemoteGetDestinationsList.Model[];

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteDestinationsList;
      case HttpStatusCode.noContent:
        return [] as GetDestinationsList.Model[];
      case HttpStatusCode.forbidden: throw new AccessDeniedError()
      default:
        throw new UnexpectedError()
    }
  }
}

export namespace RemoteGetDestinationsList {
  export type Model = RemoteDestinationModel;
}