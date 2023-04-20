export enum SortOrder {
    Ascending = "ascending",
    Descending = "descending"
};
export enum SortBy {
    Title = "Title",
    DealRating = "Deal Rating", 
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
    storeID?: number | null;
};

export function modifyFilterByQueryObj(filter: SearchFilter, queryObj: any) {
    // const filter: SearchFilter = {};
    if (queryObj.lowerPrice)
        filter.lowerPrice = Number(queryObj.lowerPrice);
    else
        filter.lowerPrice = 0;

    if (queryObj.upperPrice)
        filter.upperPrice = Number(queryObj.upperPrice);
    else
        filter.upperPrice = 50;

    if (queryObj.metacritic)
        filter.metacritic = Number(queryObj.metacritic);
    else
        filter.metacritic = 0;

    if (queryObj.steamRating)
        filter.steamRating = Number(queryObj.steamRating);
    else
        filter.steamRating = 0;
    
    if (queryObj.storeId)
        filter.storeID = queryObj.storeId;
    else
        filter.storeID = null;
}
export function getSortByFromQueryObj(queryObj: any): SortBy {
    if (queryObj.sortBy){
        for (const sortBy of getSortByWithNames()) {
            if (sortBy.value === queryObj.sortBy)
                return queryObj.sortBy;
        }
    }

    return SortBy.DealRating;
}
export function getSortOrderFromQueryObj(queryObj: any): SortOrder {
    if (queryObj.sortOrder)
        return queryObj.sortOrder;
    return SortOrder.Descending;
}

export function buildQueryParamsFromAllFilters(searchQuery: string, filter: SearchFilter, 
        sortBy: SortBy, sortOrder: SortOrder, 
        page: number) {

    const queryParams: any = {};

    if (searchQuery)
        queryParams.searchQuery = searchQuery;
    if (filter.lowerPrice && filter.lowerPrice > 0)
        queryParams.lowerPrice = filter.lowerPrice;
    if (filter.upperPrice && filter.upperPrice < 50)
        queryParams.upperPrice = filter.upperPrice;
    if (filter.metacritic && filter.metacritic > 0)
        queryParams.metacritic = filter.metacritic;
    if (filter.steamRating && filter.steamRating > 0)
        queryParams.steamRating = filter.steamRating;

    if (sortBy && sortBy !== SortBy.DealRating)
        queryParams.sortBy = sortBy;
    if (sortOrder && sortOrder !== SortOrder.Descending)
        queryParams.sortOrder = sortOrder;
    if (page && page > 0)
        queryParams.page = page;

    if (filter.storeID && filter.storeID !==null)
        queryParams.storeId = filter.storeID;
    
    return queryParams;
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