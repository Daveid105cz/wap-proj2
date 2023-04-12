import type { Game } from "@/types/Game";
import type { GameDeal } from "@/types/GameDeal";
import type { SearchFilter } from "@/types/SearchFilter";
import client from "./AxiosClient";


export class CheapSharkService {
    public async getDeals(query: string, filter: SearchFilter): Promise<GameDeal[]> {
        const response = await client.get(`/deals?title=${query}`, { params: filter });
        // const response = await client.get("/deals");
        return response.data;
    }

    public async getGame(gameId: string): Promise<Game> {
        const response = await client.get(`/games?id=${gameId}`);
        return response.data[0];
    }
}

const cheapSharkService = new CheapSharkService();
export default cheapSharkService;