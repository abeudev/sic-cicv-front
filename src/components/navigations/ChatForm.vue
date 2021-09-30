<template>
  <div>
    <v-list class="title font-weight-regular">
      <v-list-tile>
        <v-list-tile-avatar>
          <v-avatar>
            <v-btn icon @click="closeChat()">
              <v-icon>chevron_left</v-icon>
            </v-btn>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-avatar>
          <v-avatar>
            <g-avatar :value="user.avatar"></g-avatar>
          </v-avatar>
        </v-list-tile-avatar>
        <v-list-tile-content>
          <v-list-tile-title>{{ userData.name }}</v-list-tile-title>
        </v-list-tile-content>
      </v-list-tile>
    </v-list>
    <div v-bar>
      <div id="chat-message-wrapper">
        <div dense class="chat-message-list">
          <div class="msg" v-for="(msg, i) in userData.chatData" :key="i">
            <div 
              class="bubble" 
              :class="{ 
                alt: msg.isSelf, 
                follow: isFollowing(msg.isSelf, i) 
              }"
            >
              <div class="txt">
                <!-- <span class="name" :class="msg.isSelf ? 'alt' : ''">Mike</span> -->
                <span class="timestamp">{{ msg.createdAt }}</span>      
                <span class="message">
                  {{ msg.message }}
                </span>
              </div>
              <div class="bubble-arrow" :class="msg.isSelf ? 'alt' : ''" v-if="!isFollowing(msg.isSelf, i)"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="pa-2 footer">
      <v-layout row wrap>
        <v-flex xs12>
          <v-form ref="form" @submit.prevent="sendMessage()">
            <v-text-field 
              label="Type your message here" 
              v-model="chatText.message"
              append-icon="send"
              @click:append="sendMessage()"
            ></v-text-field>
          </v-form>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
export default {
  props: ["user"],
  data: () => ({
    userData: {
      chatData: []
    },
    chatText: {
      message: "",
      isSelf: true,
      created: ""
    },
    randomMessages: [
      "Hi!", "Hello!", "Okay",
      "Hey! I'm fine. Thanks for asking!",
      "Hello. How are you today?",
      "Sweet! So, what do you wanna do today?"
    ]
  }),
  computed: mapGetters({
    timeAndRegion: "config/timeAndRegion"
  }),
  mounted() {
    this.userData = this.user;
  },
  methods: {
    /**
     * Toggle chat from parent method
     */
    closeChat() {
      this.$parent.toggleChat();
    },

    /**
     * Send message and random reply
     */
    sendMessage() {
      if (this.chatText.message) {
        this.chatText.createdAt = this.timeZone(this.$moment(), 'H:mm z');
        this.userData.chatData.push(this.chatText);
        this.sendRandomReply();
        this.reset();
        this.$nextTick(() => {
          this.updateScroll();
        });
      }
    },

    /**
     * Create random reply
     */
    sendRandomReply() {
      const randMsg = this.randomMessages[Math.floor(Math.random() * this.randomMessages.length)];
      setTimeout(() => {
        this.userData.chatData.push({
          message: randMsg,
          isSelf: false,
          createdAt: this.timeZone(this.$moment(), 'H:mm z')
        });
        this.$emit("update:user", this.userData);
        this.$nextTick(() => {
          this.updateScroll();
        });
      }, 700);
    },

    /**
     * Check if next message from same sender
     */
    isFollowing(current, i) {
      const prev = this.userData.chatData[i - 1];
      if (!prev) return false;
      return current == prev.isSelf;
    },

    /**
     * Reset chat message
     */
    reset() {
      this.chatText = {
        message: "",
        isSelf: true
      }
    },

    /**
     * Scroll to bottom
     */
    updateScroll(){
      let $el = document.getElementById("chat-message-wrapper");
      $el.scrollTop = $el.scrollHeight;
    }
  }
}
</script> 