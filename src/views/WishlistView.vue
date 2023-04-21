<template>
  <div>
    <SearchBar></SearchBar>
    <div class="wish-list-title"> Wishlist </div>
    <div class="wish-list">
      <Spinner class="load-spinner" v-if="wishlistStore.isLoading" />
      <div v-for="wishlistItem in wishlistStore.wishlist" class="wishlist-item">
        <router-link :to="'/games/' + wishlistItem.gameId" :key="wishlistItem.gameId">
          <img :src="wishlistItem.game.info.thumb" />
        </router-link>
        <div class="wishlist-item-detail">
          <div v-if="isOnSale(wishlistItem)" class="sale-alert">
            <img src="https://www.pngmart.com/files/15/Red-Exclamation-Mark-PNG-Pic.png" alt="Sale Alert" />
          </div>
          <div v-else>
          </div>
          <router-link :to="'/games/' + wishlistItem.gameId" :key="wishlistItem.gameId">
            <p> {{ wishlistItem.game.info.title }}</p>
          </router-link>
          <button @click="wishlistStore.removeGameFromWishlist(wishlistItem.gameId)">
            Remove from wishlist
          </button>
        </div>
      </div>
    </div>
  </div>
</template>


<script setup lang="ts">
import Spinner from '@/components/Spinner.vue';
import type { WishlistItem } from '@/stores/wishlistStore';
import SearchBar from '@/components/SearchBar.vue';
import {useWishlistStore} from '@/stores/wishlistStore';

const wishlistStore = useWishlistStore();
wishlistStore.loadWishlist();

function isOnSale(item: WishlistItem): boolean {
  for (const deal of item.game.deals) {
    if (Number(deal.savings) > 0) {
      return true;
    }
  }
  return false;
}


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

.sale-alert img {
    position: absolute;
    width: 50px;
    height: 50px;
    top: -35px;
    left: 150px;
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