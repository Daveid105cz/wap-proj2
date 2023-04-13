<template>
    <div>
      <h2 class="top-deals-title">Today's Top Deals By Store</h2>
      <Spinner v-if="isLoading" />
      
      <div v-else class="top-deals-grid">
        <div v-for="(groupedDeal, index) in topDeals" :key="groupedDeal.storeID">
          <h2>Top Deals for Store {{ groupedDeal.storeID }}</h2>
          <div class="deals-container">
            <div v-for="(deal, dealIndex) in groupedDeal.deals.slice(0, 4)" :key="dealIndex" class="deal-item">
              <img :src="deal.thumb" width="100" height="80" />
              <div class="deal-info">
                <div class="top-deal-title">{{ deal.title }}</div>
                <div class="top-deal-price">Deal rating: {{ deal.dealRating }}</div>
                <div class="top-deal-price">Original price: {{ deal.normalPrice }}</div>
                <div class="top-deal-price">Sale price: {{ deal.salePrice }}</div>
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
  import TopDeal from "@/components/home/TopDeal.vue";
  import Spinner from '@/components/Spinner.vue';
  
  export default defineComponent({
    components: {
      TopDeal,
    },
    
    setup() {
      const homeStore = useHomeStore();
      const isLoading = computed(() => homeStore.isLoading);
      const groupedDeals = computed(() => homeStore.groupedDealsBystore);
      const topDeals = computed(() => homeStore.groupedDealsBystore.slice(0, 6));
  
      return {
        isLoading,
        topDeals,
      };
    },
    created() {
      this.fetchDealsByStore();
    },
    methods: {
      async fetchDealsByStore() {
        await useHomeStore().fetchDealsByStore();
      },
      
      
    },
  });
  </script>
<style scoped>
.top-deals-title {
  text-align: center;
  font-size: 28px;
  margin-bottom: 20px;
}

.top-deals-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 20px;
}

.deal-item {
  display: grid;
  grid-template-columns: 100px 1fr;
  gap: 10px;
  align-items: center;
}

.top-deal-title {
  margin: 0;
  font-size: 15px;
  font-weight: bold;
}

.top-deal-price {
  margin: 0;
  font-size: 14px;
}
</style>
