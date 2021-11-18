import { createMemoryHistory, MemoryHistory } from 'history'

type SutTypes = {
  history: MemoryHistory
}

const makeSut = (): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/destinations'] })
  return {
    history,
  }
}

describe('Header Component', () => {
  test('Should render destinations page correctly', () => {
    const { history } = makeSut()

    expect(history.location.pathname).toBe('/destinations')
  })
})