<template>
  <div>
    <GameSearch></GameSearch>
    <GameWindow :id="value"></GameWindow>
  </div>
</template>

<script lang="ts">

import GameWindow from "@/components/game/GameWindow.vue";
import GameSearch from '../components/home/HomeSearch.vue'

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
