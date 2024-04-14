<script setup>

  import { useAuthStore } from '@/store/auth/authStore';

  let emit = defineEmits(['closePanel']) 

  let user = useAuthStore();
  let user_role = user.getUser.role;

  let close = () => {
    emit('closePanel')
  };

</script>

<template>
  <header class="left_menu flex flex-column">
    <aside class="flex flex-row align-items-center pt-2 justify-content-between px-4">
      <Link :to="{ name: 'home_main' }">
        <template #content>
          <h2 class="m-0 text-center">63 VTC</h2>
        </template>
      </Link>
      <Icon :name="'times'" :size="14" @click="close" class="close_icon" />
    </aside>
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
        <Link :to="{ name: 'user_reservation' }" v-if="['admin', 'user'].includes(user_role)">
        <template #content>
          <div class="flex align-items-center gap-2 font-normal">
            <Icon :name="'bolt'"></Icon>
            <p class="p-0 m-0">Mes courses</p>
          </div>
        </template>
        </Link>
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
  @import '../../../../src/assets/styles/responsive.scss';

  .left_menu {
    background-color: $background-light;
    width: 100%;
    height: 100%;
    position: absolute;
    @include medium-screen {
      width: 30%;
    }
    @include large-screen {
      position: relative;
      max-width: 170px;
      height: 100vh;
    }
  }

</style>