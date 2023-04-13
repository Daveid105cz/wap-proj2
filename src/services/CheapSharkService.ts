import type { Game } from "@/types/Game";
import type { GameDeal } from "@/types/GameDeal";
import { SortBy, SortOrder, type SearchFilter } from "@/types/SearchFilter";
import client from "./AxiosClient";


export class CheapSharkService {
    public async getDeals(query: string, 
                filter: SearchFilter, sortBy: SortBy , 
                sortOrder: SortOrder, page: number = 0, 
                pageSize: number = 60 
            ): Promise<GameDeal[]> {
        const paramsObject = {
            ...filter,
            title: query,
            sortBy: sortBy,
            pageNumber: page,
            pageSize: pageSize,
            desc: (sortOrder === SortOrder.Ascending) ? 1 : 0
        };

        const response = await client.get(`/deals`, { params: paramsObject });
        return response.data;
    }

    public async getGame(gameId: string): Promise<Game> {
        const response = await client.get(`/games?id=${gameId}`);
        return response.data[0];
    }
}

const cheapSharkService = new CheapSharkService();
export default cheapSharkService;