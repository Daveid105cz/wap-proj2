<template>
      <input ref="searchQuery" type="text" placeholder="Search for games..."
        v-bind:value="props.modelValue"
        v-on:input="updateValue"
       @keyup.enter="doSearch" class="search-query">
      <button class="search-button-bar" @click="doSearch">Search</button>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue';

  const props = defineProps<{
    modelValue: string;
  }>();

  const emit = defineEmits<{
    (event: 'update:modelValue', value: string): void;
    (event: 'search', value: string): void;
  }>();

  const updateValue = (e: Event) => {
    emit('update:modelValue', (e.target as HTMLInputElement).value)
  };
  const searchQuery = ref<HTMLInputElement|null>(null);

  function doSearch() {
    console.log('doSearch');
    if (searchQuery.value && searchQuery.value.value) {
        console.log("emiting search")
        emit('search', searchQuery.value.value);
    }
  }


  </script>
  
  <style scoped>
  input[type="text"] {
    width: 300px;
    height: 30px;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 5px 10px;
    margin-right: 10px;
    font-size: 16px;
  }
  
  .search-query {
    padding: 5px 20px;
  }
  
  .search-button-bar {
    background-color: #afafaf;
    color: white;
    border-radius: 20px;
    border: none;
    outline: none;
    padding: 5px 20px;
    cursor: pointer;
    font-size: 16px;
    height: 30px;
  }
  
  .search-button-bar:hover {
    background-color: #444444;
  }
  </style>
  