import { IDestinations } from './destinations';

export interface IDestination {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  countDestinations: number;
  destinations: IDestinations[];
}