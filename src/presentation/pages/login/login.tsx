import React, { useEffect } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil';

import { Authentication } from '@/domain/usecases';
import { Footer, Header, userState } from '@/presentation/components';
import { Validation } from '@/presentation/protocols';
import { loginState, InputComponent, ButtonComponent, FormStatus } from './components';

import useStyles from './login-styles.scss';

type Props = {
  validation: Validation,
  authentication: Authentication
}

const Login: React.FC<Props> = ({ validation, authentication }: Props) => {
  const resetLoginState = useResetRecoilState(loginState);
  const { setUser } = useRecoilValue(userState);
  const history = useHistory();
  const [state, setState] = useRecoilState(loginState);

  useEffect(() => resetLoginState(), []);
  useEffect(() => validate('username'), [state.username]);
  useEffect(() => validate('password'), [state.password]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setState(state => ({ ...state, attempts: 1, mainError: '' }))
    }, 30 * 1000);

    return () => clearTimeout(timeout)

  }, [state.attempts === 3]);

  const validate = (field: string): void => {
    const { username, password } = state;
    const formData = { username, password };

    setState(state => ({ ...state, [`${field}Error`]: validation.validate(field, formData) }))
    setState(state => ({ ...state, isFormInvalid: !!state.usernameError || !!state.passwordError }))
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>): Promise<void> => {
    setState(state => ({ ...state, attempts: state.attempts + 1 }))

    event.preventDefault();

    try {
      if (state.isLoading || state.isFormInvalid || state.attempts >= 4) {
        return;
      }
      setState(state => ({ ...state, isLoading: true }));

      const user = await authentication.auth({
        username: state.username,
        password: state.password,
        attempts: state.attempts
      });

      setUser(user);
      history.replace('/destinations');
    } catch (error) {
      setState(state => ({
        ...state,
        isLoading: false,
        mainError: error.message,
        attempts: state.attempts
      }));
    }
  }

  return (
    <div className={useStyles.loginWrap}>
      <Header />
      <form data-testid="form" onSubmit={handleSubmit} className={useStyles.form}>
        <h2>Login</h2>
        <InputComponent type="text" name="username" placeholder="Type your username" />
        <InputComponent type="password" name="password" placeholder="Type your password" />
        <ButtonComponent text="Login" />
        <FormStatus />
      </form>
      <Footer />
    </div>
  )
}

export default Login;
