export enum SortOrder {
    Ascending = "ascending",
    Descending = "descending"
};
export enum SortBy {
    Title = "Title",
    DealRating = "DealRating", 
    Saving = "Savings",
    Price = "Price",
    Metacritic = "Metacritic",
    Store = "Store",
    Recent = "Recent"
};
export interface SearchFilter{
    lowerPrice?: number;
    upperPrice?: number;
    metacritic?: number;
    steamRating?: number
    storeID?: number;
};

export function modifyFilterByQueryObj(filter: SearchFilter, queryObj: any) {
    // const filter: SearchFilter = {};
    if (queryObj.lowerPrice)
        filter.lowerPrice = Number(queryObj.lowerPrice);
    if (queryObj.upperPrice)
        filter.upperPrice = Number(queryObj.upperPrice);
    if (queryObj.metacritic)
        filter.metacritic = Number(queryObj.metacritic);
    if (queryObj.steamRating)
        filter.steamRating = Number(queryObj.steamRating);
    if (queryObj.storeId)
        filter.storeID = queryObj.storeId;
}
export function queryObjToSortOrder(queryObj: any): SortOrder {
    if (queryObj.sortOrder)
        return Number(queryObj.sortOrder);
    return SortOrder.Descending;
}

export function getSortByWithNames(): { name: string, value: SortBy }[] {
    return [
        { name: "Title", value: SortBy.Title },
        { name: "Deal rating", value: SortBy.DealRating },
        { name: "Savings", value: SortBy.Saving },
        { name: "Price", value: SortBy.Price },
        { name: "Metacritic score", value: SortBy.Metacritic },
        { name: "Store", value: SortBy.Store },
        { name: "Recent", value: SortBy.Recent }
    ];
}