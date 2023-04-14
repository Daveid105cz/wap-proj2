export interface Game {
    info: {
      title: string;
      steamAppID: string;
      thumb: string;
    };
    cheapestPriceEver: {
      price: string;
      date: number;
    };
    deals: {
      storeID: number;
      dealID: string;
      price: string;
      retailPrice: string;
      savings: string;
    }[];
  }
  