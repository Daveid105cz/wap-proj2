<template>
    <div class="sort-order-button my-input" @click="btnClicked">
        <img class="sort-icon" :class="{ 'asc': isAsc, 'desc': isDesc }" :src="svgSource" />
    </div>
  </template>
  
<script setup lang="ts">
import { SortOrder } from '@/types/SearchFilter';
import { computed } from 'vue';

const props = defineProps<{
    modelValue: SortOrder;
    isAlphabetical: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', payload: number): void;
}>();

const isAsc = computed(() => props.modelValue === SortOrder.Ascending);
const isDesc = computed(() => props.modelValue === SortOrder.Descending);
  
const svgSource = computed(() => {
    let svgSource = "";
    if(props.isAlphabetical) {
        svgSource = (isAsc.value) ? "ascAlphabet":"descAlphabet";
    } else {
        svgSource =  (isAsc.value) ? "ascNumeric":"descNumeric";
    }
    console.log(svgSource);
    return new URL("../../assets/sortIcons/"+svgSource+".svg", import.meta.url).href;
});

function btnClicked() {
    if (props.modelValue === SortOrder.Ascending) {
        emit("update:modelValue", SortOrder.Descending);
    } else {
        emit("update:modelValue", SortOrder.Ascending);
    }
}

</script>
  
<style scoped>
.sort-order-button {
    cursor: pointer;
    width: 48px;
    height: 48px;
    margin: 0;
    padding: 4px;
}

.sort-icon {
    width: 95%;
    height: 95%;
    transition: transform 0.3s ease;
    border: 0px;
    /* background-color: red; */
}

.asc {
    /* transform: rotate(180deg); */
}

.desc {
    /* transform: rotate(180deg); */
}
</style>
  