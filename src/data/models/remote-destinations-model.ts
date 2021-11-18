export type RemoteDestinationModel = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  countDestinations: number;
  destinations: RemoteDestinationsModel[];
}

export type RemoteDestinationsModel = {
  name: string;
  slug: string;
  code: string;
  thumbnail: string;
  countHotels: number;
  alias : string[];
}
