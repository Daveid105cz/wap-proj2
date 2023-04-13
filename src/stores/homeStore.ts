import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import type { SearchFilter } from '@/types/SearchFilter';

interface GroupedDeal {
    id: string;
    title: string;
    thumbnail: string;
    deals: GameDeal[];
};

export const useHomeStore = defineStore({
    id: 'home',
    state: () => ({
        isLoading: false,
        filter: {} as SearchFilter,
        deals: [] as GameDeal[],
        groupedDeals: [] as GroupedDeal[],
        page: 1,
        totalCount: 0,
        pageSize: 40
    }),
    actions: {
        async fetchDeals() {
            this.isLoading = true;
            const gameDeals = await apiService.getDeals("", this.filter);
            this.deals = gameDeals;
            this.groupedDeals = this.groupDeals(gameDeals);
            this.isLoading = false;
        },
        groupDeals(deals: GameDeal[]): GroupedDeal[] {
            return deals.reduce((acc: GroupedDeal[], deal: GameDeal) => {
                const game = acc.find(x => x.id === deal.gameID);
                if (game)
                    game.deals.push(deal);
                else {
                    acc.push({
                        id: deal.gameID,
                        title: deal.title,
                        thumbnail: deal.thumb,
                        deals: [deal]
                    });
                }
                return acc;
            }, []);
        }
    }
});
