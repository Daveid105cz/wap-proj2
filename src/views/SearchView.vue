<template>
    <div class="search">
        <h1>Search</h1>
        <input type="text" v-model="searchStore.searchQuery" />
        <NumericInput v-model="searchStore.filter.lowerPrice" />
        <NumericInput v-model="searchStore.filter.upperPrice" />
        <NumericInput v-model="searchStore.filter.metacritic" />
        <NumericInput v-model="searchStore.filter.steamRating" />
        <select v-model.number="searchStore.selectedStore">
            <option :value="null">All</option>
            <option v-for="store in searchStore.stores" :value="store.storeID">{{ store.storeName }}</option> 
        </select>
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
// import type { SearchFilter } from '@/services/CheapSharkService';
import { useSearchStore } from '@/stores/searchStore';
import { getSortByWithNames} from '@/types/SearchFilter';
import { useRoute } from 'vue-router';

import cheapSharkService from '@/services/CheapSharkService';
import NumericInput from '@/components/inputs/NumericInput.vue';
import Spinner from '@/components/Spinner.vue';


const currentRoute = useRoute();
const query = currentRoute.query;
console.log(query);
const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;
searchStore.loadStores();
// modifyFilterByQueryObj(searchStore.filter, query);
// searchStore.sortOrder = queryObjToSortOrder(query);
searchStore.search();

// const storess = await cheapSharkService.getStores()
// console.log(storess);   
</script>