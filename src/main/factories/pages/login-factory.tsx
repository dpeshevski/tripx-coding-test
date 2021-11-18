import React from 'react';

import { makeRemoteAuth } from '@/main/factories/usecases';
import { makeLoginValidation } from '@/main/factories/validation';
import { Login } from '@/presentation/pages';

export const makeLogin: React.FC = () => {
  return (
    <Login
      authentication={makeRemoteAuth()}
      validation={makeLoginValidation()}
    />
  )
}
