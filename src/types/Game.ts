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
      storeID: string;
      dealID: string;
      price: string;
      retailPrice: string;
      savings: string;
    }[];
  }
  