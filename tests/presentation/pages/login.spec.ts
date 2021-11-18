
import { createMemoryHistory } from 'history';
import faker from 'faker';
import { fireEvent, waitFor, screen } from '@testing-library/react';
import { Login } from '@/presentation/pages';
import { InvalidCredentialsError } from '@/domain/errors';
import { Authentication } from '@/domain/usecases';
import { ValidationStub, FormHelper, renderWithHistory } from '@/tests/presentation/mocks';
import { AuthenticationSpy } from '@/tests/domain/mocks'

type SutTypes = {
  authenticationSpy: AuthenticationSpy
  setUserMock: (user: Authentication.Model) => void
}

type SutParams = {
  validationError: string;
}

const history = createMemoryHistory({ initialEntries: ['/login'] });

const makeSut = (params?: SutParams): SutTypes => {
  const validationStub = new ValidationStub();
  validationStub.errorMessage = params?.validationError;

  const authenticationSpy = new AuthenticationSpy();
  const { setUserMock } = renderWithHistory({
    history,
    Page: () => Login({ validation: validationStub, authentication: authenticationSpy })
  })
  return {
    authenticationSpy,
    setUserMock
  }
}

const simulateValidSubmit = async (username = faker.internet.userName(), password = faker.internet.password()): Promise<void> => {
  FormHelper.populateField('username', username);
  FormHelper.populateField('password', password);

  const form = screen.getByTestId('form');
  fireEvent.submit(form);
  
  await waitFor(() => form);
}

describe('Login Component', () => {
  test('Should start with initial state', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    expect(screen.getByTestId('error-wrap').children).toHaveLength(0);
    expect(screen.getByTestId('submit')).toBeDisabled();
    FormHelper.testStatusForField('username', validationError);
    FormHelper.testStatusForField('password', validationError);
  })

  test('Should show username error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.populateField('username');

    FormHelper.testStatusForField('username', validationError);
  })

  test('Should show password error if Validation fails', () => {
    const validationError = faker.random.words();
    makeSut({ validationError });

    FormHelper.populateField('password');

    FormHelper.testStatusForField('password', validationError);
  })

  test('Should show valid username state if Validation succeeds', () => {
    makeSut();

    FormHelper.populateField('username');

    FormHelper.testStatusForField('username');
  })

  test('Should show valid password state if Validation succeeds', () => {
    makeSut();

    FormHelper.populateField('password');

    FormHelper.testStatusForField('password');
  })

  test('Should enable submit button if form is valid', () => {
    makeSut();

    FormHelper.populateField('username');
    FormHelper.populateField('password');

    expect(screen.getByTestId('submit')).toBeEnabled();
  })

  test('Should show spinner on submit', async () => {
    makeSut();

    await simulateValidSubmit();

    expect(screen.queryByTestId('spinner')).toBeInTheDocument();
  })

  test('Should call Authentication with correct values', async () => {
    const { authenticationSpy } = makeSut()
    const username = faker.internet.userName()
    const password = faker.internet.password()
    const attempts = 1;
    await simulateValidSubmit(username, password);

    expect(authenticationSpy.params).toEqual({ username, password, attempts });
  })

  test('Should call Authentication only once', async () => {
    const { authenticationSpy } = makeSut();

    await simulateValidSubmit();
    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(1);
  })

  test('Should not call Authentication if form is invalid', async () => {
    const validationError = faker.random.words();
    const { authenticationSpy } = makeSut({ validationError });

    await simulateValidSubmit();

    expect(authenticationSpy.callsCount).toBe(0);
  })

  test('Should present error if Authentication fails', async () => {
    const { authenticationSpy } = makeSut();
    const error = new InvalidCredentialsError();
    jest.spyOn(authenticationSpy, 'auth').mockRejectedValueOnce(error);

    await simulateValidSubmit();

    expect(screen.getByTestId('main-error')).toHaveTextContent(error.message);
    expect(screen.getByTestId('error-wrap').children).toHaveLength(1);
  })

  test('Should call UpdateUserState on success', async () => {
    const { authenticationSpy, setUserMock } = makeSut();

    await simulateValidSubmit();

    expect(setUserMock).toHaveBeenCalledWith(authenticationSpy.user);
    expect(history.length).toBe(1);
    expect(history.location.pathname).toBe('/destinations');
  })
})
