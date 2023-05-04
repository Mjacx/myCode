import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'
import ChickenEgg from '../views/ChickenEgg.vue'

const routes = [
    { path:'/', component: Home ,children:[{path:'chicken',name:'chic',component:ChickenEgg}]},
    { path:'/eggs/:eggsType', name: 'eggs', component: () => import('../views/Eggs.vue') },
    { path:'/eggs', redirect: './eggs/chicken-egg' },
    { path:'/:pathMatch(.*)*', component: () => {import('../views/NotFind.vue')} },

]

const router = createRouter(
    {
        history: createWebHistory(),
        routes,
        linkActiveClass: 'egg-active'
    }
)

export default router