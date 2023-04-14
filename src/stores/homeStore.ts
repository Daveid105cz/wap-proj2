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

interface GroupedDealByStore {
    storeID: number;
    deals: GameDeal[];
};

export const useHomeStore = defineStore({
    id: 'home',
    state: () => ({
        isLoading: false,
        filter: {} as SearchFilter,
        sortBy: SortBy.DealRating,
        sortOrder: SortOrder.Ascending,
        deals: [] as GameDeal[],
        dealsByStore: [] as GameDeal[],
        groupedDeals: [] as GroupedDeal[],
        groupedDealsBystore: [] as GroupedDealByStore[],
        page: 1,
        totalCount: 0,
        pageSize: 40
    }),
    actions: {
        async fetchDeals() {
            this.isLoading = true;
            const gameDeals = await apiService.getDeals();
            this.deals = gameDeals;
            this.groupedDeals = this.groupDeals(gameDeals);
            this.isLoading = false;
        },
        async fetchDealsByStore() {
            this.isLoading = true;
            const dealsByStore = await apiService.getDeals();
            this.dealsByStore = dealsByStore;
            this.groupedDealsBystore = this.groupDealsByStore(dealsByStore);
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
        },

        groupDealsByStore(deals: GameDeal[]): GroupedDealByStore[] {
            return deals.reduce((acc: GroupedDealByStore[], deal: GameDeal) => {
                const store = acc.find(x => x.storeID === deal.storeID);
                if (store)
                    store.deals.push(deal);
                else {
                    acc.push({
                        storeID: deal.storeID,
                        deals: [deal]
                    });
                }
                return acc;
            }, []);
        }
        
        
    }
});
