<template>
  <header class="header">
    <div class="container">
      <h1><router-link to="/" exact>Microsoft Manage</router-link></h1>
      <nav>
        <router-link to="/" exact>Projetos</router-link>
        <router-link to="/clientes">Clientes</router-link>
      </nav>
    </div>
  </header>
</template>

<script>
export default {
  components: {},
};
</script>

<style lang="sass">
@import "./header-nav"
</style>
