import React, { memo } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilValue } from 'recoil'

import { Logo, userState } from '@/presentation/components';
import { useLogout } from '@/presentation/hooks'

import useStyles from './header-styles.scss';

const Header: React.FC = () => {
  const logout = useLogout()
  const { getUser } = useRecoilValue(userState);
  const buttonClick = (event: React.MouseEvent<HTMLAnchorElement, MouseEvent>): void => {
    event.preventDefault();
    logout();
  }
  return (
    <header className={useStyles.headerWrap}>
      <div className={useStyles.headerContent}>
        <Link to="/destinations">
          <Logo />
        </Link>
        {
          getUser()?.username && 
            <React.Fragment>
              <span className={useStyles.userInfo}>Welcome, {getUser().username}! </span>
              <div className={useStyles.logoutWrap}>
                <a data-testid="logout" href="#" onClick={buttonClick}>Logout</a>
              </div>
            </React.Fragment>
        }
      </div>
    </header>
  )
  
}
const memoizedHeader = memo(Header);
export default memoizedHeader;