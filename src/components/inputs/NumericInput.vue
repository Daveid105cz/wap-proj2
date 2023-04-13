<template>
    <input type="number" :value="modelValue" @keyup="valueChanged($event)" />
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  modelValue: number;
}>();

const emit = defineEmits<{
    (event: 'update:modelValue', payload: number): void;
}>();



function valueChanged(event: KeyboardEvent|null) {
    if(!event) {
        return;
    }
    const target = event.target as HTMLInputElement;
    if (!target) {
        return;
    }
    if (isNaN(Number(target.value))) {
        return;
    }
    emit('update:modelValue', Number(target.value));
}

</script>