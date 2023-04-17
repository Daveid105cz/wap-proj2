<template>
    <div class="sort-order-button my-input" @click="btnClicked">
        <IconAscendingAlphabet v-if="isAsc && props.isAlphabetical" class="sort-icon asc" />
        <IconAscendingNumeric v-if="isAsc && !props.isAlphabetical" class="sort-icon asc" />
        <IconDescendingAlphabet v-if="!isAsc && props.isAlphabetical" class="sort-icon desc" />
        <IconDescendingNumeric v-if="!isAsc && !props.isAlphabetical" class="sort-icon desc" />
    </div>
  </template>
  
<script setup lang="ts">
import { SortOrder } from '@/types/SearchFilter';
import { computed } from 'vue';
import IconAscendingAlphabet from '../icons/IconAscendingAlphabet.vue';
import IconAscendingNumeric from '../icons/IconAscendingNumeric.vue';
import IconDescendingAlphabet from '../icons/IconDescendingAlphabet.vue';
import IconDescendingNumeric from '../icons/IconDescendingNumeric.vue';

const props = defineProps<{
    modelValue: SortOrder;
    isAlphabetical: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', payload: SortOrder): void;
}>();

const isAsc = computed(() => props.modelValue === SortOrder.Ascending);

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
    fill: white;
    /* background-color: red; */
}

.asc {
    /* transform: rotate(180deg); */
}

.desc {
    /* transform: rotate(180deg); */
}
</style>
  