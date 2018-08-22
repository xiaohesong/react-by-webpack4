import asyncComponent from '../AsyncComponent';

const Home = asyncComponent(() => import('../Home'))
const NotFound = asyncComponent(() => import('../404'))

const routes = [
  {path: "/",component: Home},
  {path: "/ni",component: Home},

  
  {component: NotFound},
]


export default routes