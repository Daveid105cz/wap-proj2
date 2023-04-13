<template>
    <div class="search">
        <h1>Search</h1>
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

</template>

<script setup lang="ts">
// import type { SearchFilter } from '@/services/CheapSharkService';
import { useSearchStore } from '@/stores/searchStore';
import { queryObjToSearchFilter, queryObjToSortOrder } from '@/types/SearchFilter';
import { useRoute } from 'vue-router';

import cheapSharkService from '@/services/CheapSharkService';

const currentRoute = useRoute();
const query = currentRoute.query;
console.log(query);
const searchStore = useSearchStore();
searchStore.searchQuery = query.title as string;
searchStore.filter = queryObjToSearchFilter(query);
searchStore.sortOrder = queryObjToSortOrder(query);
searchStore.search();

// const storess = await cheapSharkService.getStores()
// console.log(storess);   
</script>