import asyncComponent from '../AsyncComponent';

const Home = asyncComponent(() => import('../Home'))
const NotFound = asyncComponent(() => import('../404'))
const Hello = asyncComponent(() => import('../Hello'))
const routes = [
  {path: "/",component: Home},
  {path: "/ni",component: Home},
  {path: '/hello', component: Hello},
  
  {component: NotFound},
]


export default routes