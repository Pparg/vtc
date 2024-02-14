<script setup>
  import Avatar from '@/components/Avatar.vue';
  import Icon from '@/components/Icon.vue';
  import OverlayPanel from '@/components/OverlayPanel.vue';

  import { useAuthStore } from '@/store/auth/authStore';
  import { useRouter } from 'vue-router';

  import { logOut } from '@/utils/authentication/index'

  import { ref } from 'vue';

  let store = useAuthStore()
  let current_user = store.getUser

  let router = useRouter()

  let $overlay_panel_account = ref();
  let $overlay_panel_notification = ref()

  let handleAccountMenu = (e) => {
    $overlay_panel_notification.value.hide()
    $overlay_panel_account.value.toggle()
  };
  let handleNotificationMenu = () => {
    $overlay_panel_account.value.hide()
    $overlay_panel_notification.value.toggle()
  };

  let handleLogOut = async () => {
    let request = await logOut()
    if (request.status === 201) {
      store.logOut()
      router.push('/')
    }
  };

</script>

<template>
  <aside class="top_menu flex align-items-center justify-content-end">
    <div class="mr-3 flex align-items-center gap-3 ">
      <Icon :name="'bell'" :size="16" @click="handleNotificationMenu"></Icon>
      <OverlayPanel ref="$overlay_panel_notification" class="mt-5">
          <template #content>
            <div>Hello</div>
          </template>
        </OverlayPanel>
      <Avatar :label="current_user.first_name[0].toUpperCase()" @click="handleAccountMenu" class="cursor-pointer"></Avatar>
      <OverlayPanel ref="$overlay_panel_account" class="mt-5">
        <template #content>
          <div class="flex align-items-center gap-2 cursor-pointer hover_option p-1">
            <Icon :name="'user'"></Icon>
            <p class="p-0 m-0 text-xs">Informations de profil</p>
          </div>
          <div class="flex align-items-center gap-2 cursor-pointer hover_option p-1" @click="handleLogOut">
            <Icon :name="'sign-out'"></Icon>
            <p class="p-0 m-0 text-xs">Déconnexion</p>
          </div>
        </template>
      </OverlayPanel>
    </div>

  </aside>
  
</template>

<style lang="scss">

  @import '../../../../src/assets/styles/global.scss';

  .top_menu {
    height: 50px;
    width: 100%;
    border-bottom: 2px solid $background-light;
  }
  .hover_option:hover {
    font-weight: 700;
  }

</style>