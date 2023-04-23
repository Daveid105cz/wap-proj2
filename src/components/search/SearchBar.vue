<template>
    <div class="search-bar">
        <SearchInput v-model="inputValue" @search="doSearch" />
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
 import SearchInput from './SearchInput.vue';
 const inputValue = ref("");
  const router = useRouter();
  const searchInputComponent = ref<typeof SearchInput|null>(null);
  
  function doSearch() {
    console.log('searchbar dosearch');
    if (inputValue.value) {
      router.push({ name: 'search', query: { title: inputValue.value } });
    }
  }
  </script>
  
  <style>
  .search-bar {
    display: flex;
    align-items: center;
    justify-content: flex-end;
    width: 100%;
    height: 60px;
    background-color: #05081a60;
    padding: 0 20px;
  }
  </style>
  