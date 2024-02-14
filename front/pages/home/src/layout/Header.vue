<script setup>
  import Button from '@/components/Button.vue';
  import Link from '@/components/Link.vue';

  let props = defineProps({
    context: String,
    required: false
  });

</script>

<template>
  <header class="header">
    <nav>
      <Link :to="{name: 'home'}">
        <template #content>
          <h1>63VTC</h1>          
        </template>
      </Link>
      <Button v-if="!context" :label="'Se connecter'" :type="'navigation'" :to="{name: 'home_login'}"></Button>
    </nav>
  </header>
</template>

<style lang="scss" scoped>

  @import '../../../../src/assets/styles/global.scss';
  .header {
    background-color: $background-light;
    border-bottom: 1px solid $border;
    height: $header-height;
    nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 5px 20px 5px 20px;
      h1{
        margin: 0;
        font-size: 36px;
        font-family: 'Montserrat';
        font-weight: 800;
      }
    }
  }
</style>