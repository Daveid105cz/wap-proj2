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
    priceMin?: number;
    priceMax?: number;
    metacritic?: number;
    steamRating?: number;
    sortBy?: SortBy;
    sortOrder?: SortOrder;
    storeId?: string;
};

function queryObjToSearchFilter(queryObj: any): SearchFilter {
    const filter: SearchFilter = {};
    if (queryObj.priceMin)
        filter.priceMin = Number(queryObj.priceMin);
    if (queryObj.priceMax)
        filter.priceMax = Number(queryObj.priceMax);
    if (queryObj.metacritic)
        filter.metacritic = Number(queryObj.metacritic);
    if (queryObj.steamRating)
        filter.steamRating = Number(queryObj.steamRating);
    if (queryObj.sortBy)
        filter.sortBy = Number(queryObj.sortBy);
    if (queryObj.sortOrder)
        filter.sortOrder = Number(queryObj.sortOrder);
    if (queryObj.storeId)
        filter.storeId = queryObj.storeId;
    return filter;
}