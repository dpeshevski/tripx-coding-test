import React from 'react';

import { makeRemoteGetDestinationsList } from '@/main/factories/usecases';
import { DestinationsList } from '@/presentation/pages';

export const makeDestinationsList: React.FC = () => {
  return (
    <DestinationsList destinationsList={makeRemoteGetDestinationsList()}/>
  )
}