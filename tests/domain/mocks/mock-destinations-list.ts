import { GetDestinationsList } from '@/domain/usecases';



export const mockGetDestinationsListModel = (): GetDestinationsList.Model[] => ([
  {
    "name":"Albanien",
    "slug":"\/resa-till\/albania",
    "code":"AL",
    "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2020\/01\/albanien1.jpg?auto=format",
    "countHotels":7,
    "countDestinations":1,
    "destinations":[
      {
        "name":"Tirana",
        "slug":"\/resa-till\/albania\/tirana",
        "code":"TIA",
        "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2020\/02\/tirana3.jpg?auto=format",
        "countHotels":7,
        "alias":["tirana","tia","albanien"]
      }
    ]
  },
  {
    "name":"Belgien",
    "slug":"\/resa-till\/belgium",
    "code":"BE",
    "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2017\/05\/belgium1.jpg?auto=format",
    "countHotels":24,
    "countDestinations":1,
    "destinations":[
      {
        "name":"Bryssel",
        "slug":"\/resa-till\/belgium\/brussels",
        "code":"BRU",
        "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2017\/05\/bryssel4.jpg?auto=format",
        "countHotels":24,
        "alias":["bryssel","bru","belgien"]
      }
    ]
  },
  {
    "name":"Bulgarien",
    "slug":"\/resa-till\/bulgarien",
    "code":"BG",
    "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2015\/11\/bulgarien2.jpg?auto=format",
    "countHotels":6,
    "countDestinations":1,
    "destinations":[
      {
        "name":"Sofia",
        "slug":"\/resa-till\/bulgarien\/sofia",
        "code":"SOF",
        "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2018\/03\/sofia13.jpg?auto=format",
        "countHotels":6,
        "alias":["sofia","sof","bulgarien"]
      }
    ]
  },
  {
    "name":"Cypern",
    "slug":"\/resa-till\/cypern",
    "code":"CY",
    "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2015\/11\/cypern1.jpg?auto=format",
    "countHotels":32,
    "countDestinations":1,
    "destinations":[
      {
        "name":"Larnaca",
        "slug":"\/resa-till\/cypern\/larnaca",
        "code":"LCA",
        "thumbnail":"https:\/\/tripx-wp.imgix.net\/3\/2017\/04\/gallery_cyprus-cyprus-nissi-beach_beach_0283397.jpg?auto=format",
        "countHotels":32,
        "alias":["larnaca","lca","cypern","ayia napa","protaras","fig tree bay","larnaca"]
      }
    ]
  },
]);

export class GetDestinationListSpy implements GetDestinationsList {
  destinationsList = mockGetDestinationsListModel();
  callsCount = 0;

  async getDestinationsList (): Promise<GetDestinationsList.Model[]> {
    this.callsCount++;
    return this.destinationsList;
  }
}
