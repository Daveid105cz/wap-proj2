<template>
    <div class="paginator">
        <button v-for="page in totalPages" :key="page" class="paginator-button" @click="goPage(page-1)"
            :class="{ 'active': (page-1) === currentPage }">
            {{ page }}
        </button>
        <button class="paginator-button" @click="goToNextPage">
            >
        </button>
    </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
    currentPage: number;
    totalPages: number;
}>();

const emit = defineEmits<{
    (event: 'page-changed', payload: number): void;
    (event: 'next-page'): void;
}>();

const isFirstPage = computed(() => props.currentPage === 0);

function goToNextPage() {
    emit('next-page');
}
function goPage(page: number) {
    if(page === props.currentPage) return;
    emit('page-changed', page);
}
</script>

<style scoped>

.paginator {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 1em;
}
.paginator-button {
    width: 32px;
    height: 32px;
    border-radius: 4px;
    background-color: var(--color-background-soft);
    color: white;
    font-size: 20px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    border: 1px solid var(--color-border);
}
.paginator-button:hover {
    background-color: var(--color-background-mute);
    border-color: var(--color-border-mute);
}
.paginator-button.active {
    background-color: var(--color-background);
    border-bottom: 4px solid white;
}

</style>