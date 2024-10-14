import { createRouter, createWebHistory } from 'vue-router';
import EscolasPage from '../components/EscolasPage.vue';
import AlunosPage from '../components/AlunosPage.vue';
import OrganizacaoPage from '../components/OrganizacaoPage.vue';
import AulasPage from '../components/AulasPage.vue';
import BemVindoPage from '../components/BemVindoPage.vue'; // Importa a página de boas-vindas

const routes = [
  {
    path: '/',
    name: 'bemVindo', // Adiciona um nome à rota de boas-vindas
    component: BemVindoPage // Define a página de boas-vindas como a raiz
  },
  {
    path: '/escolas',
    name: 'escolas',
    component: EscolasPage
  },
  {
    path: '/alunos',
    name: 'alunos',
    component: AlunosPage
  },
  {
    path: '/organizacao',
    name: 'organizacao',
    component: OrganizacaoPage
  },
  {
    path: '/aulas',
    name: 'aulas',
    component: AulasPage
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/' // Redireciona para a página de boas-vindas para rotas não encontradas
  }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;
