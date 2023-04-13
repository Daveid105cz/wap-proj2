<template>
    <div class="top-deal">
      <h2>{{ gameTitle }}</h2>
      <img :src="gameImage" alt="">
      <div class="deal-info">
        <p>{{ storeName }}</p>
        <p>{{ normalPrice }}</p>
        <p>{{ salePrice }}</p>
        <p>{{ dealRating }}</p>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      gameTitle: {
        type: String,
        default: "Placeholder Game Title"
      },
      gameImage: {
        type: String,
        default: "https://via.placeholder.com/300x300"
      },
      storeName: {
        type: String,
        default: "Placeholder Store Name"
      },
      normalPrice: {
        type: String,
        default: "0.0"
      },
      salePrice: {
        type: String,
        default: "0.0"
      },
      dealRating: {
        type: String,
        default: "0.0"
      }
    }
  };
  </script>
  
  <style>
  .top-deal {
    border: 1px solid black;
    padding: 1rem;
    margin: 1rem;
  }
  </style>
  