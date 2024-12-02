<template>
  <q-page padding>
    <!-- Formulário para adicionar ou editar aluno -->
    <q-form @submit.prevent="saveAluno" class="q-pa-md q-mb-md bg-white rounded-borders shadow-2">
      <q-bar class="q-mb-md">
        <q-title>{{ editando ? 'Editar Aluno' : 'Adicionar Aluno' }}</q-title>
      </q-bar>
      <div class="q-gutter-md">
        <q-input
          filled
          v-model="aluno.nome"
          label="Nome"
          hint="Digite o nome"
          @input="formatarNome"
          clearable
          required
        />
        <q-input
          filled
          v-model="aluno.endereco"
          label="Endereço"
          hint="Digite o endereço"
          clearable
          required
        />
        <q-input
          filled
          v-model="aluno.telefone"
          label="Telefone"
          hint="Digite o telefone"
          mask="(##) #####-####"
          clearable
          required
        />
        <q-input
          filled
          v-model="aluno.email"
          label="Email"
          type="email"
          hint="Digite o email"
          clearable
          required
        />
        <q-select
          filled
          v-model="aluno.escolaId"
          :options="escolas.map(escola => ({ label: escola.nome, value: escola.id }))"
          label="Escola"
          hint="Selecione uma escola"
          clearable
          required
        />
        <q-btn
          type="submit"
          label="{{ editando ? 'Atualizar' : 'Adicionar' }} Aluno"
          color="positive"
          unelevated
          class="full-width"
        />
      </div>
    </q-form>

    <!-- Listagem dos alunos -->
    <q-table
      rows="alunos"
      :columns="columns"
      row-key="id"
      class="shadow-2"
    >
      <template v-slot:body-cell-actions="props">
        <q-btn-group flat>
          <q-btn
            icon="edit"
            label="Editar"
            color="primary"
            @click="editarAluno(props.row.id)"
          />
          <q-btn
            icon="close"
            label="Inativar"
            color="warning"
            @click="inativarAluno(props.row.id)"
          />
          <q-btn
            icon="delete"
            label="Excluir"
            color="negative"
            @click="removerAluno(props.row.id)"
          />
        </q-btn-group>
      </template>
    </q-table>
  </q-page>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      alunos: [],
      escolas: [],
      aluno: { id: null, nome: '', endereco: '', telefone: '', email: '', escolaId: null },
      editando: false,
      token: localStorage.getItem("token"),
      columns: [
        { name: "nome", required: true, label: "Nome", align: "left", field: "nome" },
        { name: "endereco", label: "Endereço", align: "left", field: "endereco" },
        { name: "telefone", label: "Telefone", align: "left", field: "telefone" },
        { name: "email", label: "Email", align: "left", field: "email" },
        { name: "escolaNome", label: "Escola", align: "left", field: "escolaNome" },
        { name: "actions", label: "Ações", align: "center" },
      ],
    };
  },
  methods: {
    async fetchAlunos() {
      try {
        const response = await axios.get("http://localhost:3333/alunos", {
          headers: { Authorization: `Bearer ${this.token}` },
        });

        // Adiciona o nome da escola a cada aluno
        this.alunos = response.data.alunos.map((aluno) => ({
          ...aluno,
          escolaNome: this.escolas.find((escola) => escola.id === aluno.escolaId)?.nome || "Não informada",
        }));
      } catch (error) {
        console.error("Erro ao buscar alunos:", error);
      }
    },
    async fetchEscolas() {
      try {
        const response = await axios.get("http://localhost:3333/escolas", {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.escolas = response.data.escolas || [];
      } catch (error) {
        console.error("Erro ao buscar escolas:", error);
      }
    },
    async saveAluno() {
      try {
        let response;
        if (this.editando) {
          response = await axios.put(
            `http://localhost:3333/alunos/${this.aluno.id}`,
            this.aluno,
            { headers: { Authorization: `Bearer ${this.token}` } }
          );
          this.editando = false;
        } else {
          response = await axios.post("http://localhost:3333/alunos", this.aluno, {
            headers: { Authorization: `Bearer ${this.token}` },
          });
        }
        this.fetchAlunos();
        this.resetForm();
        this.$q.notify({
          type: "positive",
          message: response.data.message || "Aluno(a) salvo com sucesso!",
        });
      } catch (error) {
        console.error("Erro ao salvar o aluno(a):", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao salvar o aluno(a). Verifique o console para mais detalhes.",
        });
      }
    },
    editarAluno(id) {
      this.aluno = { ...this.alunos.find((aluno) => aluno.id === id) };
      this.editando = true;
    },
    async removerAluno(id) {
      try {
        await axios.delete(`http://localhost:3333/alunos/${id}`, {
          headers: { Authorization: `Bearer ${this.token}` },
        });
        this.fetchAlunos();
      } catch (error) {
        console.error("Erro ao remover o aluno(a):", error);
        this.$q.notify({
          type: "negative",
          message: "Erro ao remover o aluno(a). Verifique o console para mais detalhes.",
        });
      }
    },
    inativarAluno(id) {
      const aluno = this.alunos.find((aluno) => aluno.id === id);
      if (aluno) {
        aluno.ativo = false;
      }
    },
    resetForm() {
      this.aluno = { id: null, nome: '', endereco: '', telefone: '', email: '', escolaId: null };
    },
  },
  async created() {
    await this.fetchAlunos();
    await this.fetchEscolas();
  },
};
</script>

<style scoped>
.full-width {
  width: 100%;
}
</style>
