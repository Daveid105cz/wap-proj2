<template>
    <div class="num-input-container">
        <label class="my-label" :for="theInput?.value">{{label}}</label>
        <input class="my-input" type="number" :placeholder="placeholder" ref="theInput"
            :value="modelValue" 
            :min="minVal" :max="maxVal"
            @keyup="valueChanged($event)" @focusout="focusLost($event)"/>
        <label class="my-label" v-if="postLabel">{{postLabel}}</label>
    </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';

const theInput = ref<HTMLInputElement|null>(null);

const props = defineProps<{
    modelValue: number;
    placeholder?: string;
    minVal?: number;
    maxVal?: number;
    label?: string;
    postLabel?: string;
}>();

const emit = defineEmits<{
    (event: "update:modelValue", payload: number): void;
}>();

function trySetValue(value: number) {
    if (props.minVal !== undefined && value < props.minVal) {
        theInput.value!.value = props.minVal.toString();
        emit("update:modelValue", props.minVal);
    }
    else if (props.maxVal !== undefined && value > props.maxVal) {
        theInput.value!.value = props.maxVal.toString();
        emit("update:modelValue", props.maxVal);
    }
    else{
        emit("update:modelValue", value);
    }

}

function isInRange(value: number) {
    if (props.minVal !== undefined && value < props.minVal) {
        return false;
    }
    if (props.maxVal !== undefined && value > props.maxVal) {
        return false;
    }
    return true;
}
function focusLost(event: FocusEvent|null) {
    if(!event) {
        return;
    }
    const target = event.target as HTMLInputElement;
    if (!target) {
        return;
    }
    console.log(target.value);
    trySetValue(Number(target.value));
}

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
    if(!isInRange(Number(target.value))) {
        return;
    }
    trySetValue(Number(target.value));
}


</script>

<style scoped>
.num-input-container {
    display: flex;
    flex-direction: row;
    align-items: center;
}
.num-input-container input{
    height: 28px;
}
.num-input-container label{
    color: var(--color-heading);
    margin-right: 0.5rem;
    font-size: 1rem;
    vertical-align: baseline;
}
.num-input-container label:last-child{
    margin-right: 0;
    margin-left: 0.5rem;
}
</style>