<template>
    <SearchBar></SearchBar>
    <div class="stores-list">
        <Spinner class="load-spinner" v-if="storesStore.isLoading" />
        <GroupedDealsListBlock v-for="store in storesStore.activeStores" :key="store.storeID" 
        :title="store.storeName" :thumbnailSrc="getStoreThumb(store.images.logo)" :get-deal-item-link="deal => deal.thumb"
        :headerNavigationLink="'/search'" :headerNavigationQuery="{storeID: store.storeID}" 
        :deals="store.deals" :showSpinner="store.isLoading" />
    </div>
</template>

<script setup lang="ts">
import { useStoresStore } from '@/stores/storesStore';
import Spinner from '@/components/Spinner.vue';
import GroupedDealsListBlock from '@/components/GroupedDealsListBlock.vue';
const storesStore = useStoresStore();
storesStore.loadStores();

import SearchBar from '../components/SearchBar.vue'


function getStoreThumb(storeUrl: string){
    return "https://www.cheapshark.com/"+storeUrl;
}

</script>

<style scoped>

.stores-list{
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-top: 2em;
}
</style>