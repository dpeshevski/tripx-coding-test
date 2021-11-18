import { atom } from 'recoil';

export const loginState = atom({
  key: 'loginState',
  default: {
    isLoading: false,
    isFormInvalid: true,
    username: '',
    password: '',
    usernameError: '',
    passwordError: '',
    mainError: '',
    attempts: 1,
  }
})
