import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import { SortBy, SortOrder, type SearchFilter } from '@/types/SearchFilter';
import type { GameStore } from '@/types/GameStore';

interface GroupedDeal {
    id: number;
    title: string;
    thumbnail: string;
    deals: GameDeal[];
};

interface Filtering {
    lowerPrice: number;
    upperPrice: number;
    metacritic: number;
    steamRating: number
}

export const useSearchStore = defineStore({
    id: 'search',
    state: () => ({
        isLoading: false,
        searchQuery: "" as string,
        filter: { lowerPrice:0, upperPrice: 50, metacritic:0, steamRating: 0 } as Filtering,
        sortBy: SortBy.DealRating,
        sortOrder: SortOrder.Ascending,
        deals: [] as GameDeal[],
        page: 0,
        totalCount: 0,
        pageSize: 60,
        selectedStore: null as number | null,
        stores: [] as GameStore[]
    }),
    actions: {
        async loadStores(){
            this.stores = await apiService.getStores();
        },
        async search() {
            // this.deals = [];
            this.isLoading = true;
            const loadFilter: SearchFilter = {...this.filter};
            if (this.selectedStore)
                loadFilter.storeID = this.selectedStore;
            const gameDeals = await apiService.getDeals(this.searchQuery,loadFilter, this.sortBy, this.sortOrder, this.page, this.pageSize);
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
