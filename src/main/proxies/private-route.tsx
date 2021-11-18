import React from 'react';
import { useRecoilValue } from 'recoil';
import { RouteProps, Route, Redirect } from 'react-router-dom';

import { userState } from '@/presentation/components';

const PrivateRoute: React.FC<RouteProps> = (props: RouteProps) => {
  const { getUser } = useRecoilValue(userState);
  return getUser()?.username
    ? <Route {...props} />
    : <Route {...props} component={() => <Redirect to='/login' />} />
}

export default PrivateRoute;
