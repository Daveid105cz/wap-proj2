<template>
    <div class="search">
        <h1>Search</h1>
        <div class="search-headers">
            <div class="search-input">
                <SearchInput v-model="searchStore.searchQuery" @search="commitSearch"/>
            </div>
            <FiltersPanel class="filters-panel"/>
            <div class="sorting-options">
                <label class="my-label" for="sort-by-select">Sort by:</label>
                <select class="my-input" v-model.number="searchStore.sortBy">
                    <option v-for="sortOption in getSortByWithNames()" :value="sortOption.value">{{ sortOption.name }}</option>
                </select>
                <p class="my-label">Sort order:</p>
                <SortOrderToggle v-model="searchStore.sortOrder" :is-alphabetical="isAlphabetical"/>
            </div>
            <div class="deals-header">
                <p>Store</p>
                <p>Game title</p>
                <p>Deal rating</p>
                <p>New price</p>
                <p>Normal price</p>
            </div>
        </div>
        <div v-if="!searchStore.isLoading" class="games-list">
            <GroupedDealsListBlock :isVertical="true"
                v-for="game in searchStore.groupedDeals" :key="game.id" :deals="game.deals" 
                :title="game.title" :thumbnailSrc="game.thumbnail" :get-deal-item-link="getStoreThumb"
                :headerNavigationLink="'/games/'+game.id" :headerNavigationQuery="{}" :show-spinner="false" />
        </div>
        
        <Spinner class="load-spinner" v-if="searchStore.isLoading" />
        <div class="search-bottom">
            <label class="my-label">Showing {{ searchStore.deals.length }} deals</label>
            <Paginator :current-page="searchStore.page" :total-pages="searchStore.knowPagesCount" 
            v-on:next-page="searchStore.goNextPage"
            v-on:page-changed="searchStore.goPage"
            />
        </div>
    </div>

</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import { getSortByFromQueryObj, getSortByWithNames, getSortOrderFromQueryObj, modifyFilterByQueryObj, SortBy} from '@/types/SearchFilter';
import { useRoute, useRouter } from 'vue-router';
import FiltersPanel from '@/components/search/FiltersPanel.vue';

import Spinner from '@/components/Spinner.vue';
import SortOrderToggle from '@/components/inputs/SortOrderToggle.vue';
import { computed, watch } from 'vue';
import GroupedDealsListBlock from '@/components/GroupedDealsListBlock.vue';
import Paginator from '@/components/search/Paginator.vue';
import type { GameDeal } from '@/types/GameDeal';
import SearchInput from '@/components/SearchInput.vue';

const currentRoute = useRoute();
const query = currentRoute.query;

const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;
modifyFilterByQueryObj(searchStore.filter, query);
if(query.sortBy){
    searchStore.sortBy = getSortByFromQueryObj(query);
}
if(query.sortOrder){
    searchStore.sortOrder = getSortOrderFromQueryObj(query);
}
if(query.page){
    searchStore.setPage(parseInt(query.page as string));
}
searchStore.loadStores();
searchStore.search(false);

const isAlphabetical = computed(() => searchStore.sortBy === SortBy.Title);

const router = useRouter();
function commitSearch(){
    searchStore.search(true);
    console.log("changing the url");
    const query = searchStore.urlQuery;
    console.log(query);
    router.push({
        path: '/search',
        query: searchStore.urlQuery
    });
}


function getStoreThumb(deal: GameDeal){
    const store = searchStore.stores.find(s => s.storeID === deal.storeID);
    return "https://www.cheapshark.com/"+store?.images.banner;
}

</script>

<style scope>
.search-headers{
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    margin-bottom: 1em;
    background-color: var(--color-background-mute);
    padding: 1em;
    border-radius: 12px 12px 0 0;
}
.deals-header{
    display: grid;
    grid-template-columns: 9em 2fr 6em 6em 6em;
    align-items: center;
    margin-bottom: 1em;
    gap: 1rem;
    padding: 0.5rem;
    border-top: 4px solid var(--color-background);
}
.deals-header p{
    font-size: 1.2em;
    color: white;
    font-weight: 600;
}
.games-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1em;
}

.sorting-options{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
}
.search-button{
    margin-left: auto;
}
.search-bottom{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 1em;
    margin-top: 1em;
    gap: 1rem;
    background-color: var(--color-background-mute);
    border-radius: 0 0 12px 12px;
}
</style>