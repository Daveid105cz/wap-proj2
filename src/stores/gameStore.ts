import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import type { Game } from '@/types/Game';
import type { GameStore } from '@/types/GameStore';
import { SortBy, SortOrder, type SearchFilter } from '@/types/SearchFilter';


interface GroupedDeal {
    id: number;
    title: string;
    thumbnail: string;
    deals: GameDeal[];
};

interface GroupedDealByGame {
    gameID: number;
    deals: GameDeal[];
};

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        isLoading: false,
        game: {} as Game,
        sortBy: SortBy.DealRating,
        sortOrder: SortOrder.Ascending,
        dealsByGame: [] as GameDeal[],
        groupedDealsByGame: [] as GroupedDealByGame[],
        page: 1,
        totalCount: 0,
        pageSize: 40,
        stores: [] as GameStore[]
    }),
    actions: {
        async loadStores(){
            this.stores = await apiService.getStores();
        },
        async fetchGame(id: string) {
            this.isLoading = true;
            this.game = await apiService.getGame(id);
            this.isLoading = false;
        },
        async fetchDealsByGame() {
            this.isLoading = true;
            const dealsByGame = await apiService.getDeals();
            this.dealsByGame = dealsByGame;
            this.groupedDealsByGame = this.groupDealsByStore(dealsByGame);
            this.isLoading = false;
        },

        groupDealsByStore(deals: GameDeal[]): GroupedDealByGame[] {
            return deals.reduce((acc: GroupedDealByGame[], deal: GameDeal) => {
                const store = acc.find(x => x.gameID === deal.gameID);
                if (store)
                    store.deals.push(deal);
                else {
                    acc.push({
                        gameID: deal.gameID,
                        deals: [deal]
                    });
                }
                return acc;
            }, []);
        }
        
        
    }
});
