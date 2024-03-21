<script setup>

</script>

<template>
  <footer>
    <ul>
      <Link :to="{name: 'vtc_legals'}">
        <template #content>
          <span>Mentions légales</span>
        </template>
      </Link>
      <Link :to="{name: 'dashboard'}">
        <template #content>
          <span>Mon compte</span>
        </template>
      </Link>
    </ul>
  </footer>
</template>

<style lang="scss" scoped>
 @import '../../../../src/assets/styles/global.scss';
 
 footer {
  background-color: $background-light;
  border-top: 1px solid $border;
  height: $footer-height;
  ul {
    margin: 0;
    padding: 5px 20px;
    display: flex;
    list-style: none;
    align-items: center;
    justify-content: space-between;
    li {
      font-size: 14px;
    }
  }
 }
</style>