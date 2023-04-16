<template>
    <div class="stores-list">
        <div class="store-block" v-for="store in storesStore.activeStores" :key="store.storeID">
            <div class="store-info">
                <p>{{ store.storeName }}</p>
                <img :src="getStoreThumb(store.images.logo)" />
            </div>
            <div class="deals-list">
                <div class="deal-item" v-for="deal in store.deals" :key="deal.dealID" @click="redirectToStore(deal.dealID)">
                    <img :src="deal.thumb" />
                    <p class="title">{{ deal.title }}</p>
                    <p class="new-price">{{ deal.salePrice }} $</p>
                    <p class="normal-price">{{ deal.normalPrice }} $</p>

                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useStoresStore } from '@/stores/storesStore';

const storesStore = useStoresStore();
storesStore.loadStores();


function getStoreThumb(storeUrl: string){
    return "https://www.cheapshark.com/"+storeUrl;
}

function redirectToStore(dealID: string){
    window.open("https://www.cheapshark.com/redirect?dealID="+dealID, "_blank");
}
</script>

<style scoped>
.stores-list{
    display: flex;
    flex-direction: column;
    gap: 1rem;
}
.store-block{
    display: flex;
    flex-direction: row;
    gap: 1rem;
    border-left: 8px solid white;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-radius: 24px;
    padding: 0.7em 2em; 
}
.store-block:nth-child(odd){
    border-left: 8px solid gray;
}
.store-info{
    /* display: flex; */
    gap: 1rem;
    width: 20em;
}
.store-info p{
    font-size: 1.5rem;
    color: var(--color-heading);
    margin-bottom: 0.5em;
}
.store-info img{
    width: 12em;
    /* height: 100%; */
    /* object-fit: cover; */
}
.deals-list{
    display: flex;
    flex-direction: column;
    /* gap: 1rem; */
    width: 100%;
}
.deal-item{
    display: grid;
    grid-template-columns: 1fr 2fr 6em 6em;
    /* height: 2.5em; */
    padding: 1em 0.6em;
    cursor: pointer;
    box-sizing: border-box;
    border-left: 4px solid transparent;
}
.deal-item:hover{
    background-color: var(--color-background-mute);
    border-left: 4px solid var(--color-heading);
}
.deal-item p{
    margin: 0;
    font-size: 1.2rem;
}
.deal-item img{
    width: 8em;
    max-height: 2.2em;
    object-fit: cover;
}
.normal-price{
    margin: 0 0.3em 0 0;
    text-decoration: line-through;
    color: gray;
}
.new-price{
    color: green
}
</style>