<script setup>

</script>

<template>
  <footer>
    <ul>
      <li>Mentions légales</li>
      <li>Plan du site</li>
      <li>Mon compte</li>
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