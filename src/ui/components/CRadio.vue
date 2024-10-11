<template>
    <input @input="emit('change', $event)" :value="value" v-model="model" type="radio" :id="id" :name="name">
    <label :for="id"></label>
</template>

<script setup lang="ts">
import { defineModel } from "vue"
const props = withDefaults(defineProps<{
    id?: string,
    name?: string,
    label?: string,
    value?: any
}>(), {
    id: "",
    name: "",
    label: "",
    value: null
})
const model = defineModel();

const emit = defineEmits(['change']);

</script>

<style scoped>
[type="radio"]:checked,
[type="radio"]:not(:checked) {
    position: absolute;
    left: -9999px;
}

[type="radio"]:checked+label,
[type="radio"]:not(:checked)+label {
    position: relative;
    padding-left: 28px;
    cursor: pointer;
    line-height: 20px;
    display: inline-block;
    color: #666;
}

[type="radio"]:checked+label:before,
[type="radio"]:not(:checked)+label:before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    width: 26px;
    height: 26px;
    border: 1px solid #ddd;
    border-radius: 100%;
    background: #fff;
}

[type="radio"]:checked+label:after,
[type="radio"]:not(:checked)+label:after {
    content: '';
    width: 14px;
    height: 14px;
    background: #10B981;
    position: absolute;
    top: 6px;
    left: 6px;
    border-radius: 100%;
    -webkit-transition: all 0.2s ease;
    transition: all 0.2s ease;
}

[type="radio"]:not(:checked)+label:after {
    opacity: 0;
    -webkit-transform: scale(0);
    transform: scale(0);
}

[type="radio"]:checked+label:after {
    opacity: 1;
    -webkit-transform: scale(1);
    transform: scale(1);
}
</style>