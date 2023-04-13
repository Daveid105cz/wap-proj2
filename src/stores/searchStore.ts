import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import { SortBy, SortOrder, type SearchFilter } from '@/types/SearchFilter';

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
        sortBy: SortBy.Recent,
        sortOrder: SortOrder.Ascending,
        deals: [] as GameDeal[],
        page: 0,
        totalCount: 0,
        pageSize: 60
    }),
    actions: {
        async search() {
            this.isLoading = true;
            const gameDeals = await apiService.getDeals(this.searchQuery,this.filter, this.sortBy, this.sortOrder, this.page, this.pageSize);
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
