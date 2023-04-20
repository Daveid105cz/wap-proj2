<template>
  <div class="game-search">
    <h2>Save up on your game purchase</h2>
    <div class="search-bar">
      <input ref="searchQuery" type="text" placeholder="Search for games..." @keyup.enter="doSearch">
      <button class="search-button" @click="doSearch">Search</button>
    </div>
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

<style scoped>
.game-search {
  display: flex;
  font-size: 25px;
  flex-direction: column;
  align-items: center;
  padding: 50px;
  font-family: "KdamThmorPro-Regular";
  background-color: rgba(80, 78, 78, 0.5);
}

.search-button {
  background-color: #afafaf;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 8px 16px;
  cursor: pointer;
}

.search-button:hover {
  background-color: #444444;
}

.search-bar {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 16px;
}

.search-bar input[type="text"] {
  width: 300px;
  height: 36px;
  padding: 8px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-right: 8px;
}
</style>
