<template>
  <div v-if="!isLoading">
    <div v-if="game.info" >
      <div class="game-container">
        <div class="left-column">
          <img :src="game.info.thumb" :alt="game.info.title" class="game-thumbnail" />
        </div>
        <div class="right-column">
          <h2 class="game-title">{{ game.info.title }}</h2>
          <div class="game-info">
            <p><strong>Metacritic Score:</strong> {{ groupedDealsByGame[0].deals[0].metacriticScore }}</p>
            <p><strong>Steam Rating Text:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingText }}</p>
            <p><strong>Steam Rating Percent:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingPercent }}</p>
            <p><strong>Steam Rating Count:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingCount }}</p>
            <p><strong>Release Date:</strong> {{ new Date(groupedDealsByGame[0].deals[0].releaseDate * 1000).toLocaleDateString() }}</p>
          </div>
          <button class="wishlist-icon" :class="{'added':gameStore.isWishlisted}" @click="gameStore.toggleWishlist">
                <svg width="800px" height="800px" viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg" stroke-width="3" stroke="#000000" fill="none"><path d="M9.06,25C7.68,17.3,12.78,10.63,20.73,10c7-.55,10.47,7.93,11.17,9.55a.13.13,0,0,0,.25,0c3.25-8.91,9.17-9.29,11.25-9.5C49,9.45,56.51,13.78,55,23.87c-2.16,14-23.12,29.81-23.12,29.81S11.79,40.05,9.06,25Z"/></svg>
                <p v-if="!gameStore.isWishlisted">Add to wishlist</p>
                <p v-else>Remove from wishlist</p>
            </button>
        </div>

      </div>
      <div class="stores-grid">
          <div v-for="(deal, index) in game.deals" :key="index" class="store-card">
            <a :href="`https://www.cheapshark.com/redirect?dealID=${deal.dealID}`">
              <div class="top-deal-store">
                <img :src="getStoreBanner(deal.storeID)" />
              </div>
              <p><strong>Store price: </strong>{{ deal.price }}$</p>
              <p><strong>Retail price: </strong>{{ deal.retailPrice }}$</p>
              <p><strong>Savings: </strong>{{Math.round(Number(deal.savings))  }}%</p>
            </a>
          </div>
        </div>
    </div>
    <div v-else>
      <Spinner />
    </div>
  </div>
</template>

<script lang="ts">

import { defineComponent, computed } from "vue";
import { useGameStore } from "@/stores/gameStore";
import Spinner from '@/components/Spinner.vue';
import { getSortByWithNames } from '@/types/SearchFilter';


export default defineComponent({
  components: {
      Spinner,
    },
  props: {
    id: {
      type: String,
      required: true,
      default: "Placeholder Game Title"
    }
  },
  setup() {
    const gameStore = useGameStore();
    const isLoading = computed(() => gameStore.isLoading);
    const game = computed(() => gameStore.game);
    const groupedDealsByGame = computed(() => gameStore.groupedDealsByGame);

    return {
      isLoading,
      game, 
      groupedDealsByGame,
      gameStore
    };
  },
  created() {
      this.fetchGame(this.$props.id);
      this.fetchDealsByGame();
      this.getStores();
      
    },
  methods: {
      async fetchGame(id: string) {
        await useGameStore().fetchGame(id);
      },
      async fetchDealsByGame() {
        await useGameStore().fetchDealsByGame();
      },
      getStoreBanner(storeID: number){
        const store = useGameStore().stores.find(s => s.storeID === storeID);
        return "https://www.cheapshark.com"+store?.images.banner;
      },
      async getStores() {
          await useGameStore().loadStores();
      },

  }
});

</script>
<style scoped>
.game-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
}


.left-column {
  flex: 1;
  margin-left: 100px;
  margin-right: 100px;
  justify-content: center;
  align-items: center;
}


.game-thumbnail {
  max-width: 600px;
  margin-right: 2rem;
}

.right-column {
  flex: 2;
  justify-content: center;
  align-items: center;
  margin-left: 100px;
  margin-right: 100px;
}

.game-title {
  font-size: 3rem;
  margin-bottom: 1rem;
}

.game-info {
  margin-bottom: 1.5rem;
  font-size: 1rem;
  
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.store-card {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 20px;
  background-color: #05081a8c;
}

.top-deal-store {
  margin-top: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
}

.top-deal-store img {
  width: 200px;
  height: 50px;
}
.wishlist-icon{
    display: flex;
    flex-direction: row;
    align-items: center;  
    cursor: pointer;
    width: auto;
    background-color: var(--color-background-mute);
    border: 1px solid #ccc;
    border-radius: 8px;
    /* width: 16em; */
    margin-bottom: 0.5rem;
}
.wishlist-icon p{
    margin: 0;
    padding: 0.5rem;
    color: white;
    font-size: 1rem;
}
.wishlist-icon svg{
    width: 38px;
    height: 38px;
    stroke: white;
}
.wishlist-icon.added svg{
    fill: #FF0000;
}
.wishlist-icon:hover svg{
  fill: #FF0000;
}
</style>