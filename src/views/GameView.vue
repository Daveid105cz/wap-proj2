<template>
  <div>
    <SearchBar></SearchBar>
    <GameWindow :id="value"></GameWindow>
  </div>
</template>

<script lang="ts">

import GameWindow from "@/components/game/GameWindow.vue";
import SearchBar from '../components/search/SearchBar.vue'

export default {
  components: {
    GameWindow,
    SearchBar
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
