import React from 'react';
import { MutableSnapshot, RecoilRoot, RecoilState } from 'recoil';
import { Router } from 'react-router-dom';
import { MemoryHistory } from 'history';
import { render } from '@testing-library/react';

import { UserModel } from '@/domain/models';
import { userState } from '@/presentation/components';
import { mockUserModel } from '@/tests/domain/mocks';


type Params = {
  Page: React.FC;
  history: MemoryHistory;
  user?: UserModel;
  states?: Array<{ atom: RecoilState<any>, value: any }>;
}

type Result = {
  setUserMock: (user: UserModel) => void
}

export const renderWithHistory = ({ Page, history, user = mockUserModel(), states = [] }: Params): Result => {
  const setUserMock = jest.fn();
  
  const mockedState = {
    setUser: setUserMock,
    getUser: () => user
  }
  
  const initializeState = ({ set }: MutableSnapshot): void => {
    [...states, { atom: userState, value: mockedState }].forEach(state => set(state.atom, state.value))
  }
  render(
    <RecoilRoot initializeState={initializeState}>
      <Router history={history}>
        <Page />
      </Router>
    </RecoilRoot>
  )
  return {
    setUserMock
  }
}
