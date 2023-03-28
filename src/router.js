import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import ApartmentList from './pages/ApartmentList.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'homepage',
            component: HomePage
        },
        {
            path: '/apartments',
            name: 'apartment_list',
            component: ApartmentList
        }
    ]
});
export { router }