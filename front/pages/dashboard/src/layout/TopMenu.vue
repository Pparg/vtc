<script setup>
  import Avatar from '@/components/Avatar.vue';
  import Icon from '@/components/Icon.vue';
  import OverlayPanel from '@/components/OverlayPanel.vue';
  import Link from '@/components/Link.vue';

  import { useAuthStore } from '@/store/auth/authStore';
  import { useRouter } from 'vue-router';

  import { logOut } from '@/utils/authentication/index'

  import { ref } from 'vue';
  import { user_get as getNotifications, getNotificationStyle } from '@/utils/notifications';

  let emit = defineEmits(['handleMenu'])

  let notifications = await getNotifications()

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
  <aside class="top_menu flex align-items-center justify-content-between">
    <div class="ml-3">
      <Icon name="bars" :size="16" @click="emit('handleMenu')" />
    </div>
    <div class="flex align-items-center gap-3 mr-3 ">
      <Icon :name="'bell'" :size="16" @click="handleNotificationMenu"></Icon>
      <OverlayPanel ref="$overlay_panel_notification" class="mt-5 w-4">
        <template #content>
          <aside class="max-h-10rem overflow-scroll flex flex-column gap-3">
            <div v-for="notification in notifications.data" class="notification_container">
              <div class="flex align-items-center gap-2">
                <h5 class="m-0">{{ notification.title }}</h5>
                <span v-if="notification.type" class="p-1 border-circle flex" :style="{ backgroundColor: getNotificationStyle[notification.type].bg_color }">
                  <Icon :name="getNotificationStyle[notification.type].icon" />
                </span>
              </div>
              <p class="m-0 mt-2 text-sm">{{ notification.content }}</p>
            </div>
          </aside>
        </template>
      </OverlayPanel>
      <Avatar :label="current_user.first_name[0].toUpperCase()" @click="handleAccountMenu" class="cursor-pointer">
      </Avatar>
      <OverlayPanel ref="$overlay_panel_account" class="mt-5">
        <template #content>
          <Link :to="{name: 'account'}" @click="$overlay_panel_account.hide()">
          <template #content>
            <div class="flex align-items-center gap-2 cursor-pointer hover_option p-1">
              <Icon :name="'user'"></Icon>
              <p class="p-0 m-0 text-xs">Informations de profil</p>
            </div>
          </template>
          </Link>
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

  .notification_container {
    border-bottom: 1px solid ;
    padding-bottom: 5px;
  }

</style>