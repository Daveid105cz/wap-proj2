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
        page: number,
        selectedStore: number | null) {

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
    if (selectedStore && selectedStore !== null)
        queryParams.storeId = selectedStore;
    if (sortBy && sortBy !== SortBy.DealRating)
        queryParams.sortBy = sortBy;
    if (sortOrder && sortOrder !== SortOrder.Descending)
        queryParams.sortOrder = sortOrder;
    if (page && page > 0)
        queryParams.page = page;
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