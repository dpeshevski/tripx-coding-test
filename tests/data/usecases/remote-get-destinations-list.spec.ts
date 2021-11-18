import faker from 'faker';

import { RemoteGetDestinationsList } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http'
import { UnexpectedError, AccessDeniedError } from '@/domain/errors'
import { HttpClientSpy, mockRemoteGetDestinationsListModel } from '@/tests/data/mocks';

type SutTypes = {
  sut: RemoteGetDestinationsList;
  httpClientSpy: HttpClientSpy<RemoteGetDestinationsList.Model[]>;
}

const makeSut = (url = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteGetDestinationsList.Model[]>()
  const sut = new RemoteGetDestinationsList(url, httpClientSpy);

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteGetDestinationsList', () => {
  test('Should call HttpClient with correct URL and Method', async () => {
    const url = faker.internet.url();

    const { sut, httpClientSpy } = makeSut(url);

    await sut.getDestinationsList();

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('GET');
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError,
    }

    const destinationList = sut.getDestinationsList();

    await expect(destinationList).rejects.toThrow(new UnexpectedError());
  })

  
  test('Should throw AccessDeniedError if HttpClient returns 403', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.forbidden
    }

    const destinationsList = sut.getDestinationsList();

    await expect(destinationsList).rejects.toThrow(new AccessDeniedError());
  })

  
  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const destinationsList = sut.getDestinationsList();

    await expect(destinationsList).rejects.toThrow(new UnexpectedError());
  })

  test('Should return a list of DestinationsListModel if HttpClient returns 200', async () => {
    const { sut, httpClientSpy} = makeSut();
    const httpResponse = mockRemoteGetDestinationsListModel();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResponse
    }

    const destinationsList = await sut.getDestinationsList();

    expect(destinationsList).toEqual([
      {
        name: httpResponse[0].name,
        slug: httpResponse[0].slug,
        code: httpResponse[0].code,
        thumbnail: httpResponse[0].thumbnail,
        countHotels: httpResponse[0].countHotels,
        countDestinations: httpResponse[0].countDestinations,
        destinations: [
          {
            name: httpResponse[0].destinations[0].name,
            slug: httpResponse[0].destinations[0].slug,
            code: httpResponse[0].destinations[0].code,
            thumbnail: httpResponse[0].destinations[0].thumbnail,
            countHotels: httpResponse[0].destinations[0].countHotels,
            alias: httpResponse[0].destinations[0].alias
          }
        ]
      },
      {
        name: httpResponse[1].name,
        slug: httpResponse[1].slug,
        code: httpResponse[1].code,
        thumbnail: httpResponse[1].thumbnail,
        countHotels: httpResponse[1].countHotels,
        countDestinations: httpResponse[1].countDestinations,
        destinations: [
          {
            name: httpResponse[1].destinations[0].name,
            slug: httpResponse[1].destinations[0].slug,
            code: httpResponse[1].destinations[0].code,
            thumbnail: httpResponse[1].destinations[0].thumbnail,
            countHotels: httpResponse[1].destinations[0].countHotels,
            alias: httpResponse[1].destinations[0].alias
          }
        ]
      },
      {
        name: httpResponse[2].name,
        slug: httpResponse[2].slug,
        code: httpResponse[2].code,
        thumbnail: httpResponse[2].thumbnail,
        countHotels: httpResponse[2].countHotels,
        countDestinations: httpResponse[2].countDestinations,
        destinations: [
          {
            name: httpResponse[2].destinations[0].name,
            slug: httpResponse[2].destinations[0].slug,
            code: httpResponse[2].destinations[0].code,
            thumbnail: httpResponse[2].destinations[0].thumbnail,
            countHotels: httpResponse[2].destinations[0].countHotels,
            alias: httpResponse[2].destinations[0].alias
          }
        ]
      },
      {
        name: httpResponse[3].name,
        slug: httpResponse[3].slug,
        code: httpResponse[3].code,
        thumbnail: httpResponse[3].thumbnail,
        countHotels: httpResponse[3].countHotels,
        countDestinations: httpResponse[3].countDestinations,
        destinations: [
          {
            name: httpResponse[3].destinations[0].name,
            slug: httpResponse[3].destinations[0].slug,
            code: httpResponse[3].destinations[0].code,
            thumbnail: httpResponse[3].destinations[0].thumbnail,
            countHotels: httpResponse[3].destinations[0].countHotels,
            alias: httpResponse[3].destinations[0].alias
          }
        ]
      }
    ])
  })

  test('Should return an empty list if HttpClient returns 204', async () => {
    const { sut, httpClientSpy } = makeSut();
    httpClientSpy.response = {
      statusCode: HttpStatusCode.noContent,
    }

    const destinationsList = await sut.getDestinationsList();

    expect(destinationsList).toEqual([])
  })
})
