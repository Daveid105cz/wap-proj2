<template>
  <div>
    <!-- <Header></Header> -->
    <GameSearch></GameSearch>
    <GameWindow :id="value"></GameWindow>
  </div>
</template>

<script lang="ts">

import GameWindow from "@/components/game/GameWindow.vue";
import GameSearch from '../components/home/HomeSearch.vue'
// import Header from '../components/Header.vue'

export default {
  components: {
    GameWindow,
    GameSearch
  },
  data() {
    return {
      value: this.$route.params.id.toString()
    };
  }
};
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
