export interface Game {
    info: {
      title: string;
      gameID: number;
      steamAppID: number;
      thumb: string;
    };
    cheapestPriceEver: {
      price: string;
      date: number;
    };
    deals: {
      storeID: number;
      dealID: number;
      price: string;
      retailPrice: string;
      savings: string;
    }[];
  }
  