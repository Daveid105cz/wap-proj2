export interface GameStoreThumbnail {
    banner: string;
    logo: string;
    icon: string;
};

export interface GameStore {
    storeID: number;
    storeName: string;
    thumbnail: string;
    isActive: boolean;
    images: GameStoreThumbnail;
};