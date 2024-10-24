<template>
  <div class="login-container">
    <div class="login-form">
      <h2>Bem-vindo</h2>
      <form @submit.prevent="handleLogin">
        <div class="form-group">
          <label for="email">Email</label>
          <input
            id="email"
            type="email"
            v-model="email"
            placeholder="Digite seu email"
            required
          />
        </div>
        <div class="form-group">
          <label for="password">Senha</label>
          <input
            id="password"
            type="password"
            v-model="password"
            placeholder="Digite sua senha"
            required
          />
        </div>
        <button type="submit" class="btn-login">Entrar</button>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'; // Importa o Axios
import { setAuthentication } from '../router'; // Certifique-se de importar a função

export default {
  data() {
    return {
      email: '',
      password: '',
    };
  },
  methods: {
    async handleLogin() {
      try {
        const response = await axios.post('http://localhost:3333/login', {
          email: this.email,
          password: this.password,
        });

        // Não é mais necessário verificar o status com response.ok, pois o Axios já lança um erro para status de resposta não 2xx.
        const data = response.data;
        console.log('Login realizado com sucesso:', data);
        
        // Atualize o estado de autenticação e armazene o token se necessário
        setAuthentication(true); // Define a autenticação como verdadeira
        localStorage.setItem('token', data.token); // Armazene o token de autenticação

        // Limpa os campos após o login
        this.email = '';
        this.password = '';

        // Redireciona para a página de boas-vindas
        this.$router.push('/bemvindo');
      } catch (error) {
        // Captura e exibe a mensagem de erro
        const errorMessage = error.response?.data?.message || 'Verifique suas credenciais.';
        alert(`Erro ao realizar login: ${errorMessage}`);
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
  height: 60vh;
  background-color: #f0f2f5;
}

.login-form {
  background-color: #ffffff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  margin-top: 170px; /* Reduz o espaço acima do formulário */
}

h2 {
  text-align: center;
  margin-bottom: 20px;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  box-sizing: border-box;
}

.btn-login {
  width: 100%;
  padding: 10px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 16px;
  font-weight: bold;
}

.btn-login:hover {
  background-color: #218838;
}
</style>
