import faker from 'faker';

import { InvalidCredentialsError, UnexpectedError } from '@/domain/errors';
import { mockAuthenticationParams, mockAuthenticationModel } from '@/tests/domain/mocks';

import { RemoteAuthentication } from '@/data/usecases';
import { HttpStatusCode } from '@/data/protocols/http';

import { HttpClientSpy } from '@/tests/data/mocks';

type SutTypes = {
  sut: RemoteAuthentication;
  httpClientSpy: HttpClientSpy<RemoteAuthentication.Model>;
}

const makeSut = (url: string = faker.internet.url()): SutTypes => {
  const httpClientSpy = new HttpClientSpy<RemoteAuthentication.Model>();
  const sut = new RemoteAuthentication(url, httpClientSpy);

  return {
    sut,
    httpClientSpy
  }
}

describe('RemoteAuthentication', () => {
  test('Should call HttpClient with correct values', async () => {
    const url = faker.internet.url();
    const { sut, httpClientSpy } = makeSut(url);
    const authenticationParams = mockAuthenticationParams();

    await sut.auth(authenticationParams);

    expect(httpClientSpy.url).toBe(url);
    expect(httpClientSpy.method).toBe('POST');
    expect(httpClientSpy.body).toEqual(authenticationParams);
  })

  test('Should throw InvalidCredentialsError if HttpClient returns 400', async () => {
    const { sut, httpClientSpy } = makeSut();
    
    httpClientSpy.response = {
      statusCode: HttpStatusCode.badRequest
    }

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new InvalidCredentialsError());
  })

  test('Should throw UnexpectedError if HttpClient returns 500', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.serverError
    }

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should throw UnexpectedError if HttpClient returns 404', async () => {
    const { sut, httpClientSpy } = makeSut();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.notFound
    }

    const promise = sut.auth(mockAuthenticationParams());

    await expect(promise).rejects.toThrow(new UnexpectedError());
  })

  test('Should return an Authentication.Model if HttpClient returns 200', async () => {
    const { sut, httpClientSpy } = makeSut();
    
    const httpResult = mockAuthenticationModel();

    httpClientSpy.response = {
      statusCode: HttpStatusCode.ok,
      body: httpResult
    }

    const user = await sut.auth(mockAuthenticationParams());
    expect(user.username).toEqual(httpResult.username);
  })
})
