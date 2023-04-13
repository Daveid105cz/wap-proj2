<template>
    <div class="trailer">
      <div class="trailer-text">
        Trailer Here
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Trailer',
  };
  </script>
  
  <style scoped>
  .trailer {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #f2f2f2;
    padding: 16px;
  }
  
  .trailer-text {
    font-size: 24px;
    font-weight: bold;
    text-align: center;
    color: #333;
  }
  </style>
  