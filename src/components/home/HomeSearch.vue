<template>
    <div class="game-search">
      <h2>Save up on your game purchase</h2>
      <div class="search-bar">
        <input type="text" placeholder="Search for games...">
        <button>Search</button>
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
    flex-direction: column;
    align-items: center;
    padding: 16px;
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
  
  .search-bar button {
    height: 36px;
    padding: 8px 16px;
    font-size: 16px;
    border: none;
    border-radius: 4px;
    background-color: #007bff;
    color: #fff;
    cursor: pointer;
  }
  
  .search-bar button:hover {
    background-color: #0069d9;
  }
  </style>
  