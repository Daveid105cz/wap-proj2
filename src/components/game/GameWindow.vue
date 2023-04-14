<template>
  <div v-if="!isLoading" class="game-container">
    <div class="left-column">
      <img :src="game.info.thumb" :alt="game.info.title" class="game-thumbnail" />
    </div>
    <div class="right-column">
      <h2 class="game-title">{{ game.info.title }}</h2>
      <div class="game-info">
        <p><strong>Store:</strong> {{ groupedDealsByGame[0].deals[0].storeID }}</p>
        <p><strong>Steam App ID:</strong> {{ groupedDealsByGame[0].deals[0].steamAppID }}</p>
        <p><strong>Metacritic Score:</strong> {{ groupedDealsByGame[0].deals[0].metacriticScore }}</p>
        <p><strong>Steam Rating Text:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingText }}</p>
        <p><strong>Steam Rating Percent:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingPercent }}</p>
        <p><strong>Steam Rating Count:</strong> {{ groupedDealsByGame[0].deals[0].steamRatingCount }}</p>
        <p><strong>Release Date:</strong> {{ groupedDealsByGame[0].deals[0].releaseDate }}</p>
      </div>
      <div class="stores-grid">
        <div v-for="(deal, index) in game.deals" :key="index" class="store-card">
          <p class="store-title">{{ deal.storeID }}</p>
          <p class="store-deal">{{ deal.price }}</p>
          <p class="store-retail">{{ deal.retailPrice }}</p>
          <p class="store-savings">{{ deal.savings }}</p>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <Spinner />
  </div>
</template>




<script lang="ts">

import { defineComponent, computed } from "vue";
import { useGameStore } from "@/stores/gameStore";
import Spinner from '@/components/Spinner.vue';
import { getSortByWithNames } from '@/types/SearchFilter';


export default defineComponent({
  props: {
    id: {
      type: String,
      required: true,
      default: "Placeholder Game Title"
    }
  },
  setup(props) {
    const gameStore = useGameStore();
    const isLoading = computed(() => gameStore.isLoading);
    const game = computed(() => gameStore.game);
    const groupedDealsByGame = computed(() => gameStore.groupedDealsByGame);

    return {
      isLoading,
      game, 
      groupedDealsByGame
    };
  },
  created() {
      this.fetchGame(this.$props.id);
      this.fetchDealsByGame();
      
    },
  methods: {
      async fetchGame(id: string) {
        await useGameStore().fetchGame(id);
      },
      async fetchDealsByGame() {
        await useGameStore().fetchDealsByGame();
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
}

.left-column {
  flex: 1;
}

.game-thumbnail {
  max-width: 600px;
  margin-right: 2rem;
}

.right-column {
  flex: 2;
}

.game-title {
  font-size: 2rem;
  margin-bottom: 1rem;
}

.game-info {
  margin-bottom: 2rem;
}

.stores-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 1rem;
}

.store-card {
  border: 1px solid black;
}
</style>