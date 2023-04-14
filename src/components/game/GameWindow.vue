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
      groupedDealsByGame
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
  margin-bottom: 2rem;
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
</style>