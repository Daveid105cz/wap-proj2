<template>
    <div class="search">
        <h1>Search</h1>
        <FiltersPanel class="filters-panel"/>
        <div class="sorting-options">
            <label class="my-label" for="sort-by-select">Sort by:</label>
            <select class="my-input" v-model.number="searchStore.sortBy">
                <option v-for="sortOption in getSortByWithNames()" :value="sortOption.value">{{ sortOption.name }}</option>
            </select>
            <p class="my-label">Sort order:</p>
            <SortOrderToggle v-model="searchStore.sortOrder" :is-alphabetical="isAlphabetical"/>
            <button class="search-button" @click="searchStore.search()">Search</button>
        </div>

        <div v-if="!searchStore.isLoading" class="games-list">
            <ExpanderControl v-for="game in searchStore.groupedDeals" :key="game.id">
                <template #header>
                    <img class="game-thumb" :src="game.thumbnail" />
                    <h2 class="game-title">{{ game.title }}</h2>
                </template>
                <template #content>
                    <div class="game-deal" v-for="deal in game.deals" :key="deal.dealID">
                        <img class="store-thumb" :src="getStoreThumb(deal.storeID)" />
                        <p>{{ deal.normalPrice }}</p>
                        <p>{{ deal.salePrice }}</p>
                    </div>
                </template>
            </ExpanderControl>
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
import { getSortByWithNames, SortBy} from '@/types/SearchFilter';
import { useRoute } from 'vue-router';
import FiltersPanel from '@/components/search/FiltersPanel.vue';

import Spinner from '@/components/Spinner.vue';
import SortOrderToggle from '@/components/inputs/SortOrderToggle.vue';
import { computed } from 'vue';
import ExpanderControl from '@/components/search/ExpanderControl.vue';
import Paginator from '@/components/search/Paginator.vue';

const currentRoute = useRoute();
const query = currentRoute.query;

const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;

const isAlphabetical = computed(() => searchStore.sortBy === SortBy.Title);


searchStore.loadStores();
searchStore.search();

function getStoreThumb(storeID: number){
    const store = searchStore.stores.find(s => s.storeID === storeID);
    return "https://www.cheapshark.com/"+store?.images.banner;
}

// modifyFilterByQueryObj(searchStore.filter, query);
// searchStore.sortOrder = queryObjToSortOrder(query);
// const storess = await cheapSharkService.getStores()
// console.log(storess);   
</script>

<style scope>
.games-list {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 1em;
}
.game-header img{
    width: 4em;
    height: 4em;
}
.game-thumb {
    width: 8em;
}
.game-deal{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    align-items: center;
    height: 2.4em;
    border-bottom: 1px solid lightslategray;
    margin: 0.2em 0;
}
.game-deal:last-child{
    border-bottom: 0px;
}
.store-thumb {
    width: 8em;
    max-height: 2.2em;
}
.filters-panel{
    background-color: var(--color-background-mute);
    padding: 1em;
    border-radius: 12px 12px 0 0;
}
.sorting-options{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
    align-items: center;
    margin-bottom: 1em;
    background-color: var(--color-background-mute);
    padding: 1em;
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