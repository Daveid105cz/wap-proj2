export interface GameStoreThumbnail {
    banner: string;
    logo: string;
    icon: string;
};

export interface GameStore {
    storeId: string;
    storeName: string;
    thumbnail: string;
    isActive: boolean;
    images: GameStoreThumbnail;
};