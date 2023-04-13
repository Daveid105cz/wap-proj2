<template>
    <div class="top-deals-container">
      <div v-if="isLoading">Loading...</div>
      <div v-else class="top-deals-grid">
        <div v-for="(groupedDeal, index) in topDeals" :key="groupedDeal.id">
          <TopDeal
            :gameTitle="groupedDeal.deals[0].title"
            :gameImage="groupedDeal.deals[0].thumb"
            :storeName="groupedDeal.deals[0].storeID"
            :normalPrice="groupedDeal.deals[0].normalPrice"
            :salePrice="groupedDeal.deals[0].salePrice"
            :dealRating="groupedDeal.deals[0].dealRating"
          />
        </div>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, computed } from "vue";
  import { useHomeStore } from "@/stores/homeStore";
  import TopDeal from "@/components/home/TopDeal.vue";
  
  export default defineComponent({
    components: {
      TopDeal,
    },
    setup() {
      const store = useHomeStore();
      const isLoading = computed(() => store.isLoading);
      const groupedDeals = computed(() => store.groupedDeals);
      const topDeals = computed(() => store.groupedDeals.slice(0, 10));
      console.log(groupedDeals);
  
      return {
        isLoading,
        topDeals,
      };
    },
    created() {
      this.fetchDeals();
    },
    methods: {
      async fetchDeals() {
        await useHomeStore().fetchDeals();
      },
    },
  });
  </script>

<style scoped>
.top-deals-container {
  display: flex;
  justify-content: center;
}

.top-deals-grid {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-auto-rows: minmax(300px, auto);
  grid-gap: 20px;
}
</style>
  