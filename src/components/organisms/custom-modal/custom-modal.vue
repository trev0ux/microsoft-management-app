<template>
    <div
      class="modal fade custom-modal"
      v-if="modalService.modalState.value.isVisible"
      :class="{ show: modalService.modalState.value.isVisible }"
      style="display: block"
      tabindex="-1"
      role="dialog"
    >
      <div class="modal-dialog modal-lg">
        <div class="modal-content">
          <div class="modal-header custom-modal__header">
            <h5 class="modal-title"><slot name="header"></slot></h5>
            <button
              type="button"
              class="btn-close"
              @click="closeModal"
              aria-label="Close"
            ></button>
          </div>
          <section class="modal-body custom-modal__body">
            <slot></slot>
          </section>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import { inject } from "vue";
  
  export default {
    props: {
      place: {
        type: Object,
      },
    },
    setup() {
      const modalService = inject("modalService");
  
      const closeModal = () => {
        modalService.closeModal();
      };
  
      const visible = modalService.modalState.value.isVisible;
  
      return {
        modalService,
        visible,
        closeModal,
      };
    },
  };
  </script>
  
  <style lang="scss" scoped>
  </style>
  