<template>
    <div class="search-bar">
      <input ref="searchQuery" type="text" placeholder="Search for games..." @keyup.enter="doSearch" class="search-query">
      <button class="search-button-bar" @click="doSearch">Search</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  const router = useRouter();
  const searchQuery = ref<HTMLInputElement|null>(null);
  
  function doSearch() {
    if (searchQuery.value && searchQuery.value.value) {
      router.push({ name: "search", query: { title: searchQuery.value.value } });
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
  
  input[type="text"] {
    width: 300px;
    height: 30px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 5px 10px;
    margin-right: 10px;
    font-size: 16px;
  }
  
  .search-query {
    margin-left: 800px;
    padding: 5px 20px;
  }
  
  .search-button-bar {
    background-color: #afafaf;
    color: white;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 5px 20px;
    cursor: pointer;
    font-size: 16px;
    height: 30px;
  }
  
  .search-button-bar:hover {
    background-color: #444444;
  }
  </style>
  