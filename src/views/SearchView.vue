<template>
    <div class="search">
        <h1>Search</h1>
        <div class="filters-container">
            <div class="price-range-container">
                Price: 
                <NumericInput class="min-price" v-model.number="searchStore.filter.lowerPrice" :min-val="0" :max-val="searchStore.filter.upperPrice"/>
                to
                <NumericInput class="max-price" v-model.number="searchStore.filter.upperPrice" :min-val="searchStore.filter.lowerPrice" :max-val="50" />
                $
            </div>
            <NumericInput label="Min. metacritic score:"  v-model.number="searchStore.filter.metacritic" placeholder="Minimal metacritic score" />
            <NumericInput label="Min. steam rating: " v-model.number="searchStore.filter.steamRating" placeholder="Minimal steam rating" />
            <div>
                <label for="store-select">Store:</label>
                <select v-model.number="searchStore.selectedStore">
                <option :value="null">All</option>
                <option v-for="store in searchStore.stores" :value="store.storeID">{{ store.storeName }}</option> 
            </select>
            </div>
            
        </div>
        <!-- <input type="text" v-model="searchStore.searchQuery" /> -->
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
// import type { SearchFilter } from '@/services/CheapSharkService';
import { useSearchStore } from '@/stores/searchStore';
import { getSortByWithNames, SortBy} from '@/types/SearchFilter';
import { useRoute } from 'vue-router';

import cheapSharkService from '@/services/CheapSharkService';
import NumericInput from '@/components/inputs/NumericInput.vue';
import Spinner from '@/components/Spinner.vue';
import SortOrderToggle from '@/components/inputs/SortOrderToggle.vue';
import { computed } from 'vue';


const currentRoute = useRoute();
const query = currentRoute.query;
console.log(query);
const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;

const isAlphabetical = computed(() => searchStore.sortBy === SortBy.Title);


searchStore.loadStores();
// modifyFilterByQueryObj(searchStore.filter, query);
// searchStore.sortOrder = queryObjToSortOrder(query);
searchStore.search();

// const storess = await cheapSharkService.getStores()
// console.log(storess);   
</script>

<style scope>
.price-range-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
}

</style>