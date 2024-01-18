<script setup>

  import InputTextVue from '@/components/InputText.vue';
  import InputNumberVue from '@/components/InputNumber.vue';

</script>

<template>
  <section class="login_container">
    <article class="">
      <aside class="login">
        Test
        <!-- <InputTextVue></InputTextVue>
        <InputNumberVue></InputNumberVue> -->
      </aside>
      <aside class="sign_in">
        test
      </aside>
    </article>
  </section>
</template>

<style scoped lang="scss">
  .login_container {
    border: 1px solid red;
    display: flex;

  }

  .login {
    border: 1px solid blue
  }
  .sign_in {
    border: 1px solid red
  }
</style>