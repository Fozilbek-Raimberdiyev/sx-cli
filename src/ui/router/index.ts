import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'Home',
            component: () => import('@/modules/Home/Index.vue'),
        },
        {
            path: '/scheme',
            name: 'Scheme',
            component: () => import('@/modules/Scheme/Index.vue'),
        },
        {
            path: '/entity',
            name: 'Entity',
            component: () => import('@/modules/Entity/Index.vue'),
        },
        {
            path: "/logs",
            name: "Logs",
            component: () => import('@/modules/Logs/Index.vue')
        }
    ],
})

export default router
