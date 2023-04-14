<template>
    <div class="expander-control"  @click="toggleExpanded">
        <div class="header-block" :class="{ 'expanded': isExpanded }">
            <slot name="header"></slot>
        </div>
        <div class="content-block" v-if="isExpanded">
            <slot name="content"></slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const emit = defineEmits<{
    (event: 'update:isExpanded', payload: boolean): void;
}>();

const isExpanded = ref(false);

function toggleExpanded() {
    console.log("toggleExpanded");
    isExpanded.value = !isExpanded.value;
    emit('update:isExpanded', !isExpanded.value);
}

</script>

<style scoped>
.header-block {
    display: flex;
    flex-direction: row;
    justify-content: start;
    align-items: center;
    padding: 0.5rem;
    cursor: pointer;
    /* border-bottom: 1px solid #ccc; */
    border: 1px solid #ccc;
    border-radius: 8px 8px 8px 8px;
    gap: 0.5rem;
}
.header-block.expanded{
    border-radius: 8px 8px 0px 0px;
    border-bottom: 1px solid gray;
}
.content-block {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 0px 0px 8px 8px;
    border-top: 0px;
}
</style>
