<script setup lang="ts">
import { ref } from 'vue'

const props = defineProps<{
  currentTheme: string
}>()

const emit = defineEmits<{
  (e: 'switchTheme', theme: string): void
}>()

const themes = ref([
  { name: 'Light', value: 'light' },
  { name: 'Dark', value: 'dark' },
  { name: 'System', value: 'system' }
])

const selectedTheme = ref(props.currentTheme)

const onThemeChange = (event: Event) => {
  const select = event.target as HTMLSelectElement
  emit('switchTheme', select.value)
  selectedTheme.value = select.value
}
</script>

<template>
  <header class="flex justify-between items-center p-4 bg-secondary shadow-md">
    <h1 class="text-2xl font-bold text-primary dark:italic">
      Animation Dashboard
    </h1>
    <div class="flex items-center">
      <select
        v-model="selectedTheme"
        @change="onThemeChange"
        class="mr-2 p-2 rounded bg-primary text-primary"
      >
        <option v-for="theme in themes" :key="theme.value" :value="theme.value">
          {{ theme.name }}
        </option>
      </select>
      <button class="p-2 rounded-full text-primary">
        <i class="pi pi-user"></i>
      </button>
    </div>
  </header>
</template>