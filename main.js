'use strict';
import MainNav from './comps/MainNav.js'
import myRoutes from './routes.js'
Vue.use(VueRouter);
const myRouter = new VueRouter({ routes: myRoutes })


new Vue({
    template: `
        <section :class="isHome">
            <main-nav></main-nav>
            <div  :class="{'is-fluid' : !isMaps,'container' : !isMaps}">
                <router-view></router-view>
            </div>
        </section>
    `,
    components: {
        MainNav
    },
    computed : {
        isMaps(){
            return this.$route.path.includes('places')
        },
        isHome(){
            return {'homepage' : this.$route.path === '/'}
        }
    },
    router: myRouter
}).$mount('#app')