<template>
  <div>
    <v-toolbar flat class="main-nav">
      <span class="title">Notifications</span>
    </v-toolbar>
    <div v-bar>
      <div>
        <v-list subheader class="notification-list">
          <template  v-for="(notif, i) in notifications">
            <v-list-tile
              :key="notif.id"
              avatar
              ripple
              @click="openNotif()"
              :class="notif.isRead ? '' : 'grey lighten-3'"
            >
              <v-list-tile-content>
                <v-list-tile-title>{{ notif.title }}</v-list-tile-title>
                <v-list-tile-sub-title>{{ notif.content }}</v-list-tile-sub-title>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-list-tile-action-text>{{ notif.createdAt }}</v-list-tile-action-text>
              </v-list-tile-action>

            </v-list-tile>
            <v-divider
              v-if="i + 1 < notifications.length"
              :key="i"
            ></v-divider>
          </template>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      notifications: [
        {
          id: "987yfsdhf98sf",
          title: "User Management",
          content: "User 1 archived by Admin",
          isRead: false,
          createdAt: "15 min"
        },
        {
          id: "9867s8dfy87fy",
          title: "Feed Management",
          content: "Feed 5 archived by User 46",
          isRead: false,
          createdAt: "17 min"
        },
        {
          id: "fsidf7896y9f3",
          title: "User Management",
          content: "User 7 archived by Admin",
          isRead: true,
          createdAt: "20 min"
        },
        {
          id: "h8yhgsgosui73",
          title: "Role Management",
          content: "Role 9 archived by Admin",
          isRead: true,
          createdAt: "45 min"
        },
        {
          id: "lsdf987yosdff",
          title: "User Management",
          content: "User 15 archived by Admin",
          isRead: true,
          createdAt: "2 hours"
        }
      ]
    }
  },
  methods: {
    openNotif() {
      return;
    }
  } 
}
</script>