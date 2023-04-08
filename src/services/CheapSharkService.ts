import type { Game } from "@/types/Game";
import type { GameDeal } from "@/types/GameDeal";
import client from "./AxiosClient";

export class CheapSharkService {
    public async getDeals(): Promise<GameDeal[]> {
        const response = await client.get("/deals");
        return response.data;
    }

    public async getGame(gameId: string): Promise<Game> {
        const response = await client.get(`/games?id=${gameId}`);
        return response.data[0];
    }
}

