import { createRouter, createWebHistory } from 'vue-router' 
import Login from '@/views/Login.vue' 
import Home from '@/views/Home.vue' 
import App from '@/App.vue'
import { isAuthenticated } from '@/auth'  

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes:[
    {
      path: '/'
    },
    {
      path: '/login',
      name: 'Login',
      component: Login, 
    },
    {
      path: '/home',
      name: 'Home',
      component: Home,
    },
  ]  
 
});

 

// Proteger rotas
router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && !isAuthenticated()) {
      // Se a rota requer autenticação e o usuário não está autenticado, redireciona para o login
      next({ name: 'Login' });
  } else {
      // Se estiver autenticado ou a rota não requer autenticação, permite o acesso
      next();
  }
});

export default router
