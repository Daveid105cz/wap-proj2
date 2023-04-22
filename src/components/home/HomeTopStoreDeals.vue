<template>
  <div>
    <h2 class="top-deals-title">Today's Top Deals By Store</h2>
    <div class="spinner-container" v-if="isLoading">
      <Spinner />
    </div>

    <div v-else class="top-deals-grid">
      <div v-for="(groupedDeal, index) in topDeals" :key="groupedDeal.storeID">
  
        <div class="top-deal-store">
          <img :src="getStoreBanner(groupedDeal.storeID)" />
        </div>
        <div class="deals-container">
          <div class="deal-items-container">
            <div v-for="(deal, dealIndex) in groupedDeal.deals.slice(0, 4)" :key="dealIndex" class="deal-item">
              
              <router-link :to="'/games/' + deal.gameID">
                <img :src="deal.thumb" width="100" height="100" />
              </router-link>

              <div class="deal-info">
                <router-link :to="'/games/' + deal.gameID">
                  <div class="top-deal-title">{{ deal.title }}</div>
                </router-link>
                <div class="top-deal-price"><b style="font-weight: bold;">Deal rating:</b> {{ deal.dealRating }}</div>
                <div class="top-deal-price"><b style="font-weight: bold;">Original price:</b> {{ deal.normalPrice }}$</div>
                <div class="top-deal-price"><b style="font-weight: bold;">Sale price:</b> {{ deal.salePrice }}$</div>
                <div class="top-deal-price"><b style="font-weight: bold;">Savings:</b> {{Math.round(Number(deal.savings))}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useHomeStore } from "@/stores/homeStore";
  import Spinner from '@/components/Spinner.vue';
  
  export default defineComponent({

    components: {
    Spinner,
    },
    setup() {
      const homeStore = useHomeStore();
      const isLoading = computed(() => homeStore.isLoading);
      const topDeals = computed(() => homeStore.groupedDealsBystore.slice(0, 6));
  
      return {
        isLoading,
        topDeals,
      };
    },
    created() {
      this.fetchDealsByStore();
      this.getStores();
    },
    methods: {
      async fetchDealsByStore() {
        await useHomeStore().fetchDealsByStore();
      },
      async getStores() {
        await useHomeStore().loadStores();
      },
      getStoreBanner(storeID: number){
        const store = useHomeStore().stores.find(s => s.storeID === storeID);
        return "https://www.cheapshark.com"+store?.images.banner;
    }
      
      
    },
  });
  </script>
<style scoped>
.top-deals-title {
  text-align: center;
  font-size: 50px;
  margin-bottom: 50px;
  margin-top: 50px;
  font-family: "Mogra-Regular";
  padding: 30px;
}

.top-deal-store {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  width: 340px;
}

.deals-container {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 50px;
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
}

.top-deals-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(200px, 1fr));
  grid-template-rows: repeat(2, 1fr);
  gap: 50px;
  justify-items: center;
}

.deal-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: center;
}

.deal-info {
  margin-top: 20px;
  align-items: center;
}

.top-deal-title {
  margin: 4px;
  font-size: 15px;
  font-weight: bold;
  color: white;
}

.top-deal-title :hover {
  color: #313131;
  }

.top-deal-price {
  margin: 0;
  font-size: 14px;
}

.spinner-container {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  width: 100%;
}
</style>
