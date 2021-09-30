<template>
  <div>
    <v-toolbar flat class="main-nav">
      <span class="title">Chat List</span>
      <v-spacer></v-spacer>
      <v-btn icon @click="$parent.closeDrawer()">
        <v-icon>close</v-icon>
      </v-btn>
    </v-toolbar>
    <div v-bar>
      <div>
        <v-list subheader class="chat-list">
          <v-list-tile
            v-for="(user, i) in users"
            :key="i"
            avatar
            @click="openChat(user)"
          >
            <v-list-tile-avatar>
              <v-avatar>
                <g-avatar :value="user.avatar"></g-avatar>
              </v-avatar>
            </v-list-tile-avatar>

            <v-list-tile-content>
              <v-list-tile-title v-html="user.name"></v-list-tile-title>
            </v-list-tile-content>

            <v-list-tile-action>
              <v-icon :color="user.active ? 'teal' : 'grey'">chat_bubble</v-icon>
            </v-list-tile-action>
          </v-list-tile>
        </v-list>
      </div>
    </div>
  </div>
</template>

<script>
import ChatForm from "./ChatForm";
export default {
  components: { ChatForm },
  props: ["users", "user"],
  methods: {
    openChat(user) {
      this.$emit("update:user", user);
      this.$parent.toggleChat();
    }
  }  
}
</script>