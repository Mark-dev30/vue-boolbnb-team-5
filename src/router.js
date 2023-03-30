import { createRouter, createWebHistory } from "vue-router";
import HomePage from './pages/HomePage.vue';
import ApartmentList from './pages/ApartmentList.vue';
import SingleApartment from './pages/SingleApartment.vue';

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
        },
        {
            path: '/apartments/:slug',
            name: 'single-apartment',
            component: SingleApartment
        },
    ]
});
export { router }