<script setup lang="ts">
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Trailer from './components/Trailer.vue'
</script>

<template>
  <div id="app">
  <header>

    <div class="wrapper">

      <Header></Header>
      
    </div>
  </header>

  <RouterView />
  </div>
  <Trailer></Trailer>
</template>

<style scoped>


@font-face {
  font-family: "Condiment-Regular";
  src: local("Condiment-Regular"),   url(./assets/fonts/Condiment-Regular.ttf) format("truetype");}

@font-face {
  font-family: "Mogra-Regular";
  src: local("Mogra-Regular"),   url(./assets/fonts/Mogra-Regular.ttf) format("truetype");}

  @font-face {
  font-family: "KdamThmorPro-Regular";
  src: local("KdamThmorPro-Regular"),   url(./assets/fonts/KdamThmorPro-Regular.ttf) format("truetype");}


  #app {
    background-image: url('@/./assets/back_clouds.svg'); 
    height: 100%;
    width: 100%;
    background-size: contain;
    background-size: cover;
  } 

</style>
