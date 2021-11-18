import { atom } from 'recoil';

import { UserModel } from '@/domain/models';

export const userState = atom({
  key: 'userState',
  default: {
    getUser: null as () => UserModel,
    setUser: null as (user: UserModel) => void,
  },
});
