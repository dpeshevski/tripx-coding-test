import React from 'react';

import { Spinner } from '@/presentation/components';

import useStyles from './form-status-styles.scss'

type Props = {
  state: any
}

const Form: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state;
  return (
    <div data-testid="error-wrap" className={useStyles.errorWrap}>
      {isLoading && <Spinner className={useStyles.spinner} />}
      {mainError && <span data-testid="main-error" className={useStyles.error}>{mainError}</span>}
    </div>
  )
}

export default Form;
