import { RemoteAuthentication } from '@/data/usecases';
import { Authentication } from '@/domain/usecases';
import { makeTestApiUrl, makeAxiosHttpClient} from '@/main/factories/http';

export const makeRemoteAuth = (): Authentication =>
  new RemoteAuthentication(makeTestApiUrl('/login'), makeAxiosHttpClient());
