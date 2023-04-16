import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
import apiService from '../services/CheapSharkService'
import type { Game } from '@/types/Game';
import userSettings from '@/services/UserSettings';


interface WishlistItem {
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

            const batchCount = Math.ceil(wishlistIds.length / 25);
            const wishlist = [] as WishlistItem[];
            for(let i = 0; i < batchCount; i++){
                const currentBatchIds = wishlistIds.slice(i * 25, (i + 1) * 25);
                const games = await apiService.getGamesByIds(currentBatchIds);
                console.log(games);
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
