<template>
    <div class="full-block" :class="{'vertical': isVertical}">
        <RouterLink class="header-info" :to="{path: headerNavigationLink, query: headerNavigationQuery}">
            <p>{{ title }}</p>
            <img :src="thumbnailSrc" />
        </RouterLink>
        <div class="deals-list">
            <Spinner class="load-spinner" v-if="showSpinner" />
            <a class="deal-item" v-for="deal in deals" :key="deal.dealID" :href="'https://www.cheapshark.com/redirect?dealID='+deal.dealID" target="_blank">
                <img :src="getDealItemLink(deal)" />
                <p v-if="!isVertical" class="title">{{ deal.title }}</p>
                <p class="new-price">{{ deal.salePrice }} $</p>
                <p class="normal-price">{{ deal.normalPrice }} $</p>
            </a>
        </div>
    </div>
</template>

<script setup lang="ts">
import type { LocationQueryRaw } from 'vue-router';
import Spinner from '@/components/Spinner.vue';
import type {GameDeal} from '@/types/GameDeal';

const props = defineProps<{
    title: string;
    thumbnailSrc: string;
    headerNavigationLink: string;
    headerNavigationQuery: LocationQueryRaw;
    deals: GameDeal[];
    showSpinner: boolean;
    isVertical?: boolean;
    getDealItemLink: (deal: GameDeal) => string;
}>();

</script>

<style scoped>
.full-block{
    display: flex;
    flex-direction: row;
    border-left: 8px solid white;
    border-top: 1px solid lightgray;
    border-bottom: 1px solid lightgray;
    border-right: 1px solid lightgray;
    border-radius: 24px;
}
.full-block.vertical{
    flex-direction: column;
}
.full-block:nth-child(odd){
    border-left: 8px solid gray;
}
.header-info{
    padding-left: 1.8em;
    padding-top: 1em;
    gap: 1rem;
    width: 20em;
    border-radius: 22px 0 0 22px;
}
.full-block.vertical .header-info{
    padding: 1em;
    width: auto;
    border-radius: 22px 22px 0 0;
    border-bottom: 2px solid gray;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 0;
}
.vertical .header-info p{
    order: 2;
    margin-left: 0;
}
.vertical .header-info img{
    order: 1;
}
.header-info:hover{
    background-color: var(--color-background-mute);
}

.header-info p{
    font-size: 1.5rem;
    color: var(--color-heading);
    margin-bottom: 0.5em;
}
.header-info img{
    width: 12em;
}
.vertical .header-info img{
    width: 8em;
    margin-right: 1em;
}
.deals-list{
    display: flex;
    flex-direction: column;
    width: 100%;
}

.deal-item{
    display: grid;
    grid-template-columns: 9em 2fr 6em 6em;
    padding: 1em 0.6em;
    cursor: pointer;
    box-sizing: border-box;
    border-left: 4px solid transparent;
    border-bottom: 1px solid gray;
}
.deal-item:first-child{
    border-radius: 0 22px 0 0;
}
.deal-item:last-child{
    border-radius: 0 0 22px 0;
    border-bottom: 0;
}
.vertical .deal-item:first-child{
    border-radius: 0 0 0 0px;
}
.vertical .deal-item:last-child{
    border-radius: 0 0 22px 22px;
}
.deal-item:hover{
    background-color: var(--color-background-mute);
    border-left: 4px solid var(--color-heading);
}
.deal-item p{
    margin: 0;
    font-size: 1.2rem;
}
.deal-item .title{
    color: var(--color-text);
    grid-column: 2;
}
.deal-item img{
    width: 8em;
    max-height: 2.2em;
    grid-column: 1;
}

.header-info:hover::after{
    content: url("data:image/svg+xml,%3C%3Fxml version='1.0' encoding='utf-8'%3F%3E%3Csvg width='32px' height='32px' viewBox='0 0 24 24' stroke='white' fill='white' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M20.2929 9.70708C20.5789 9.99307 21.009 10.0786 21.3827 9.92385C21.7564 9.76907 22 9.40443 22 8.99997V2.99997C22 2.44768 21.5523 1.99997 21 1.99997H15C14.5955 1.99997 14.2309 2.24361 14.0761 2.61729C13.9213 2.99096 14.0069 3.42108 14.2929 3.70708L16.2322 5.64641L9.58574 12.2929C9.19522 12.6834 9.19522 13.3166 9.58574 13.7071L10.2928 14.4142C10.6834 14.8048 11.3165 14.8048 11.7071 14.4142L18.3536 7.76774L20.2929 9.70708Z' fill='%23FFFFFF'/%3E%3Cpath d='M4.5 8.00006C4.5 7.72392 4.72386 7.50006 5 7.50006H10.0625C10.6148 7.50006 11.0625 7.05234 11.0625 6.50006V5.50006C11.0625 4.94777 10.6148 4.50006 10.0625 4.50006H5C3.067 4.50006 1.5 6.06706 1.5 8.00006V19.0001C1.5 20.9331 3.067 22.5001 5 22.5001H16C17.933 22.5001 19.5 20.9331 19.5 19.0001V13.9376C19.5 13.3853 19.0523 12.9376 18.5 12.9376H17.5C16.9477 12.9376 16.5 13.3853 16.5 13.9376V19.0001C16.5 19.2762 16.2761 19.5001 16 19.5001H5C4.72386 19.5001 4.5 19.2762 4.5 19.0001V8.00006Z' fill='%23FFFFFF'/%3E%3C/svg%3E");
    position: absolute;
    right: 1em;
    bottom: 0;
    color: var(--color-heading);
}
.normal-price{
    /* margin: 0 0.3em 0 0; */
    text-decoration: line-through;
    color: gray;
    grid-column: 4;
}
.new-price{
    color: green;
    grid-column: 3;
}

.load-spinner{
    position: relative;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
}

</style>
