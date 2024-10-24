<template>
  <q-page class="bem-vindo">
    <q-toolbar class="q-pa-md">
    
    </q-toolbar>

    <q-page-container>
      <q-card class="q-pa-md q-mt-md text-center">
        <div>
          <h1>BEM VINDO AO GERENCIADOR DE DADOS</h1>
          <p>Seu login foi realizado com sucesso, aqui você poderá gerir as informações necessárias para seu sistema operacional.</p>
        </div>

        <!-- Cards de Gerenciamento -->
        <q-card-section>
          <div class="cards-container row justify-center q-gutter-md">
            <!-- Card 1: Gerencie Escolas -->
            <q-card class="card" clickable @click="irParaEscolas" flat bordered>
              <q-card-section>
                <h2>Gerencie Escolas</h2>
                <p>Administre todas as escolas do sistema.</p>
              </q-card-section>
            </q-card>

            <!-- Card 2: Administre Alunos -->
            <q-card class="card" clickable @click="irParaAlunos" flat bordered>
              <q-card-section>
                <h2>Administre Alunos</h2>
                <p>Gerencie os alunos e suas informações.</p>
              </q-card-section>
            </q-card>

            <!-- Card 3: Organize Aulas -->
            <q-card class="card" clickable @click="irParaAulas" flat bordered>
              <q-card-section>
                <h2>Organize Aulas</h2>
                <p>Controle as aulas e seus conteúdos.</p>
              </q-card-section>
            </q-card>

            <!-- Card 4: Gerencie Organizações -->
            <q-card class="card" clickable @click="irParaOrganizacao" flat bordered>
              <q-card-section>
                <h2>Gerencie Organizações</h2>
                <p>Administre as organizações do sistema.</p>
              </q-card-section>
            </q-card>
          </div>
        </q-card-section>

        <!-- Linha azul ao final da página -->
        <div class="linha-azul"></div>
      </q-card>
    </q-page-container>
  </q-page>
</template>

<script>
export default {
  name: 'BemVindoPage',
  methods: {
    irParaEscolas() {
      this.$router.push({ name: 'escolas' });
    },
    irParaAlunos() {
      this.$router.push({ name: 'alunos' });
    },
    irParaAulas() {
      this.$router.push({ name: 'aulas' });
    },
    irParaOrganizacao() {
      this.$router.push({ name: 'organizacao' });
    }
  }
};
</script>

<style scoped>
.bem-vindo {
  text-align: center;
  margin-top: 50px;
  animation: fadeIn 1.5s ease-in-out;
}

.bem-vindo h1 {
  font-size: 3em;
  color: #333;
}

.bem-vindo p {
  font-size: 1.4em;
  color: #666;
}

.cards-container {
  display: flex;
  justify-content: center;
  gap: 40px;
  margin-top: 50px;
}

.card {
  padding: 20px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  text-align: center;
}

.card h2 {
  font-size: 1.5em;
  margin-bottom: 10px;
  color: #007bff;
}

.card p {
  font-size: 1.2em;
  color: #555;
}

.card:hover {
  transform: scale(1.05);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

.linha-azul {
  width: 100%;
  height: 5px;
  background-color: #007bff;
  margin-top: 50px;
}

/* Animações */
@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

/* Responsividade */
@media (max-width: 768px) {
  .cards-container {
    flex-direction: column;
    gap: 20px;
  }

  .card {
    width: 80%;
    margin: 0 auto;
  }
}

@media (max-width: 480px) {
  .bem-vindo h1 {
    font-size: 2em;
  }

  .bem-vindo p {
    font-size: 1.2em;
  }

  .card {
    width: 100%;
  }
}
</style>
