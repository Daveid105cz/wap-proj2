
export class UserSettings {
    private readonly WISHLIST_KEY = "wishlist";

    public getWishlist(): number[] {
        const wishlist = localStorage.getItem(this.WISHLIST_KEY);

        if (wishlist){
            return JSON.parse(wishlist);
        }

        return [];
    }

    public addToWishlist(gameId: number): void {
        const wishlist = this.getWishlist();

        if (!wishlist.includes(gameId)) {
            wishlist.push(gameId);
            localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
        }
    }

    public removeFromWishlist(gameId: number): void {
        const wishlist = this.getWishlist();
        const index = wishlist.indexOf(gameId);

        if (index > -1) {
            wishlist.splice(index, 1);
            localStorage.setItem(this.WISHLIST_KEY, JSON.stringify(wishlist));
        }
    }

    public isOnWishlist(gameId: number): boolean {
        const wishlist = this.getWishlist();
        return wishlist.includes(gameId);
    }

    public clearWishlist(): void {
        localStorage.removeItem(this.WISHLIST_KEY);
    }
}

const userSettings = new UserSettings();
export default userSettings;