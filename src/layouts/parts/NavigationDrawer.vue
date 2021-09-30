<template>
  <div>
    <!-- Left Drawer -->
    <v-navigation-drawer
      fixed
      app
      :mini-variant="miniVariant"
      :clipped="clipped"
      v-model="drawer"
      mobile-break-point="768"
      class="genno-left-drawer"
    >
      <menu-list></menu-list>
    </v-navigation-drawer>

    <!-- Right Drawer -->
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      :clipped="clipped"
      app
      mobile-break-point="768"
      class="genno-right-drawer"
    >
      <chat-wrapper :drawer.sync="drawerRight" />
    </v-navigation-drawer>

    <!-- Float Drawer -->
    <v-navigation-drawer
        v-model="floatDrawer"
        temporary
        right
        fixed
        class="genno-float-drawer"
      >
      <notifications />
    </v-navigation-drawer>

    <!-- Top Navbar -->
    <v-toolbar
      app
      fixed
      :clipped-right="clipped"
      :clipped-left="clipped"
      class="elevation-0 main-nav"
    > 
      <v-toolbar-title class="main-toolbar ml-0">
        <v-toolbar-side-icon 
          @click.stop="drawer = !drawer"
          class="hidden-md-and-up"
        ></v-toolbar-side-icon>
        {{ $route.meta.title }}
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items>
        <v-btn icon @click.stop="floatDrawer = !floatDrawer">
          <v-badge overlap color="red accent-2">
            <template v-slot:badge>2</template>
            <v-icon large color="grey darken-1" >
              notifications
            </v-icon>
          </v-badge>
        </v-btn>
        <v-btn icon @click.stop="drawerRight = !drawerRight">
          <v-badge overlap color="red accent-2">
            <template v-slot:badge>2</template>
            <v-icon large color="grey darken-1" >
              chat_bubble
            </v-icon>
          </v-badge>
        </v-btn>
        <v-menu offset-y>
          <template v-slot:activator="{ on }">
            <v-btn flat class="text-capitalize hidden-sm-and-down" v-on="on">
              <v-avatar class="mr-2">
                <img :src="profilePicture" v-if="user.useImage">
                <g-avatar :value="profilePicture" v-else />
              </v-avatar>
              {{user.firstName}} {{user.lastName || ''}}
            </v-btn>
          </template>

          <v-list>
            <v-list-tile :to="{name: 'userProfile'}">
              <v-list-tile-title>Profile</v-list-tile-title>
            </v-list-tile>
            <v-list-tile :to="{name: 'logout'}">
              <v-list-tile-title>Logout</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
      </v-toolbar-items>
    </v-toolbar>
  </div>
</template>

<script>
  import store from '@/store'
  import { mapGetters, mapActions } from 'vuex'
  import MenuList from './MenuItemList'
  import ChatWrapper from '../../components/navigations/ChatWrapper'
  import Notifications from '../../components/navigations/Notifications'
  export default {
    components: { MenuList, ChatWrapper, Notifications },
    data: () => ({
      drawer: store.getters['template/drawer'],
      drawerRight: store.getters['template/drawerRight'],
      clipped: store.getters['template/clipped'],
      floatDrawer: store.getters['template/floatDrawer']
    }),
    /**
     * Observe each layout state
     * then save it to store
     */
    watch: {
      drawer (val) {
        this.setDrawer(val)
      },
      drawerRight (val) {
        this.setDrawerRight(val)
      },
      clipped (val) {
        this.setClipped(val)
      },
      floatDrawer (val) {
        this.setFloatDrawer(val)
      }
    },
    computed: {
      ...mapGetters({
        user: 'user/profile',
        miniVariant: "template/miniVariant"
      }),
      profilePicture() {
        return !this.user.useImage ? this.user.avatar : `${this.user.image}?v=${this.$moment().format("x")}`;
      }
    },
    methods: {
      ...mapActions({
        setDrawer: 'template/setDrawer',
        setDrawerRight: 'template/setDrawerRight',
        setClipped: 'template/setClipped',
        setFloatDrawer: 'template/setFloatDrawer'
      })
    }
  }
</script>
