<script setup>
  import Footer from './src/layout/Footer.vue';
  import Header from './src/layout/Header.vue';

</script>

<template>
  <div class="home flex flex-column justify-content-between">
    <Header></Header>
    <main class="content flex overflow-y-hidden">
      <router-view v-slot="{Component}">
        <component :is="Component"></component>
      </router-view>
    </main>
    <Footer></Footer>
  </div>
</template>

<style lang="scss" scoped>

  .home{
    min-height: 100vh;
    height: 100%;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.1s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  main.content {
    height: 100%;
    flex: 1;
    overflow-y: scroll;
  }

</style>