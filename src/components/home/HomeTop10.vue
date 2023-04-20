<template>
  <div class="home">
    <div class="top10Text">Today's TOP 10 Deals </div>
    <div class="top-deals-container">
      <Spinner v-if="isLoading" />
      <div v-else class="top-deals-grid">
        <div v-for="(groupedDeal, index) in topDeals" :key="groupedDeal.id">
          <RouterLink :to="'/game/' + groupedDeal.deals[0].gameID" class="top-deal-container">
            <div class="top-deal-image">
              <img :src="groupedDeal.deals[0].thumb" width="400" height="600" />
              <div class="top-deal-details">
                <div class="top-deal-price">Deal rating: {{ groupedDeal.deals[0].dealRating }}</div>
                <div class="top-deal-price">Original price: {{ groupedDeal.deals[0].normalPrice }}$</div>
                <div class="top-deal-price">Sale price: {{ groupedDeal.deals[0].salePrice }}$</div>
                <div class="top-deal-price">Savings: {{Math.round(Number( groupedDeal.deals[0].savings))  }}%</div>
                
                <div class="top-deal-store">
                  <img :src="getStoreBanner(groupedDeal.deals[0].storeID)" />
                </div>
              </div>
            </div>
            <div class="top-deal-title">{{ groupedDeal.deals[0].title }}</div>
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

  
<script lang="ts">
import { defineComponent, computed } from "vue";
import { useHomeStore } from "@/stores/homeStore";
import Spinner from '@/components/Spinner.vue';
import { getSortByWithNames } from '@/types/SearchFilter';
import type { GameStore, GameStoreThumbnail } from '@/types/GameStore';


export default defineComponent({
  components: {
    Spinner,
  },

  
  setup() {
    const homeStore = useHomeStore();
    const isLoading = computed(() => homeStore.isLoading);
    const groupedDeals = computed(() => homeStore.groupedDeals);
    const topDeals = computed(() => homeStore.groupedDeals.slice(0, 10));
    const stores = computed(() => homeStore.stores);



    return {
      isLoading,
      topDeals,
      stores,
      homeStore
    };
  },
  created() {
    this.fetchDeals();
    this.getStores();
  },
  methods: {
    async fetchDeals() {
      await useHomeStore().fetchDeals();
    },
    async getStores() {
      await useHomeStore().loadStores();
    },
    getStoreIcon(storeID: number){
      const store = useHomeStore().stores.find(s => s.storeID === storeID);
      return "https://www.cheapshark.com"+store?.images.icon;
  },
    getStoreBanner(storeID: number){
        const store = useHomeStore().stores.find(s => s.storeID === storeID);
        return "https://www.cheapshark.com"+store?.images.banner;
    }
    
    
  },
});


</script>

<style scoped>
.top10Text {
  font-size: 80px;
  text-align: center;
  margin-bottom: 50px;
  margin-top: 50px;
  font-family: "Mogra-Regular";
}


.top-deals-container {
  display: flex;
  justify-content: center;
  
  
  
}
.top-deal-store {
  width: 210px;
  height: 50px;
  margin-top: 10px;
  display: flex;
  justify-content: center;
}
.top-deal-store img {
  max-width: 50%;
  max-height: 50%;
}
.top-deals-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(0px, auto);
  grid-gap: 5px;
}

.top-deal {
  position: relative;
  
  
}

.top-deals-grid img {
  width: 300px;
  height: 200px;
}


.game-image {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  
}

.game-details {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 2px;
  background-color: rgba(0, 0, 0, 0.5);
  color: white;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  
}

.top-deal-image {
  position: relative;
  height: 300px;
  overflow: hidden;
  cursor: pointer;
}

.top-deal-image img {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  max-height: 100%;
  max-width: 100%;
}

.top-deal-details {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.8);
  color: white;
  text-align: center;
  padding: 10px;
  opacity: 0;
  transition: opacity 0.2s ease-in-out;
  
}

.top-deal-image:hover .top-deal-details {
  opacity: 1;
}

.top-deal-title {
  margin: 1px;
  font-size: 18px;
  text-align: center;
  color: white;
  font-weight: bold;
}

.store-details {
  display: none;
}

.top-deal:hover .game-image {
  opacity: 0;
}

.top-deal:hover .store-details {
  display: block;
}
</style>