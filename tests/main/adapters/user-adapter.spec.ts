import { setUserAdapter, getUserAdapter } from '@/main/adapters';
import { LocalStorageAdapter } from '@/infra/cache';
import { mockUserModel } from '@/tests/domain/mocks';

jest.mock('@/infra/cache/local-storage-adapter')

describe('UserAdapter', () => {
  test('Should call LocalStorageAdapter.set with correct values', () => {
    const user = mockUserModel();
    const setSpy = jest.spyOn(LocalStorageAdapter.prototype, 'set');

    setUserAdapter(user);

    expect(setSpy).toHaveBeenCalledWith('user', user);
  })

  test('Should call LocalStorageAdapter.get with correct value', () => {
    const user = mockUserModel();
    const getSpy = jest.spyOn(LocalStorageAdapter.prototype, 'get').mockReturnValueOnce(user);

    const result = getUserAdapter();

    expect(getSpy).toHaveBeenCalledWith('user');
    expect(result).toEqual(user);
  })
})
