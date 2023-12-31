import { createWebHistory, createRouter } from "vue-router";
import Timer from '../views/Timer.vue'
import Shop from '../views/Shop.vue'
import Profile from '../views/Profile.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

const routes = [
    {
        path: '/',
        name: 'Timer',
        component: Timer
    },
    {
        path: '/shop',
        name: 'Shop',
        component: Shop
    },
    {
        path: '/profile',
        name: 'Profile',
        component: Profile
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    }
]

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;