import { atom } from 'recoil';

import { GetDestinationsList } from '@/domain/usecases';

const state = {
  key: 'getDestinationsListState',
  default: {
    destinations: [] as GetDestinationsList.Model[],
    error: '',
    reload: false,
    isLoading: false
  }
}

export const getDestinationsListState = atom(state);