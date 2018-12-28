import asyncComponent from '../AsyncComponent';

const Home = asyncComponent(() => import('../Home'))
const NotFound = asyncComponent(() => import('../404'))
const Hello = asyncComponent(() => import('../Hello'))
const User = asyncComponent(() => import('../users/User'))
const Render = asyncComponent(() => import('../Render'))

const routes = [
  {path: "/",component: Home},
  {path: "/users", component: User},
  {path: '/hello', component: Hello},
  {path: '/render', component: Render},
  
  {component: NotFound},
]


export default routes