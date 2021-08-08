import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/Pages/Home.vue'
import ProductManage from '@/Pages/ProductManage.vue'

Vue.use(VueRouter)

export const router = new VueRouter({
    routes: [
        {
            path: '/',
            component: Home,
            alias: '/home',
            
        },
        {
            path: '/productManage',
            component: ProductManage
        },
    ]
})