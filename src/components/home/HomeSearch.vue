<template>
    <div class="game-search">
      <h2>Save up on your game purchase</h2>
      <div class="search-bar">
        <input type="text" placeholder="Search for games...">
        <button class="search-button">Search</button>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'GameSearch',
  };
  </script>
  
  <style scoped>
  .game-search {
    display: flex;
    font-size: 25px;
    flex-direction: column;
    align-items: center;
    padding: 16px;
    background-color: #4d0d34;
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
  