import { userState } from '@/presentation/components'

import { useHistory } from 'react-router-dom'
import { useRecoilValue } from 'recoil'

type ResultType = () => void

export const useLogout = (): ResultType => {
  const history = useHistory();
  const { setUser } = useRecoilValue(userState);
  
  return (): void => {
    setUser(undefined);
    history.replace('/login');
  }
}
