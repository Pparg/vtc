<script setup>
  import Icon from '@/components/Icon.vue';
  import Avatar from '@/components/Avatar.vue';
  import Link from '@/components/Link.vue';

  import { useAuthStore } from '@/store/auth/authStore';

  let user = useAuthStore();
  let user_role = user.getUser.role;

</script>

<template>
  <header class="w-3 h-screen left_menu flex flex-column">
    <Link :to="{name: 'home_main'}">
    <template #content>
      <h2 class="m-0 text-center pt-2">63 VTC</h2>
    </template>
    </Link>
    <nav class="flex-1">
      <ul class="list-none p-0 ml-3 mt-5 flex flex-column gap-4">
        <Link :to="{ name: 'dashboard' }">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'home'"></Icon>
            <p class="p-0 m-0">Accueil</p>
          </div>
        </template>
        </Link>
        <li class="flex flex-row align-items-center gap-2 cursor-pointer">
          <Icon :name="'bolt'"></Icon>
          <p class="p-0 m-0">Mes courses</p>
        </li>
        <Link :to="{ name: 'user_address' }" v-if="['admin', 'user'].includes(user_role)">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'bookmark'"></Icon>
            <p class="p-0 m-0">Mes addresses</p>
          </div>
        </template>
        </Link>
        <Link :to="{ name: 'availability_overwiew' }" v-if="['chofer'].includes(user_role)">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'calendar'"></Icon>
            <p class="p-0 m-0">Disponibilitées</p>
          </div>
        </template>
        </Link>
        <Link :to="{ name: 'roles' }" v-if="user.isAdmin">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'verified'"></Icon>
            <p class="p-0 m-0">Rôles</p>
          </div>
        </template>
        </Link>
        <Link :to="{ name: 'list_of_users' }" v-if="user.isAdmin">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'users'"></Icon>
            <p class="p-0 m-0">Utilisateurs</p>
          </div>
        </template>
        </Link>
        <Link :to="{name: 'list_of_cars'}" v-if="user.isAdmin">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'car'"></Icon>
            <p class="p-0 m-0">Véhicules</p>
          </div>
        </template>
        </Link>
        <Link :to="{name: 'notification_list'}" v-if="user.isAdmin">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'info-circle'" />
            <p class="p-0 m-0">Notifications</p>
          </div>
        </template>
        </Link>
      </ul>
    </nav>
  </header>
</template>

<style lang="scss">
  
  @import '../../../../src/assets/styles/global.scss';

  .left_menu {
    background-color: $background-light;
    border-right: 1px solid $border;
    max-width: 200px;
  }
</style>