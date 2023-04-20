<template>
    <div>
        <div class="header-block">
            <img class="game-thumb" :src="game.thumbnail" />
            <h2 class="game-title">{{ game.title }}</h2>
        </div>
        <div class="content-block">
            <div class="game-deal" v-for="deal in game.deals" :key="deal.dealID">
                <img class="store-thumb" :src="getStoreThumb(deal.storeID)" />
                <p class="new-price">{{ deal.salePrice }} $</p>
                <p class="normal-price">{{ deal.normalPrice }} $</p>
                <p>{{ deal.dealRating }}</p>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useSearchStore, type GroupedDeal } from '@/stores/searchStore';

const props = defineProps<{
    game: GroupedDeal;
}>();

const searchStore = useSearchStore();

function getStoreThumb(storeID: number){
    const store = searchStore.stores.find(s => s.storeID === storeID);
    return "https://www.cheapshark.com/"+store?.images.banner;
}

</script>

<style scoped>
.header-block {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    /* border-bottom: 1px solid #ccc; */
    border: 1px solid #ccc;
    gap: 0.5rem;
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px solid gray;
}
/* .expander-control:hover .header-block {
    box-shadow: 0px 0px 0px 1px #ccc;
}
.expander-control:hover .content-block {
    box-shadow: 0px 0px 0px 1px #ccc;
} */
/* .header-block.expanded{

} */
.content-block {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0px 0px 8px 8px;
    border-top: 0px;
}
.game-header img{
    width: 4em;
    height: 4em;
}
.game-thumb {
    width: 8em;
}
.game-deal{
    gap: 1rem; 
    display: grid;
    grid-template-columns: 8em 8em 8em 8em;
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
</style>
