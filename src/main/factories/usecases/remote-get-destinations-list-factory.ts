import { makeApiUrl } from '@/main/factories/http';
import { makeHttpClientDecorator } from '@/main/factories/decorators';

import { RemoteGetDestinationsList } from '@/data/usecases';
import { GetDestinationsList } from '@/domain/usecases';

export const makeRemoteGetDestinationsList = (): GetDestinationsList =>
  new RemoteGetDestinationsList(makeApiUrl('/destinations'), makeHttpClientDecorator());
