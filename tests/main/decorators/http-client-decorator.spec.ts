import faker from 'faker';

import { HttpRequest } from '@/data/protocols/http'
import { HttpClientDecorator } from '@/main/decorators';

import { mockHttpRequest, HttpClientSpy } from '@/tests/data/mocks';

type SutTypes = {
  sut: HttpClientDecorator,
  httpClientSpy: HttpClientSpy
}

const makeSut = (): SutTypes => {
  const httpClientSpy = new HttpClientSpy();

  const sut = new HttpClientDecorator(httpClientSpy);

  return { 
    sut,
    httpClientSpy
  }
}

describe('HttpClientDecorator', () => {
  test('Should not add headers', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'GET']),
    }

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
  })

  test('Should add headers to HttpClient', async () => {
    const { sut, httpClientSpy } = makeSut();

    const httpRequest: HttpRequest = {
      url: faker.internet.url(),
      method: faker.random.arrayElement(['get', 'GET'])
    }

    await sut.request(httpRequest);

    expect(httpClientSpy.url).toBe(httpRequest.url);
    expect(httpClientSpy.method).toBe(httpRequest.method);
  })

  test('Should return the same result as HttpClient', async () => {
    const { sut, httpClientSpy} = makeSut();

    const httpResponse = await sut.request(mockHttpRequest());

    expect(httpResponse).toEqual(httpClientSpy.response);
  })
})