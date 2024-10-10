<template>
    <div id="app" class="lg-12">
        <div class="lg-12-flex">
            <div class="progress-out">
                <div class="progress-cont">
                    <div class="progress" :style="{ width: animatedWidth + '%' }"></div>
                </div>
                <!-- <span>{{ width }}%</span> -->
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, watch, nextTick } from 'vue';

// width prop qabul qilinadi
const props = defineProps({
    width: {
        type: Number,
        default: 0,
        required: true,
        // Boshlang'ich qiymat
    },
});

const animatedWidth = ref(0); // Animatsiyalanadigan width
const localWidth = ref(props.width); // Mahalliy width input uchun

// Prop qiymati o'zgarganda uni kuzatish
watch(() => props.width, (newValue) => {
    localWidth.value = newValue;
    animatedWidth.value = newValue;
});

// Boshlang'ich animatsiya
nextTick(() => {
    animatedWidth.value = props.width;
});

const change = () => {
    // Animatsiya boshlanishi
    animatedWidth.value = localWidth.value;
};
</script>

<style scoped>
body {
    background: #1d1d1d;
}

p {
    color: white;
    width: 100%;
    text-align: center;
    font-family: sans-serif;
    font-size: 18px;
}

.lg-12 {
    width: 100%;
    float: right;
    padding: 60px 0px;
}

.lg-12-flex {
    width: 100%;
    float: right;
    align-items: center;
    display: flex;
    flex: 0 0 100%;
    justify-content: center;
}

.progress-out span {
    color: #363636;
    display: inline-block;
    font-family: sans-serif;
    font-weight: bold;
    position: relative;
    right: -9px;
    top: -2px;
}

.progress-out {
    width: 512px;
    background: #0f0f0f;
    height: 34px;
    position: relative;
    margin: 60px 0px;
    border-radius: 3px;
    padding: 7px;
}

.progress-cont {
    width: 100%;
    background: #363636;
    height: 100%;
    position: relative;
    border-radius: 2px;
    display: inline-block;
}

.progress {
    border-radius: 2px;
    content: "";
    background: #8dc002;
    height: 100%;
    left: 0px;
    top: 0px;
    transition: width 0.5s ease;
    /* Animatsiya */
}

input {
    background: #363636;
    border: transparent;
    padding: 8px;
    font-size: 15px;
    font-family: sans-serif;
    color: white;
    border-radius: 3px;
    width: 102px;
}

button {
    background: #8dc002;
    border: transparent;
    padding: 8px;
    border-radius: 3px;
    margin-left: 15px;
    color: #363636;
    font-family: sans-serif;
    font-weight: bold;
    cursor: pointer;
    font-size: 15px;
}

button:focus,
input:focus {
    outline: none;
}
</style>