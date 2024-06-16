<template>
  <div>
    <Header />
    <router-view />
  </div>
</template>

<script>
import Header from "../components/molecules/header-nav/header-nav";
import { useModal } from "../services/modal-service";

export default {
  components: {
    Header,
  },
  setup() {
    const modalService = useModal();

    return {
      modalService,
    };
  },
};
</script>
