<template>
  <section class="projects">
    <div class="container">
      <div class="projects__header">
        <h1>Projetos</h1>
        <button @click="openModal" class="btn btn-primary">
          Adicionar projeto
        </button>
      </div>
      <article class="projects__project-listing">
        <div v-for="(customer, index) in customers" :key="index">
          <div v-for="(project, pIndex) in customer.projects" :key="pIndex">
            <project-item
              :name="project.name"
              :customer="customer.name"
              :status="project.status"
            >
              <router-link :to="{ name: 'Atividades', params: { projectId: project.id } }">
                View Tasks
              </router-link>
            </project-item>
          </div>
        </div>
      </article>
    </div>
    <custom-modal>
      <project-form />
    </custom-modal>
  </section>
</template>

<script>
import ProjectItem from "@/components/molecules/project-item/project-item.vue";
import CustomModal from "@/components/organisms/custom-modal/custom-modal.vue";
import ProjectForm from "@/components/organisms/project-form/project-form.vue";
import { inject } from "vue";

export default {
  name: "ProjectView",
  components: {
    ProjectItem,
    CustomModal,
    ProjectForm,
  },
  data() {
    return {
      projects: [],
    };
  },
  computed: {
    customers() {
      return this.$store.getters.customers;
    }
  },
  setup() {
    const modalService = inject("modalService");

    return {
      modalService,
    };
  },
  methods: {
    openModal() {
      this.modalService.openModal("", "Adicionar projeto");
    }
  },
};
</script>

<style lang="sass">
@import "./projects-view"
</style>
