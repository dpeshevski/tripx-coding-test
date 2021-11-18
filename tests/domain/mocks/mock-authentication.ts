import { Authentication } from '@/domain/usecases'
import { mockUserModel } from '@/tests/domain/mocks'

import faker from 'faker'

export const mockAuthenticationParams = (): Authentication.Params => ({
  username: 'tripx',
  password: faker.internet.password(),
  attempts: 2
})

export const mockAuthenticationModel = (): Authentication.Model => mockUserModel()

export class AuthenticationSpy implements Authentication {
  user = mockAuthenticationModel();
  params: Authentication.Params;
  callsCount = 0;

  async auth (params: Authentication.Params): Promise<Authentication.Model> {
    this.params = params;
    this.callsCount++;
    // this.params.attempts++;
    // if (this.params.attempts >= 4) {
      // return;
    // }
    return this.user;
  }
}
