import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import { buildQueryParamsFromAllFilters, SortBy, SortOrder, type SearchFilter } from '@/types/SearchFilter';
import type { GameStore } from '@/types/GameStore';

interface GroupedDeal {
    id: number;
    title: string;
    thumbnail: string;
    deals: GameDeal[];
    metacritic: number;
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
        sortOrder: SortOrder.Descending,
        deals: [] as GameDeal[],
        page: 0,
        knowPagesCount: 1,
        pageSize: 60,
        selectedStore: null as number | null,
        stores: [] as GameStore[]
    }),
    actions: {
        async loadStores(){
            if (this.stores.length > 0)
                return;
            this.stores = await apiService.getStores();
        },
        async search(resetPages: boolean = true) {
            if (resetPages){
                this.page = 0;
                this.knowPagesCount = 1;
            }
            
            this.isLoading = true;
            const loadFilter: SearchFilter = {...this.filter};
            if (this.selectedStore)
                loadFilter.storeID = this.selectedStore;
            const gameDeals = await apiService.getDeals(this.searchQuery,loadFilter, this.sortBy, this.sortOrder, this.page, this.pageSize);
            this.deals = gameDeals;
            this.isLoading = false;
        },
        async goNextPage(){
            console.log("Going to next page");
            this.page++;
            await this.search(false);
            if(this.deals.length !== 0)
                this.knowPagesCount = this.page+1;
        },
        async goPage(page: number){
            console.log("Going to page: "+page);
            if(page < 0 || page >= this.knowPagesCount)
                return;
            this.page = page;
            await this.search(false);
        },
        setPage(page: number){
            this.page = page;
            this.knowPagesCount = page+1;
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
                        metacritic: deal.metacriticScore,
                        deals: [deal]
                    });
                }
                return acc;
            }, []);
        },
        urlQuery(): any {
            return buildQueryParamsFromAllFilters(this.searchQuery, this.filter, this.sortBy, this.sortOrder, this.page, this.selectedStore);
        }
    }
});
