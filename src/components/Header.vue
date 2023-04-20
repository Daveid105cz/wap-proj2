<template>
    <div class="header">
      <nav class="nav-links-left">
        <router-link to="/">Home</router-link>

      </nav>
      <nav class="nav-links-left">

        <router-link to="/stores">Stores</router-link>
      </nav>
      <div class="logo">
        <a href="/">Best Game Deals</a>
      </div>
      <nav class="nav-links-right">
        <router-link to="/wishlist">Wishlist</router-link>

      </nav>
      <nav class="nav-links-right">

        <router-link to="/contact">Contact</router-link>
      </nav>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    name: 'Header',
  };
  </script>
  
  <style scoped>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #f2f2f2;
    padding: 16px;
    
  }
  
  .logo {
    flex-grow: 1;
    text-align: center;
    font-family: "KdamThmorPro-Regular";

  }
  
  .logo a {
    font-size: 50px;
    font-weight: bold;
    text-decoration: none;
    color: #333;
  }
  
  .nav-links-left {
    display: flex;
    font-size: 25px;
    margin-left: 30px;
    margin-right: 30px;
    justify-content: flex-start;
    color: #333;
  }

  .nav-links-left a {
    color: #333;
  }
  
  .nav-links-right {
    display: flex;
    font-size: 25px;
    margin-left: 30px;
    margin-right: 30px;
    justify-content: flex-end;
  }

  .nav-links-right a {
    color: #333;
  }
  
  .nav-links router-link {
    margin-right: 16px;
    text-decoration: none;
    color: #333;
  }
  
  .nav-links router-link.active {
    font-weight: bold;
  }
  </style>
  