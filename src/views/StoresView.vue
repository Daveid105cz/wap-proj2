<template>
    <div class="stores-list">
        <Spinner class="load-spinner" v-if="storesStore.isLoading" />
        <!-- <div class="store-block" v-for="store in storesStore.activeStores" :key="store.storeID">
            <RouterLink class="store-info" :to="{name:'search', query: {storeID: store.storeID}}">
                <div  >
                    <p>{{ store.storeName }}</p>
                    <img :src="getStoreThumb(store.images.logo)" />
                </div>
            </RouterLink>
            <div class="deals-list">
                <Spinner class="load-spinner" v-if="store.isLoading" />
                <a class="deal-item" v-for="deal in store.deals" :key="deal.dealID" :href="'https://www.cheapshark.com/redirect?dealID='+deal.dealID" target="_blank">
                    <img :src="deal.thumb" />
                    <p class="title">{{ deal.title }}</p>
                    <p class="new-price">{{ deal.salePrice }} $</p>
                    <p class="normal-price">{{ deal.normalPrice }} $</p>
                </a>
            </div>
        </div> -->
        <GroupedDealsListBlock v-for="store in storesStore.activeStores" :key="store.storeID" 
        :title="store.storeName" :thumbnailSrc="getStoreThumb(store.images.logo)" :get-deal-item-link="deal => deal.thumb"
        :headerNavigationLink="'/search'" :headerNavigationQuery="{storeID: store.storeID}" 
        :deals="store.deals" :showSpinner="store.isLoading" />
    </div>
</template>

<script setup lang="ts">
import { useStoresStore } from '@/stores/storesStore';
import Spinner from '@/components/Spinner.vue';
import { useRouter } from 'vue-router';
import GroupedDealsListBlock from '@/components/GroupedDealsListBlock.vue';
const storesStore = useStoresStore();
storesStore.loadStores();


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