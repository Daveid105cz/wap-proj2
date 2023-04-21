<template>
    <SearchBar></SearchBar>
    <div class="wish-list-title"> Wishlist </div>
    <div class="wish-list">
      <Spinner class="load-spinner" v-if="wishlistStore.isLoading" />
      <router-link v-for="wishlistItem in wishlistStore.wishlist" :to="'/games/' + wishlistItem.gameId" :key="wishlistItem.gameId" class="wishlist-item">
        <img :src="wishlistItem.game.info.thumb" />
        <div class="wishlist-item-detail">
          <p>{{ wishlistItem.game.info.title }}</p>
          <button @click="wishlistStore.removeGameFromWishlist(wishlistItem.gameId)">Remove from wishlist</button>
        </div>
      </router-link>
    </div>
  </template>
  
<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';
import SearchBar from '@/components/SearchBar.vue';
import {useWishlistStore} from '@/stores/wishlistStore';

const wishlistStore = useWishlistStore();
wishlistStore.loadWishlist();

</script>

<style scoped>

.wish-list-title{
    font-size: 70px;
    text-align: center;
    margin-bottom: 50px;
    margin-top: 50px;
    font-family: "Mogra-Regular";
}

.wish-list{
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(20em, 1fr));
    gap: 1rem;
}
.wishlist-item{
    display: flex;
    flex-direction: row;
    /*dont height stretch the children*/
    align-items: center;
    border: 1px solid white;
    padding: 1rem;
    gap: 1rem;
    border-radius: 24px;
    background-color: #05081a8c;
    height: 14em;
}
.wishlist-item img{
    width: 8em;
}
.wishlist-item-detail{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
    min-height: 6em;
    gap: 1rem;
}
.wishlist-item button{
    background-color: #ff0000;
    color: white;
    border: none;
    border-radius: 8px;
    padding: 0.5rem;
    cursor: pointer;
    height: auto;
}
.wishlist-item button:hover{
    background-color: #ff3333;
}
.wishlist-item p{
    margin: 0;
    color: var(--color-heading);
    font-size: 1.2rem;
    transition: background-color 0.2s ease-in-out;
}

.wishlist-item:hover {
  background-color: #000000bd;
}

</style>