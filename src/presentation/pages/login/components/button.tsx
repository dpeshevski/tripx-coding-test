import React from 'react';
import { useRecoilValue } from 'recoil';

import { ButtonComponent } from '@/presentation/components';

import { loginState } from './atoms';

type Props = {
  text: string
}

const LoginButtonComponent: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(loginState);

  return (
    <ButtonComponent text={text} state={state} />
  )
}

export default LoginButtonComponent;
