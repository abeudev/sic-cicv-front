<template>
  <div>
    <v-toolbar flat class="main-nav main-title">
      <v-list class="pa-0">
        <v-list-tile avatar :to="{ name: 'dashboard' }">
          <v-list-tile-avatar>
            <img
              :to="{ name: 'dashboard' }"
              src="@/assets/logo_cicv.png"
              v-if="miniVariant"
            />
          </v-list-tile-avatar>

          <v-list-tile-content>
            <img src="@/assets/logo_cicv.png" style="width: 75%" />
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-toolbar>
    <div v-bar>
      <div>
        <v-list dense class="menu-list">
          <template v-for="menu in menus">
            <v-layout row v-if="menu.heading" align-center :key="menu.heading">
              <v-flex xs6>
                <v-subheader v-if="menu.heading">{{ menu.heading }}</v-subheader>
              </v-flex>
            </v-layout>
            <v-list-group
              v-else-if="menu.children"
              v-model="menu.model"
              :key="menu.name"
              :prepend-icon="menu.icon"
              :append-icon="menu.iconArrow"
            >
              <v-list-tile slot="activator" :key="menu.name">
                <v-list-tile-content>
                  <v-list-tile-title class="font-weight-bold">{{
                    menu.text
                  }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
              <v-tooltip right v-for="child in menu.children" :key="child.name">
                <template v-slot:activator="{ on }">
                  <v-list-tile
                    :to="{ name: child.name }"
                    v-on="miniVariant ? on : null"
                    :key="child.name"
                  >
                    <v-list-tile-action v-if="child.icon">
                      <v-icon v-if="miniVariant" class="caption">{{ child.icon }}</v-icon>
                    </v-list-tile-action>
                    <v-list-tile-content>
                      <v-list-tile-title>{{ child.text }}</v-list-tile-title>
                    </v-list-tile-content>
                  </v-list-tile>
                </template>
                <span>{{ child.text }}</span>
              </v-tooltip>
            </v-list-group>
            <v-tooltip right v-else :key="menu.name">
              <template v-slot:activator="{ on }">
                <v-list-tile :to="{ name: menu.name }" v-on="miniVariant ? on : null">
                  <v-list-tile-action>
                    <v-icon>{{ menu.icon }}</v-icon>
                  </v-list-tile-action>
                  <v-list-tile-content>
                    <v-list-tile-title class="font-weight-bold">{{
                      menu.text
                    }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
              </template>
              <span>{{ menu.text }}</span>
            </v-tooltip>
          </template>
        </v-list>
      </div>
    </div>
    <v-list class="pa-0 footer">
      <v-list-tile v-if="miniVariant" class="hidden-sm-and-down">
        <v-btn icon @click.stop="miniVariant = !miniVariant">
          <v-icon>chevron_right</v-icon>
        </v-btn>
      </v-list-tile>
      <v-list-tile v-if="!miniVariant">
        <v-btn
          icon
          class="toggle-drawer hidden-sm-and-down"
          @click.stop="miniVariant = !miniVariant"
        >
          <v-icon>chevron_left</v-icon>
        </v-btn>
      </v-list-tile>
    </v-list>
  </div>
</template>
<script>
import store from "@/store";
import { mapGetters, mapActions } from "vuex";
import menuItems from "./menuItems";

export default {
  data: () => ({
    miniVariant: store.getters["template/miniVariant"],
    items: [...menuItems],
  }),
  computed: {
    ...mapGetters({
      user: "user/profile",
      menu: "auth/role",
    }),
    menus() {
      /**
       * Check if not super admin, sidebar menu will be filtered
       */
      if (!this.isSuperAdmin()) return this.fetchMenu();
      return this.items;
    },
  },
  watch: {
    /**
     * Observe sidebar state and save it to store
     */
    miniVariant(val) {
      this.setMiniVariant(val);
    },
  },
  methods: {
    /**
     * Import methods from store actions
     */
    ...mapActions({
      setMiniVariant: "template/setMiniVariant",
    }),
    /**
     * Get permitted routes from store then
     * Fetch and match to available sidebar items
     * @returns {Array}
     */
    fetchMenu() {
      const newMenu = [];
      const items = JSON.parse(JSON.stringify(this.items));
      items.forEach((item) => {
        const menus = JSON.parse(JSON.stringify(this.menu.permissions));
        const permitted = menus.some((menu) => menu.name == item.name);
        if (item.heading) {
          const hasHeading = menus.some((menu) => item.names.includes(menu.name));
          if (hasHeading) newMenu.push(item);
        }
        if (item.children) {
          const newChild = item.children.filter((child) =>
            menus.some((menu) => child.name == menu.name)
          );
          item.children = newChild;
          if (newChild.length) newMenu.push(item);
        }
        const isPresent = newMenu.some((menu) => menu.name == item.name);
        if (permitted && !isPresent) newMenu.push(item);
      });
      return newMenu;
    },
  },
};
</script>
