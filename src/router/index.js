import { createRouter, createWebHistory } from 'vue-router';
import EscolasPage from '../components/EscolasPage.vue';
import AlunosPage from '../components/AlunosPage.vue';
import OrganizacaoPage from '../components/OrganizacaoPage.vue';
import AulasPage from '../components/AulasPage.vue';
import BemVindoPage from '../components/BemVindoPage.vue';
import LoginPage from '../components/LoginPage.vue';

// Carregar o estado de autenticação do localStorage
let isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';

// Função para alterar o estado de autenticação
export function setAuthentication(status) {
  isAuthenticated = status;
  // Persistir o estado de autenticação no localStorage
  localStorage.setItem('isAuthenticated', status);
}

const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginPage
  },
  {
    path: '/bemvindo',
    name: 'bemVindo',
    component: BemVindoPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/escolas',
    name: 'escolas',
    component: EscolasPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: AlunosPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/organizacao',
    name: 'organizacao',
    component: OrganizacaoPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/aulas',
    name: 'aulas',
    component: AulasPage,
    meta: { requiresAuth: true }
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Redireciona para a página de login se a rota não for encontrada
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

// Antes de cada navegação, verifica se a rota requer autenticação
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated) {
      // Se o usuário não estiver autenticado, redirecione para a página de login
      next({ name: 'login' });
    } else {
      // Se o usuário estiver autenticado, permite o acesso
      next();
    }
  } else {
    // Se a rota não requer autenticação, permite o acesso
    next();
  }
});

export default router;
