import React from "react";

import useStyles from './spinner-styles.scss';

type Props = React.HTMLAttributes<HTMLElement> & {
  isNegative?: boolean;
}

const Spinner: React.FC<Props> = ({ isNegative, ...props }: Props) => {
  const negativeClass = isNegative ? useStyles.negative : '';
  
  return (
    <div {...props} data-testid="spinner" className={[useStyles.spinner, negativeClass, props.className].join(' ')}>
      <div /><div /><div /><div />
    </div>
  )
}

export default Spinner;