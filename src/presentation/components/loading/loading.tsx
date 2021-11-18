import React from 'react';

import { Spinner } from '@/presentation/components';

import useStyles from './loading-styles.scss';

const Loading: React.FC = () => {
  return (
    <div data-testid="loading" className={useStyles.loadingWrap}>
      <div className={useStyles.loading}>
        <span>Loading...</span>
        <Spinner isNegative />
      </div>
    </div>
  )
}

export default Loading;