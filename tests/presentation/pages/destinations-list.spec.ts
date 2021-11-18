import { createMemoryHistory, MemoryHistory } from 'history';
import { screen, waitFor, fireEvent, cleanup } from '@testing-library/react';

import { DestinationsList } from '@/presentation/pages';
import { UnexpectedError } from '@/domain/errors';
import { UserModel } from '@/domain/models'

import { GetDestinationListSpy } from '@/tests/domain/mocks';
import { renderWithHistory } from '@/tests/presentation/mocks'

type SutTypes = {
  getDestinationsList: GetDestinationListSpy,
  history: MemoryHistory,
  setUserMock: (user: UserModel) => void
}

const makeSut = (getDestinationsList = new GetDestinationListSpy()): SutTypes => {
  const history = createMemoryHistory({ initialEntries: ['/', '/destinations'] })
  
  const { setUserMock } = renderWithHistory({
    history,
    Page: () => DestinationsList({ destinationsList: getDestinationsList })
  })

  return {
    getDestinationsList,
    history,
    setUserMock
  }
}

describe('DestinationsList Component', () => {
  test('Should call GetDestinationsList', async () => {
    const { getDestinationsList } = makeSut()

    expect(getDestinationsList.callsCount).toBe(1)
  })

  test('Should render DestinationItem on success', async () => {
    makeSut()
    const destinationsList = screen.getByTestId('destinations-list')
    await waitFor(() => destinationsList)
    
    expect(screen.queryByTestId('loading')).not.toBeInTheDocument()

    expect(destinationsList.querySelectorAll('li.destinationItemContainer')).toHaveLength(4);
    expect(screen.queryByTestId('error')).not.toBeInTheDocument();
  })

  test('Should render error on UnexpectedError', async () => {
    const getDestinationsListSpy = new GetDestinationListSpy();
    const error = new UnexpectedError();

    jest.spyOn(getDestinationsListSpy, 'getDestinationsList').mockRejectedValueOnce(error);
    makeSut(getDestinationsListSpy);
    await waitFor(() => screen.getByTestId('destinations-list'))

    expect(screen.getByTestId('error')).toHaveTextContent(error.message)
  })

  test('Should call GetDestinationsList on reload', async () => {
    const getDestinationsListSpy = new GetDestinationListSpy();

    jest.spyOn(getDestinationsListSpy, 'getDestinationsList').mockRejectedValueOnce(new UnexpectedError());
    makeSut(getDestinationsListSpy);

    await waitFor(() => screen.getByTestId('destinations-list'))

    fireEvent.click(screen.getByTestId('reload'))

    expect(getDestinationsListSpy.callsCount).toBe(1)
    
    await waitFor(() => screen.getByTestId('destinations-list'))
  })
})