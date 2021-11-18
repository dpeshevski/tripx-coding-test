import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import { setUserAdapter, getUserAdapter } from '@/main/adapters';
import { makeLogin, makeDestinationsList } from '@/main/factories/pages';
import { PrivateRoute } from '@/main/proxies';

import { userState } from '@/presentation/components';

const Router: React.FC = () => {
  const state = {
    getUser: getUserAdapter,
    setUser: setUserAdapter,
  }

  return (
    <RecoilRoot initializeState={({ set }) => set(userState, state)}>
      <BrowserRouter>
        <Switch>
          <Redirect exact from="/" to="/destinations" />
          <Route path="/login" exact component={makeLogin} />
          <PrivateRoute path="/" exact component={makeDestinationsList} />
          <PrivateRoute path="/destinations" exact component={makeDestinationsList} />
        </Switch>
      </BrowserRouter>
    </RecoilRoot>
  )
}

export default Router;