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
import { useRoute } from 'vue-router';

const currentRoute = useRoute();
const query = currentRoute.query;

const searchStore = useSearchStore();
// priceMin?: number;
//     priceMax?: number;
//     metacritic?: number;
//     steamRating?: number;
//     sortBy?: SortBy;
//     sortOrder?: SortOrder;
//     storeId?: string;
// searchStore.filter.priceMin = query.priceMin as number;
// searchStore.filter.priceMax = query.priceMax as number;
// searchStore.filter.metacritic = query.metacritic as string;
// searchStore.filter.steamRating = query.steamRating as string;
// searchStore.filter.storeId = query.storeId as string;

searchStore.search();



</script>