<template>
    <div class="filters-container">
        <div class="price-range-container">
            <NumericInput label="Price: " class="min-price" v-model.number="searchStore.filter.lowerPrice" :min-val="0" :max-val="searchStore.filter.upperPrice"/>
            <NumericInput label="to" post-label="$" class="max-price" v-model.number="searchStore.filter.upperPrice" :min-val="searchStore.filter.lowerPrice" :max-val="50" />
        </div>
        <NumericInput class="score-input" label="Min. metacritic score:" :min-val="0" :max-val="100"
                v-model.number="searchStore.filter.metacritic" placeholder="Minimal metacritic score" />
        <NumericInput class="score-input" label="Min. steam rating: " :min-val="0" :max-val="100"
                v-model.number="searchStore.filter.steamRating" placeholder="Minimal steam rating" />
        <div>
            <label class="my-label" for="store-select">Store: </label>
            <select class="my-input" v-model.number="searchStore.selectedStore">
                <option :value="null">All</option>
                <option v-for="store in searchStore.stores" :value="store.storeID">{{ store.storeName }}</option> 
            </select>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearchStore } from '@/stores/searchStore';
import NumericInput from '@/components/inputs/NumericInput.vue';

const searchStore = useSearchStore();


</script>

<style>
.price-range-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0.5rem;
    flex-wrap: wrap;
}
.filters-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    gap: 1rem;
}
.score-input{
    /* min-width: 18em; */
    max-height: 4em;
}
/* .score-input input{
    width: 8em;
} */
/* @media (min-width: 1024px) {
    .filters-container {
        flex-direction: row;
    }
} */

</style>