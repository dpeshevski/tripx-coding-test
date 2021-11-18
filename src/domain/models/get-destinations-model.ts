export type GetDestinationModel = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  countDestinations: number;
  destinations: GetDestinationsModel[];
}

export type GetDestinationsModel = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  alias : string[];
}
