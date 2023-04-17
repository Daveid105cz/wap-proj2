import type { Game } from "@/types/Game";
import type { GameDeal } from "@/types/GameDeal";
import type { GameStore } from "@/types/GameStore";
import { SortBy, SortOrder, type SearchFilter } from "@/types/SearchFilter";
import client from "./AxiosClient";

function mapGameObject(info: any, cheapestPriceEver: any, deals: any, gameId: number): Game {
  return {
    info: {
      title: info.title,
      gameID: gameId,
      steamAppID: info.steamAppID,
      thumb: info.thumb
    },
    cheapestPriceEver: {
      price: cheapestPriceEver.price,
      date: cheapestPriceEver.date
    },
    deals: deals.map((deal: any) => ({
      storeID: deal.storeID,
      dealID: deal.dealID,
      price: deal.price,
      retailPrice: deal.retailPrice,
      savings: deal.savings
    }))
  };
}

export class CheapSharkService {
    public async getDeals(query: string = "", 
                filter: SearchFilter = {}, sortBy?: SortBy , 
                sortOrder?: SortOrder, page: number = 0, 
                pageSize: number = 60 
            ): Promise<GameDeal[]> {
        // const sortOrderInvertedIfTitle = (sortBy === SortBy.Title) ? !sortOrder : sortOrder;
        console.log("Sorting order: "+sortOrder);
        const descParamater = (sortOrder === SortOrder.Ascending) ? 1 : 0;
        console.log("Desc parameter: "+descParamater);
        const paramsObject = {
            ...filter,
            title: query,
            sortBy: sortBy,
            pageNumber: page,
            pageSize: pageSize,
            desc: descParamater
        };

        const response = await client.get(`/deals`, { params: paramsObject });
        return response.data;
    }

    public async getGame(gameId: string): Promise<Game> {
        const response = await client.get(`/games?id=${gameId}`);
        const { info, cheapestPriceEver, deals } = response.data;
        return mapGameObject(info, cheapestPriceEver, deals, Number(gameId));
      }


    public async getStores(): Promise<GameStore[]> {
        const response = await client.get(`/stores`);
        return response.data;
    }

    public async getGamesByIds(gameIds: number[]): Promise<Game[]> {
        const response = await client.get(`/games?ids=${gameIds.join(",")}`);
        //the response is an object with the game id as the property names
        //so we need to convert it to an array
        const games = Object.keys(response.data);
        return games.map((gameId: string) => {
            const { info, cheapestPriceEver, deals } = response.data[gameId];
            return mapGameObject(info, cheapestPriceEver, deals, Number(gameId));
        });
    }
}

const cheapSharkService = new CheapSharkService();
export default cheapSharkService;