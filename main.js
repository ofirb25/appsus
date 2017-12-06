'use strict';
import MainNav from './comps/MainNav.js'
import myRoutes from './routes.js'
Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes })


new Vue({
    template: `
        <section>
            <main-nav></main-nav>
            <div class="container is-fluid">
                <router-view></router-view>
            </div>
        </section>
    `,
    components: {
        MainNav
    },
    router: myRouter
}).$mount('#app')