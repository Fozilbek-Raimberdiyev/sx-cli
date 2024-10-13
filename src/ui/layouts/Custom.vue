<script setup lang="ts">
import { ref, onMounted, onUnmounted, watch, provide } from 'vue'
import AppSidebar from '@/components/AppSidebar.vue'
import AppHeader from '@/components/AppHeader.vue'
import Toast from 'primevue/toast';
const isSidebarExpanded = ref(true)
const sidebarWidth = ref(256)
const isResizing = ref(false)

const currentTheme = ref('light')
provide('currentTheme', currentTheme)

const toggleSidebar = () => {
    isSidebarExpanded.value = !isSidebarExpanded.value
    sidebarWidth.value = isSidebarExpanded.value ? 256 : 64
}

const startResize = (event: MouseEvent) => {
    isResizing.value = true
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResize)
}

const resize = (event: MouseEvent) => {
    if (isResizing.value) {
        const newWidth = event.clientX
        sidebarWidth.value = Math.max(64, Math.min(newWidth, 400))
        isSidebarExpanded.value = sidebarWidth.value > 64
    }
}

const stopResize = () => {
    isResizing.value = false
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
}

const switchTheme = (newTheme: string) => {
    if (newTheme === 'system') {
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
        currentTheme.value = systemTheme
    } else {
        currentTheme.value = newTheme
    }
    document.documentElement.setAttribute('data-theme', currentTheme.value)
}

onMounted(() => {
    document.addEventListener('mousemove', resize)
    document.addEventListener('mouseup', stopResize)
    switchTheme('system') // Initialize with system theme
})

onUnmounted(() => {
    document.removeEventListener('mousemove', resize)
    document.removeEventListener('mouseup', stopResize)
})

// Watch for system theme changes
watch(
    () => window.matchMedia('(prefers-color-scheme: dark)').matches,
    (isDark) => {
        if (currentTheme.value === 'system') {
            switchTheme('system')
        }
    }
)
</script>

<template>
    <div class="flex h-screen" :data-theme="currentTheme">
        <AppSidebar :style="{ width: `${sidebarWidth}px` }" class="text-white transition-all duration-300 relative"
            :is-expanded="isSidebarExpanded" @toggle="toggleSidebar" />
        <div class="w-1 cursor-col-resize absolute h-full" :style="{ left: `${sidebarWidth}px` }"
            @mousedown="startResize"></div>
        <div class="flex flex-col flex-grow">
            <AppHeader :current-theme="currentTheme" @switch-theme="switchTheme" />
            <main class="flex-grow p-6 overflow-auto">
            <Toast></Toast>
                <RouterView></RouterView>
            </main>
        </div>
    </div>
</template>

<style>
.cursor-col-resize {
    cursor: col-resize;
}
</style>