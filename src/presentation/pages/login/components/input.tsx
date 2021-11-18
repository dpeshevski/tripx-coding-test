import React from 'react';
import { useRecoilState } from 'recoil';

import { InputComponent } from '@/presentation/components';
import { loginState } from './atoms';


type Props = {
  type: string
  name: string
  placeholder: string
}

const Input: React.FC<Props> = ({ type, name, placeholder }: Props) => {
  const [state, setState] = useRecoilState(loginState)
  return (
    <InputComponent
      type={type}
      name={name}
      placeholder={placeholder}
      state={state}
      setState={setState}
    />
  )
}

export default Input