<template>
  <div class="messages-page chat-feature-page">
    <section class="center-view">
      <message-inbox />
      <message-window />
    </section>
  </div>
</template>

<script>
import MessageInbox from '../components/chatRoom/MessageInbox.vue'
import MessageWindow from '../components/chatRoom/MessageWindow.vue'

export default {
  name: "Message",
  components: {
    MessageInbox,
    MessageWindow
  },
};
</script>