import { UserModel } from '@/domain/models';

export interface Authentication {
  auth: (params: Authentication.Params) => Promise<Authentication.Model>
}

export namespace Authentication {
  export type Params = {
    username: string
    password: string,
    attempts: number
  }

  export type Model = UserModel;
}
