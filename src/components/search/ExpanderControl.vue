<template>
    <div class="expander-control">
        <button @click="toggleExpanded">
            <slot name="collapsed" v-if="!isExpanded"></slot>
            <slot name="expanded" v-else></slot>
        </button>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
    isExpanded: boolean;
}>();

const emit = defineEmits<{
    (event: 'update:isExpanded', payload: boolean): void;
}>();

const isExpanded = ref(props.isExpanded);

function toggleExpanded() {
    emit('update:isExpanded', !isExpanded.value);
}

</script>