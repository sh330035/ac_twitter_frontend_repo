<template>
  <div class="chatroom-page chat-feature-page">
    <section class="center-view">
      <login-users />
      <chat-window @after-form-submit="emitTest" />
    </section>
  </div>
</template>

<script>
import LoginUsers from "../components/chatRoom/LoginUsers.vue"
import ChatWindow from "../components/chatRoom/ChatWindow.vue"
import { mapState } from 'vuex'

export default {
  name: "Chatroom",
  components: {
    LoginUsers,
    ChatWindow,
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    this.$socket.open() 
    // 上線發出訊息報到
    this.$socket.emit('onlineHint', this.currentUser.name)
    // 接收所有人的發出的 login 訊息
    this.$socket.on('reportHint', (userName) => {
      console.log('有人上線了', userName)
    })
    // 嘗試用另一種訂閱 channel 的方式接收所有人的發出的 login 訊息
    this.sockets.subscribe('reportHint', userName => {
      console.log('從訂閱頻道收到有人上線', userName)
    })
  },
  methods: {
    emitTest({input}) {
    console.log(`1 -- function -- view is going to sent ${input} to socket`)
    this.$socket.emit('getMessage', input )
    }
  },
  sockets:{
    reportHint: (userName) => {
      console.log('把已上線的使用者 push 進 chat bubble Array', userName)
    },
    testMessage: (data) => {
      console.log('2 -- 接收 -- 有新消息', data)
    }
  }
};
</script>