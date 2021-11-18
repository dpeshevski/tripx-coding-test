import React, { memo } from 'react';

import useStyles from './footer-styles.scss';

const Footer: React.FC = () => {
  return (
    <footer className={useStyles.footer}> 
      <span>Created by Daniel Peshevski</span>
      <a href="https://github.com/dpeshevski">GitHub Profile</a>
      <a href="https://www.linkedin.com/in/daniel-peshevski-28a40091/" > LinkedIn </a>
    </footer>
  )
}

const MemoizedFooter = memo(Footer);
export default MemoizedFooter;