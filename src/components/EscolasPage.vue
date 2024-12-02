<template>
  <q-page class="q-pa-md">
    <q-card flat bordered class="q-pa-md">
      <!-- Formulário para adicionar ou editar escola -->
      <q-form @submit.prevent="saveEscola" class="q-gutter-md">
        <q-input
          filled
          v-model="escola.nome"
          label="Nome"
          :rules="[val => !!val || 'Nome é obrigatório']"
          @input="formatarNome"
        />
        <q-input
          filled
          v-model="escola.endereco"
          label="Endereço"
          :rules="[val => !!val || 'Endereço é obrigatório']"
        />
        <div class="q-gutter-md row">
          <q-input
            filled
            v-model="escola.cep"
            label="CEP"
            mask="#####-###"
            :rules="[val => !!val || 'CEP é obrigatório']"
            class="col-6"
          />
          <q-input
            filled
            v-model="escola.telefone"
            label="Telefone"
            mask="(##) #####-####"
            :rules="[val => !!val || 'Telefone é obrigatório']"
            class="col-6"
          />
        </div>
        <q-input
          filled
          v-model="escola.email"
          label="Email"
          type="email"
          :rules="[val => !!val || 'Email é obrigatório']"
        />
        <q-btn
          color="primary"
          label="Salvar Escola"
          type="submit"
          :loading="salvando"
        />
        <q-banner v-if="errorMessage" dense class="q-mt-md" color="red">
          {{ errorMessage }}
        </q-banner>
      </q-form>
    </q-card>

    <!-- Listagem das escolas -->
    <q-card flat bordered class="q-mt-md">
      <q-table
        title="Lista de Escolas"
        :rows="escolas"
        :columns="columns"
        row-key="id"
        no-data-label="Nenhuma escola encontrada"
      >
        <template v-slot:body-cell-actions="props">
          <q-btn
            flat
            icon="edit"
            color="blue"
            @click="editarEscola(props.row)"
            size="sm"
          />
          <q-btn
            flat
            icon="delete"
            color="red"
            @click="removerEscola(props.row.id)"
            size="sm"
          />
        </template>
      </q-table>
    </q-card>
  </q-page>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      escolas: [],
      escola: { nome: '', endereco: '', cep: '', telefone: '', email: '' },
      salvando: false,
      errorMessage: '',
      columns: [
        { name: 'nome', required: true, label: 'Nome', align: 'left', field: 'nome' },
        { name: 'endereco', label: 'Endereço', align: 'left', field: 'endereco' },
        { name: 'cep', label: 'CEP', align: 'center', field: 'cep' },
        { name: 'telefone', label: 'Telefone', align: 'center', field: 'telefone' },
        { name: 'email', label: 'Email', align: 'left', field: 'email' },
        { name: 'actions', label: 'Ações', align: 'center', field: 'actions', sortable: false },
      ],
    };
  },
  methods: {
    async fetchEscolas() {
      try {
        const response = await axios.get('http://localhost:3333/escolas');
        this.escolas = response.data.escolas || [];
      } catch (error) {
        console.error('Erro ao buscar escolas:', error);
        this.errorMessage = 'Erro ao buscar escolas. Verifique o console para mais detalhes.';
      }
    },
    async saveEscola() {
      this.errorMessage = '';
      this.salvando = true;
      try {
        if (this.escola.id) {
          await axios.put(`http://localhost:3333/escolas/${this.escola.id}`, this.escola);
        } else {
          await axios.post('http://localhost:3333/escolas', this.escola);
        }
        await this.fetchEscolas();
        this.resetForm();
        this.$q.notify({ type: 'positive', message: 'Escola salva com sucesso!' });
      } catch (error) {
        console.error('Erro ao salvar a escola:', error);
        this.errorMessage = 'Erro ao salvar a escola. Verifique o console para mais detalhes.';
      } finally {
        this.salvando = false;
      }
    },
    editarEscola(row) {
      this.escola = { ...row };
    },
    async removerEscola(id) {
      try {
        await axios.delete(`http://localhost:3333/escolas/${id}`);
        await this.fetchEscolas();
        this.$q.notify({ type: 'positive', message: 'Escola removida com sucesso!' });
      } catch (error) {
        console.error('Erro ao remover a escola:', error);
        this.$q.notify({ type: 'negative', message: 'Erro ao remover a escola!' });
      }
    },
    resetForm() {
      this.escola = { nome: '', endereco: '', cep: '', telefone: '', email: '' };
    },
  },
  async created() {
    await this.fetchEscolas();
  },
};
</script>

<style scoped>
/* Estilo adicional, se necessário */
</style>
