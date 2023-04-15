import { createRouter, createWebHashHistory } from 'vue-router';
import authenticateGuard from './auth-guard';

// ? traditional routes
// import HomePage from '@/modules/pokemon/pages/HomePage';
// import PokemonPage from '@/modules/pokemon/pages/PokemonPage';
// import AboutPage from '@/modules/pokemon/pages/AboutPage';
// import NotPageFound from '@/modules/shared/pages/NotPageFound';

// const routes = [
//   { path: '/', component: HomePage },
//   { path: '/id', component: PokemonPage },
//   { path: '/about', component: AboutPage },
//   { path: '/:pathMatch(.*)*', component: NotPageFound }
// ]

// ? routes with lazyload
const routes = [
  {
    path: '/',
    redirect: '/pokemon',
  },
  {
    path: '/pokemon',
    name: 'pokemon',
    component: () =>
      import(
        /* webpackChunkName: "PokemonLayout" */ '@/modules/pokemon/layouts/PokemonLayout'
      ),
    children: [
      {
        path: 'home',
        name: 'pokemon-home',
        component: () =>
          import(
            /* webpackChunkName: "HomePage" */ '@/modules/pokemon/pages/HomePage'
          ),
      },
      {
        path: 'pokemonId/:id',
        name: 'pokemon-id',
        component: () =>
          import(
            /* webpackChunkName: "PokemonPage" */ '@/modules/pokemon/pages/PokemonPage'
          ),
        props: (route) => {
          const id = Number(route.params.id);
          return isNaN(id) ? { id: 1 } : { id };
        },
      },
      {
        path: 'about', // ? se coloca sin '/' ya que al ser hija no es necesario
        name: 'pokemon-about',
        component: () =>
          import(
            /* webpackChunkName: "AboutPage" */ '@/modules/pokemon/pages/AboutPage'
          ),
      },
      {
        path: '',
        redirect: { name: 'pokemon-home' },
      },
    ],
  },
  {
    path: '/dbz',
    name: 'dbz',
    beforeEnter: [authenticateGuard],
    component: () =>
      import(
        /* webpackChunkName: "DBZLayout" */ '@/modules/dbz/layouts/DBZLayout'
      ),
    children: [
      {
        path: 'characters',
        name: 'dbz-characters',
        component: () =>
          import(
            /* webpackChunkName: "HomePage" */ '@/modules/dbz/pages/HomePage'
          ),
      },
      {
        path: 'about',
        name: 'dbz-about',
        component: () =>
          import(
            /* webpackChunkName: "AboutPage" */ '@/modules/dbz/pages/AboutPage'
          ),
      },
      {
        path: '',
        redirect: { name: 'dbz-characters' },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    component: () =>
      import(
        /* webpackChunkName: "NotPageFound" */ '@/modules/shared/pages/NotPageFound'
      ),
  },
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

// ? Guard Route Goblal(private Route) sync
// router.beforeEach((to, from, next) => {
//   console.log(to),
//   console.log(from)
//   console.log(next)

//   const random = Math.random() * 100
//   if(random > 50) {
//     console.log('User Authenticate')
//     next()
//   } else {
//     console.log(random, 'User blocked')
//     next({ name: 'pokemon-home'})
//   }

//   next()
// })

// ? Guard Route Goblal(private Route) async

// const canAccess = () => {
//   return new Promise (resolve => {

//       const random = Math.random() * 100
//       if(random > 50) {
//         console.log('User Authenticate - Can Access')
//         resolve(true)
//       } else {
//         console.log(random, 'User blocked - Can Access')
//         resolve(false)
//       }

//   })
// }

// router.beforeEach(async(to, from, next) => {
//   const authorized = await canAccess()

//   authorized ? next() : next({ name: 'pokemon-home' })
// })

export default router;
