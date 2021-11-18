import { loginState } from './atoms';
import { FormStatusComponent } from '@/presentation/components';

import { useRecoilValue } from 'recoil';
import React from 'react';

const FormStatus: React.FC = () => {
  const state = useRecoilValue(loginState);
  return (
    <FormStatusComponent state={state} />
  )
}

export default FormStatus;