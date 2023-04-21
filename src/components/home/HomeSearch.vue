<template>
  <div class="game-search">
    <h2>Save up on your game purchase</h2>
    <div class="search-bar-home">
      <input ref="searchQueryHome" type="text" placeholder="Search for games..." @keyup.enter="doSearch">
      <button class="search-button-home" @click="doSearch">Search</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
const router = useRouter();
const searchQueryHome = ref<HTMLInputElement|null>(null);

function doSearch() {
  if (searchQueryHome.value && searchQueryHome.value.value) {
    router.push({ name: "search", query: { title: searchQueryHome.value.value } });
  }
}
</script>

<style scoped>
.game-search {
  display: flex;
  font-size: 25px;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  font-family: "KdamThmorPro-Regular";
  background-color: #05081a60;
}

.search-button-home {
  background-color: #afafaf;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 8px 16px;
  cursor: pointer;
}

.search-button-home:hover {
  background-color: #444444;
}

.search-bar-home {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.search-bar-home input[type="text"] {
  width: 300px;
  height: 36px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 20px;
  margin-right: 8px;
}
</style>
