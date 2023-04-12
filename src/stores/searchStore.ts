import { ref, computed } from 'vue'
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

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        isLoading: false,
        searchQuery: "" as string,
        filter: {} as SearchFilter,
        deals: [] as GameDeal[],
        page: 1,
        totalCount: 0,
        pageSize: 40
    }),
    actions: {
        async search() {
            this.isLoading = true;
            const gameDeals = await apiService.getDeals(this.searchQuery, this.filter);
            this.deals = gameDeals;
            this.isLoading = false;
        }
    },
    getters: {
        groupedDeals():GroupedDeal[]{
            return this.deals.reduce((acc: GroupedDeal[], deal: GameDeal) => {
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
