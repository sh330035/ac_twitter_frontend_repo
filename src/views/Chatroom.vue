<template>
  <div class="chatroom-page chat-feature-page">
    <section class="center-view">
      <login-users :chat-bubbles="chatBubbles" />
      <chat-window
        @after-form-submit="emitMessageToSocket"
        :chat-bubbles="chatBubbles"
        :is-processing="isProcessing"
      />
    </section>
  </div>
</template>

<script>
import LoginUsers from "../components/chatRoom/LoginUsers.vue"
import ChatWindow from "../components/chatRoom/ChatWindow.vue"
import { mapState } from 'vuex'

// const dummyData = {
//   onlineHint: {
//     eventId: 1,
//     id: 5,
//     name: 'Hana',
//     account: 'user80',
//     avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
//   },
//   message: {
//     eventId: 2,
//     content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
//     createdAt: new Date(),
//     User: {
//       id: 7,
//       avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
//     }
//   },
//   offlineHint: {
//     eventId: 3,
//     id: 10,
//     name: 'Adam',
//     account: 'user80',
//     avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
//   },
//   historyMessages: [
//     {
//       eventId: 4,
//       content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
//       createdAt: new Date(),
//       User: {
//         id: 7,
//         avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
//       }
//     },
//   ]
// }

export default {
  name: "Chatroom",
  components: {
    LoginUsers,
    ChatWindow,
  },
  data() {
    return {
      chatBubbles: [],
      isProcessing: false,
    }
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    // 獲取歷史訊息 
    this.fetchHistoryMessages()
    // 接收所有人的發出的 上線 訊息
    this.catchOnlineHint()
    // 接收所有人的 離線 訊息
    this.catchOfflineHint()
    // 接收所有人發出的 message 訊息
    this.catchMessage()
  },
  methods: {
    fetchHistoryMessages() {
      this.sockets.subscribe('getChatHistory', historyMessages => {
        const historyBubbles = historyMessages.map(historyMessage => {
          return {
            bubbleType: 'message',
            data: {
              ...historyMessage,
              eventId: historyMessage.id
            }
          }
        })
        this.chatBubbles.push(...historyBubbles)
        console.log('chatBubbles Array:', this.chatBubbles)
      })

    },
    catchOnlineHint() {
      // 接收所有人的發出的 login 訊息
      this.sockets.subscribe('onlineHint', profile => {
        console.log(profile, '上線此資料將被儲存')
        const newStatusMessage = {
          bubbleType: 'status',
          data: {
            ...profile,
            status: 'online',
            eventId: 'online' + profile.id
          }
        }
        this.chatBubbles.push(newStatusMessage)
        console.log('chatBubbles Array:', this.chatBubbles)
      })
    },
    catchOfflineHint() {
      // 接收所有人的發出的 離線 訊息
      this.sockets.subscribe('offlineHint', profile => {
        console.log(profile, '離線此資料將被儲存')
        const newStatusMessage = {
          bubbleType: 'status',
          data: {
            ...profile,
            status: 'offline',
            eventId: 'offline' + profile.id
          }
        }
        this.chatBubbles.push(newStatusMessage)
        console.log('chatBubbles Array:', this.chatBubbles)
      })
    },
    emitMessageToSocket({ input }) {
      this.isProcessing = true
      console.log(`1 -- function -- view is going to sent ${input} to socket`)
      this.$socket.emit('getMessage', { content: input, user: { id: this.currentUser.id, name: this.currentUser.name, avatar: this.currentUser.avatar, account: this.currentUser.account } })
      this.isProcessing = false
    },
    catchMessage() {
      // 接收所有人發出的 message 訊息
      this.sockets.subscribe('getMessage', receivedData => {
        const newMessage = {
          bubbleType: 'message',
          data: {
            ...receivedData,
            eventId: receivedData.id,
          }
        }
        this.chatBubbles.push(newMessage)
        console.log('chatBubbles Array:', this.chatBubbles)
      })
    },
  },
  sockets: {
    onlineHint: (profile) => {
      console.log('已進入聊天室', profile)
    },
    offlineHint: (profile) => {
      console.log('已離開聊天室', profile)
    },
    getMessage: (receivedData) => {
      console.log('2 -- 接收 -- 有新消息', receivedData)
    },
    getChatHistory: (messages) => {
      console.log('得到 msg 歷史資料', messages)
    }
  }
};
</script>