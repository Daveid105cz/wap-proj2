import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { Game } from '@/types/Game';
import userSettings from '@/services/UserSettings';


export interface WishlistItem {
    gameId: number;
    game: Game;
};

export const useWishlistStore = defineStore({
    id: 'wishlist',
    state: () => ({
        isLoading: false,
        wishlist: [] as WishlistItem[],
    }),
    actions: {
        async loadWishlist(){
            this.isLoading = true;
            const wishlistIds = userSettings.getWishlist();

            //calculates the amount of batches to load the wishlist
            const batchCount = Math.ceil(wishlistIds.length / 25);
            const wishlist = [] as WishlistItem[];

            //loads the wishlisted game details in batches of 25 (api limit)
            for(let i = 0; i < batchCount; i++){
                //gets a batch of the wishlist IDs
                const currentBatchIds = wishlistIds.slice(i * 25, (i + 1) * 25);
                const games = await apiService.getGamesByIds(currentBatchIds);

                games.forEach(game => wishlist.push({gameId: game.info.gameID, game}));
            }
            this.wishlist = wishlist;
            this.isLoading = false;
        },
        removeGameFromWishlist(gameId: number){
            userSettings.removeFromWishlist(gameId);
            this.wishlist = this.wishlist.filter(x => x.gameId !== gameId);
        }
    }
});
