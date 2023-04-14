<template>
    <div class="search">
        <h1>Search</h1>
        <FiltersPanel />
        <SortOrderToggle v-model="searchStore.sortOrder" :is-alphabetical="isAlphabetical"/>

        <select v-model.number="searchStore.sortBy">
            <option v-for="sortOption in getSortByWithNames()" :value="sortOption.value">{{ sortOption.name }}</option>
        </select>
        <button @click="searchStore.search()">Search</button>
        <div v-if="!searchStore.isLoading">
            <div v-for="game in searchStore.groupedDeals" :key="game.id">
            <h2>{{ game.title }}</h2>
            <img :src="game.thumbnail" />
            <div v-for="deal in game.deals" :key="deal.dealID">
                <p>{{ deal.storeID }}</p>
                <p>{{ deal.normalPrice }}</p>
                <p>{{ deal.salePrice }}</p>
            </div>
        </div>
        </div>
        
        <Spinner v-if="searchStore.isLoading" />
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


const currentRoute = useRoute();
const query = currentRoute.query;

const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;

const isAlphabetical = computed(() => searchStore.sortBy === SortBy.Title);


searchStore.loadStores();
searchStore.search();

// modifyFilterByQueryObj(searchStore.filter, query);
// searchStore.sortOrder = queryObjToSortOrder(query);
// const storess = await cheapSharkService.getStores()
// console.log(storess);   
</script>

<style scope>


</style>