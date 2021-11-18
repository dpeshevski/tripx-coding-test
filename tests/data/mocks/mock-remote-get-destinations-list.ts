import faker from 'faker';

import { RemoteGetDestinationsList } from '@/data/usecases';

export const mockRemoteGetDestinationsModel = (): RemoteGetDestinationsList.Model => ({
  name: faker.random.word(),
  slug: faker.random.word(),
  code: faker.address.countryCode(),
  thumbnail: faker.image.imageUrl(),
  countHotels: faker.datatype.number(),
  countDestinations: faker.datatype.number(),
  destinations:  [
    {
      name: faker.random.word(),
      slug: faker.random.word(),
      code: faker.address.countryCode(),
      thumbnail: faker.image.imageUrl(),
      countHotels: faker.datatype.number(),
      alias: [],
    }
  ]
})

export const mockRemoteGetDestinationsListModel = (): RemoteGetDestinationsList.Model[] => ([
  mockRemoteGetDestinationsModel(),
  mockRemoteGetDestinationsModel(),
  mockRemoteGetDestinationsModel(),
  mockRemoteGetDestinationsModel()
])