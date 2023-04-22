import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { GameDeal } from '@/types/GameDeal';
import type { Game } from '@/types/Game';
import type { GameStore } from '@/types/GameStore';
import { SortBy, SortOrder } from '@/types/SearchFilter';
import userSettings from '@/services/UserSettings';

export const useGameStore = defineStore({
    id: 'game',
    state: () => ({
        isLoading: false,
        game: {} as Game,
        gameId: 0,
        isWishlisted: false,
        sortBy: SortBy.DealRating,
        sortOrder: SortOrder.Ascending,
        dealsByGame: [] as GameDeal[],
        page: 1,
        totalCount: 0,
        pageSize: 40,
        stores: [] as GameStore[],

        gameInfo: {
            metacriticScore: 0,
            steamRatingText: "Data unavailable",
            steamRatingPercent: "Data unavailable",
            steamRatingCount: "Data unavailable",
            releaseDate: 0
        }
    }),
    actions: {
        async loadStores(){
            this.stores = await apiService.getStores();
        },
        async fetchGame(id: string) {
            this.isLoading = true;
            this.game = await apiService.getGame(id);                    
            this.gameId = Number(id);
            const gameDeal = await apiService.getDealInfo(this.game.deals[0].dealID)
            this.getGameInfo(gameDeal);
            this.isLoading = false;
            this.isWishlisted = userSettings.isOnWishlist(this.gameId);
        },
        toggleWishlist() {
            this.isWishlisted = !this.isWishlisted;
            if(this.isWishlisted)
                userSettings.addToWishlist(this.gameId);
            else
                userSettings.removeFromWishlist(this.gameId);
        },

        getGameInfo(gameDeal: any) {
            this.gameInfo.metacriticScore = gameDeal.gameInfo.metacriticScore;
            this.gameInfo.steamRatingText = gameDeal.gameInfo.steamRatingText;
            this.gameInfo.steamRatingPercent = gameDeal.gameInfo.steamRatingPercent;
            this.gameInfo.steamRatingCount = gameDeal.gameInfo.steamRatingCount;
            this.gameInfo.releaseDate = gameDeal.gameInfo.releaseDate;
        },
    }
});
