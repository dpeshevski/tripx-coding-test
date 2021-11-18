import { UserModel } from '@/domain/models';

import { makeLocalStorageAdapter } from '@/main/factories/cache';

export const getUserAdapter = (): UserModel => {
  return makeLocalStorageAdapter().get('user');
}

export const setUserAdapter = (user: UserModel): void => {
  makeLocalStorageAdapter().set('user', user);
}
