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
              <router-link
                :to="{ name: 'Atividades', params: { projectId: project.id } }"
              >
                Ver atividades
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 32 32"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 24L20 16L12 8"
                    stroke="black"
                    stroke-width="2"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              </router-link>
            </project-item>
          </div>
        </div>
      </article>
    </div>
    <custom-modal>
      <template #header>Adicionar projeto</template>
      <project-form @close-modal="closeModal" />
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
      return this.$store.getters["customerModule/customers"];
    },
  },
  setup() {
    const modalService = inject("modalService");

    return {
      modalService,
    };
  },
  methods: {
    openModal() {
      this.modalService.openModal("");
    },
    closeModal() {
      this.modalService.closeModal();
    },
  },
};
</script>

<style lang="sass">
@import "./projects-view"
</style>
