<template>
  <q-page class="login-container">
    <q-card class="login-form">
      <q-card-section>
        <h2 class="text-center">Bem-vindo</h2>
      </q-card-section>
      <q-card-section>
        <q-form @submit.prevent="handleLogin" class="q-gutter-md">
          <!-- Campo de email -->
          <q-input
            filled
            v-model="email"
            label="Email"
            type="email"
            :rules="[val => !!val || 'Email é obrigatório']"
            placeholder="Digite seu email"
            clearable
          />
          <!-- Campo de senha -->
          <q-input
            filled
            v-model="password"
            label="Senha"
            type="password"
            :rules="[val => !!val || 'Senha é obrigatória']"
            placeholder="Digite sua senha"
            clearable
          />
          <!-- Botão de login -->
          <q-btn
            type="submit"
            label="Entrar"
            color="primary"
            class="full-width"
            :loading="loading"
          />
        </q-form>
      </q-card-section>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios'; // Importa o Axios
import { setAuthentication } from '../router'; // Certifique-se de importar a função

export default {
  data() {
    return {
      email: '',
      password: '',
      loading: false, // Controla o estado de carregamento
    };
  },
  methods: {
    async handleLogin() {
      this.loading = true; // Ativa o estado de carregamento
      try {
        const response = await axios.post('http://localhost:3333/login', {
          email: this.email,
          password: this.password,
        });

        const data = response.data;
        console.log('Login realizado com sucesso:', data);

        // Atualize o estado de autenticação e armazene o token
        setAuthentication(true);
        localStorage.setItem('token', data.token);

        // Limpa os campos após o login
        this.email = '';
        this.password = '';

        // Redireciona para a página de boas-vindas
        this.$router.push('/bemvindo');
      } catch (error) {
        // Captura e exibe a mensagem de erro
        const errorMessage = error.response?.data?.message || 'Verifique suas credenciais.';
        this.$q.notify({ type: 'negative', message: `Erro ao realizar login: ${errorMessage}` });
      } finally {
        this.loading = false; // Desativa o estado de carregamento
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f0f2f5;
}

.login-form {
  width: 100%;
  max-width: 400px;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}
.full-width {
  width: 100%;
}
</style>
