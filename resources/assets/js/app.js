
/**
 * First we will load all of this project's JavaScript dependencies which
 * include Vue and Vue Resource. This gives a great starting point for
 * building robust, powerful web applications using Vue and Laravel.
 */

require('./bootstrap');
var Vue = require('vue')
var VueRouter = require('vue-router');
Vue.http.headers.common['X-CSRF-TOKEN'] = Laravel.csrfToken;
Vue.use(VueRouter);
import Users from './components/Users.vue'
import About from './components/About.vue';
import template from './components/initials/template.vue'
import AddUser from './components/User/Add.vue'
const UserHome = Users
const UserProfile = About
const UserPosts = AddUser

const router = new VueRouter({
    routes: [
        { path: '/user/:id', component: template,
            children: [
                // UserHome will be rendered inside User's <router-view>
                // when /user/:id is matched
                { path: '', component: UserHome },

                // UserProfile will be rendered inside User's <router-view>
                // when /user/:id/profile is matched
                { path: 'profile', component: UserProfile },

            ]
        },
        { path: '/add', component: AddUser}

    ]
})

const app = new Vue({ router }).$mount('#app')

