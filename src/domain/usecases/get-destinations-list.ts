import { GetDestinationModel } from '@/domain/models';

export interface GetDestinationsList {
  getDestinationsList: () => Promise<GetDestinationsList.Model[]>
}

export namespace GetDestinationsList {
  export type Model = GetDestinationModel;
}