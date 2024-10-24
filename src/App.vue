<template>
  <div class="app-container">
    <!-- Menu Lateral -->
    <aside class="sidebar" :class="{ 'menu-visible': menuVisible }">
      <div class="sidebar-header">
        <img src="@/assets/logo2.png" alt="Logo" class="sidebar-logo" @click="navigateTo('bemVindo')" />
        <button class="menu-toggle" @click="toggleMenu">
          <span class="menu-icon" :class="{ 'menu-icon-white': menuVisible }">&#9776;</span>
        </button>
      </div>
      <ul>
        <li :class="{ 'active': isActive('escolas') }" @click="navigateTo('escolas')">Escolas</li>
        <li :class="{ 'active': isActive('alunos') }" @click="navigateTo('alunos')">Alunos</li>
        <li :class="{ 'active': isActive('organizacao') }" @click="navigateTo('organizacao')">Organização</li>
        <li :class="{ 'active': isActive('aulas') }" @click="navigateTo('aulas')">Aulas</li>
      </ul>
      <button class="btn-logout" @click="confirmLogout">Sair</button> <!-- Botão de Logout -->
    </aside>

    <!-- Conteúdo Principal -->
    <main class="main-content">
      <header class="header" :class="{ 'centered-header': isCentered }">
        <button class="menu-toggle" @click="toggleMenu">
          <span class="menu-icon">&#9776;</span>
        </button>
        <img v-if="!isCentered" src="@/assets/washington.png" alt="Logo" class="logo" />
        <h1 v-if="!isCentered">{{ pageTitle }}</h1>
      </header>
      <router-view @updateTitle="updateTitle" />
    </main>

    <!-- Diálogo de confirmação de logout -->
    <div v-if="showLogoutConfirm" class="dialog-overlay">
      <div class="dialog-box">
        <p>Tem certeza de que deseja sair?</p>
        <div class="dialog-actions">
          <button @click="handleLogout" class="confirm-btn">Sim</button>
          <button @click="cancelLogout" class="cancel-btn">Não</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';
import { setAuthentication } from './router/index'; // Ajuste conforme a localização do seu arquivo router

export default {
  data() {
    return {
      menuVisible: false,
      pageTitle: 'Gerenciador de Dados', // Valor padrão
      isCentered: false, // Para controlar a centralização do header
      showLogoutConfirm: false // Controle de exibição do diálogo de confirmação
    };
  },
  setup() {
    const router = useRouter();
    const route = useRoute();

    function navigateTo(page) {
      router.push({ name: page });
    }

    function isActive(page) {
      return route.name === page;
    }

    return { navigateTo, isActive };
  },
  methods: {
    toggleMenu() {
      this.menuVisible = !this.menuVisible;
    },
    updateTitle(title) {
      this.pageTitle = title;
    },
    handleResize() {
      if (window.innerWidth >= 768) {
        this.menuVisible = true;
      } else {
        this.menuVisible = false;
      }
    },
    confirmLogout() {
      this.showLogoutConfirm = true; // Mostra o diálogo de confirmação
    },
    cancelLogout() {
      this.showLogoutConfirm = false; // Fecha o diálogo sem deslogar
    },
    handleLogout() {
      setAuthentication(false); // Define a autenticação como falsa
      localStorage.removeItem('isAuthenticated'); // Remove o estado de autenticação do localStorage
      this.$router.push('/'); // Redireciona para a página de login
      this.showLogoutConfirm = false; // Fecha o diálogo
    }
  },
  mounted() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.handleResize);
  },
  watch: {
    '$route'(to) {
      if (to.name === 'escolas') {
        this.pageTitle = 'Gerenciador de Escolas';
        this.isCentered = false;
      } else if (to.name === 'organizacao') {
        this.pageTitle = 'Gerenciador de Organização';
        this.isCentered = false;
      } else if (to.name === 'alunos') {
        this.pageTitle = 'Gerenciador de Alunos';
        this.isCentered = false;
      } else if (to.name === 'aulas') {
        this.pageTitle = 'Gerenciador de Aulas';
        this.isCentered = false;
      } else if (to.name === 'bemVindo') {
        this.isCentered = true; // Centraliza na página de boas-vindas
      } else {
        this.pageTitle = 'Gerenciador de Dados';
        this.isCentered = false;
      }
    }
  }
};
</script>

<style scoped>
/* Layout Principal */
.app-container {
  display: flex;
  font-family: 'Poppins', sans-serif;
  background-color: #f0f4f8;
  min-height: 100vh;
}

/* Menu Lateral */
.sidebar {
  width: 160px;
  background-color: #1a1a1d;
  padding: 20px;
  color: white;
  height: 100vh;
  position: fixed;
  left: 0;
  top: 0;
  transition: transform 0.3s ease, opacity 0.3s ease;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.2);
  transform: translateX(-100%);
  z-index: 1000;
  opacity: 0;
}

.menu-visible {
  transform: translateX(0);
  opacity: 1;
}

.sidebar-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.sidebar-logo {
  max-width: 150px;
  height: auto;
  cursor: pointer;
}

.menu-toggle {
  background: none;
  border: none;
  color: white;
  font-size: 24px;
  cursor: pointer;
}

.sidebar ul {
  list-style: none;
  padding: 0;
}

.sidebar li {
  margin: 10px 0;
  padding: 10px;
  cursor: pointer;
  font-weight: bold;
  border-radius: 4px;
  background-color: #444;
  color: #f0f0f0;
  transition: background-color 0.3s;
}

.sidebar li.active,
.sidebar li:hover {
  background-color: #007bff;
}

.btn-logout {
  margin-top: 20px;
  padding: 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  width: 100%;
}

.btn-logout:hover {
  background-color: #c82333;
}

.main-content {
  margin-left: 175px;
  padding: 20px;
  background-color: #f0f4f8;
  flex-grow: 1;
  transition: margin-left 0.3s ease;
}

.header {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 10px;
  background-color: #ffffff;
  color: #333;
  border-bottom: 2px solid #007bff;
}

.centered-header {
  justify-content: center; /* Centraliza na página de boas-vindas */
}

.logo {
  max-width: 150px;
  height: auto;
  margin-right: 20px;
}

h1 {
  font-size: 24px;
  margin: 0;
  font-family: 'Poppins', sans-serif;
}

.menu-toggle {
  display: none;
  background: none;
  border: none;
  color: #333;
  font-size: 24px;
  cursor: pointer;
  margin-right: 20px;
}

/* Estilos do ícone de menu sanduíche */
.menu-icon {
  color: black; /* Cor padrão do ícone */
}

.menu-icon-white {
  color: white; /* Cor branca quando o menu está aberto */
}

/* Diálogo de confirmação */
.dialog-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.dialog-box {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  text-align: center;
  width: 300px;
}

.dialog-actions {
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}

.confirm-btn {
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.confirm-btn:hover {
  background-color: #c82333;
}

.cancel-btn {
  background-color: #6c757d;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.cancel-btn:hover {
  background-color: #5a6268;
}

@media (max-width: 768px) {
  .main-content {
    margin-left: 0;
  }

  .menu-toggle {
    display: block;
  }
}
</style>
