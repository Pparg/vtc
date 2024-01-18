<script setup>
  import Footer from './src/layout/Footer.vue';
  import Header from './src/layout/Header.vue';

</script>

<template>
  <main class="home">
    <Header></Header>
    <section class="content">
      <router-view v-slot="{Component}">
        <Transition name="fade">
          <component :is="Component"></component>
        </Transition>
      </router-view>
    </section>
    <Footer></Footer>
  </main>
</template>

<style lang="scss" scoped>

  .home{
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity 0.3s;
  }

  .fade-enter, .fade-leave-to {
    opacity: 0;
  }

  section {
    height: 100%;
    flex: 1;
    border: 1px solid;
  }

</style>