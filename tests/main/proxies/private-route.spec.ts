import { createMemoryHistory, MemoryHistory } from 'history';

import { PrivateRoute } from '@/main/proxies';

import { renderWithHistory } from '@/tests/presentation/mocks';
import { mockUserModel } from '@/tests/domain/mocks';

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (user = mockUserModel()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/'] });

  renderWithHistory({ history, Page: PrivateRoute, user });

  return { history };
}

describe('PrivateRoute', () => {
  test('Should redirect to /login if username is empty', () => {
    const { history } = makeSut(null);

    expect(history.location.pathname).toBe('/login');
  })

  test('Should render current component if username is not empty', () => {
    const { history } = makeSut();

    expect(history.location.pathname).toBe('/');
  })
})
