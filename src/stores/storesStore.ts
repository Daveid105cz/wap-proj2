import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import { SortBy, SortOrder } from '@/types/SearchFilter';
import type { GameStore } from '@/types/GameStore';

interface StoreTopItem extends GameStore{
    isLoading: boolean;
    deals: GameDeal[];
};

export const useStoresStore = defineStore({
    id: 'stores',
    state: () => ({
        isLoading: false,
        stores: [] as StoreTopItem[],
    }),
    actions: {
        async loadStores(){
            const stores = await apiService.getStores();
            this.stores = stores.map(x => ({...x, isLoading: false, deals: []}));
            function loadTopDeals(store: StoreTopItem){
                store.isLoading = true;
                const delay = Math.random() * 1000;
                // random delay to avoid hitting the API too fast and prevent rate limiting
                setTimeout(() => {
                    apiService.getDeals("", {storeID: store.storeID}, SortBy.Saving, SortOrder.Descending, 0, 5).then(deals => {
                        store.deals = deals;
                        store.isLoading = false;
                    });
                }, delay);
            }
            this.stores.forEach(loadTopDeals);
        }
    }
});
