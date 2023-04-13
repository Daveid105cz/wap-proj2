export enum SortOrder {
    Ascending = 1,
    Descending = -1
};
export enum SortBy {
    Title, 
    DealRating, 
    Saving, 
    Price,
    Metacritic,
    Store,
    Recent
};
export interface SearchFilter{
    lowerPrice?: number;
    upperPrice?: number;
    metacritic?: number;
    steamRating?: number
    storeId?: string;
};

export function queryObjToSearchFilter(queryObj: any): SearchFilter {
    const filter: SearchFilter = {};
    if (queryObj.lowerPrice)
        filter.lowerPrice = Number(queryObj.lowerPrice);
    if (queryObj.upperPrice)
        filter.upperPrice = Number(queryObj.upperPrice);
    if (queryObj.metacritic)
        filter.metacritic = Number(queryObj.metacritic);
    if (queryObj.steamRating)
        filter.steamRating = Number(queryObj.steamRating);
    if (queryObj.storeId)
        filter.storeId = queryObj.storeId;
    return filter;
}
export function queryObjToSortOrder(queryObj: any): SortOrder {
    if (queryObj.sortOrder)
        return Number(queryObj.sortOrder);
    return SortOrder.Descending;
}