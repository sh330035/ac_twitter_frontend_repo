<template>
  <div class="chatroom-page chat-feature-page">
    <section class="center-view">
      <login-users />
      <chat-window />
    </section>
  </div>
</template>

<script>
import LoginUsers from "../components/chatRoom/LoginUsers.vue";
import ChatWindow from "../components/chatRoom/ChatWindow.vue";

export default {
  name: "Chatroom",
  components: {
    LoginUsers,
    ChatWindow,
  },
};
</script>