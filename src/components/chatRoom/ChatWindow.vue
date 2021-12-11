<template>
  <section class="chat-window">
    <div class="chatroom-banner">
      <h2>公開聊天室</h2>
    </div>
    <div class="message-container">
      <!-- v-for START -->
      <div
        v-for="bubble in chatBubbles"
        :key="bubble.data.eventId"
        class="message-container__chat-bubble"
      >
        <!-- 上線/下線狀態更新 -->
        <div
          v-if="bubble.bubbleType === 'status'"
          class="message-container__chat-bubble__status-pill"
        >
          {{ bubble.data | loginNotification }}
        </div>
        <!-- 回覆訊息 -->
        <template v-if="bubble.bubbleType === 'message'">
          <!-- 他人訊息 -->
          <div
            v-if="bubble.data.user.id !== currentUser.id"
            class="message-container__chat-bubble__received-message"
          >
            <img
              :src="bubble.data.user.avatar"
              class="message-container__chat-bubble__received-message__avatar"
            />
            <div
              class="
                message-container__chat-bubble__received-message__info-wrapper
              "
            >
              <div
                class="
                  message-container__chat-bubble__received-message__info-wrapper__chat-content
                "
              >
                {{ bubble.data.content }}
              </div>
              <div
                class="
                  message-container__chat-bubble__received-message__info-wrapper__time
                "
              >
                {{ bubble.data.createdAt | timeFormatToShort }}
              </div>
            </div>
          </div>
          <!-- 本人送出訊息 -->
          <div
            v-if="bubble.data.user.id === currentUser.id"
            class="message-container__chat-bubble__message-sent"
          >
            <div
              class="message-container__chat-bubble__message-sent__chat-content"
            >
              {{ bubble.data.content }}
            </div>
            <div class="message-container__chat-bubble__message-sent__time">
              {{ bubble.data.createdAt | timeFormatToShort }}
            </div>
          </div>
        </template>
      </div>
      <!-- v-for END -->
    </div>
    <div class="chat-input-box">
      <form
        @submit.stop.prevent="handleFormSubmit"
        action=""
        class="chat-input-box__form"
      >
        <input
          v-model="chatInput"
          type="text"
          class="chat-input-box__form__input"
          placeholder="輸入訊息 ..."
        />
        <button :disabled="isProcessing" type="submit" class="chat-input-box__form__send-btn"></button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'
import { timeFormatToShortFilter } from '../../utils/mixins.js'

const dummyData = {
  onlineHint: {
    eventId: 1,
    id: 5,
    name: 'Hana',
    account: 'user80',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
  },
  message: {
    eventId: 2,
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
    createdAt: new Date(),
    user: {
      id: 7,
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
    }
  },
  offlineHint: {
    eventId: 3,
    id: 10,
    name: 'Adam',
    account: 'user80',
    avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
  },
  historyMessages: [
    {
      chatId: 4,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 7,
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    },
    {
      chatId: 5,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 11,
        avatar: 'https://randomuser.me/api/portraits/men/16.jpg'
      }
    },
    {
      chatId: 6,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 33,
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
      }
    },
    {
      chatId: 7,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 25,
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
      }
    },
  ]
}

// chatBubbles 處理後的資料格式：
// chatBubbles = [
//   { bubbleType: 'message',
//     data: {
//       chatId: 1,
//       content: '',
//       createdAt: new Date(),
//       user: {
//         id: 7,
//         avatar: ''
//       }
//     }
//   },
//   { bubbleType: 'status',
//     data: {
//     status: 'online',
//     id: 5,
//     name: 'Hana',
//     account: 'user80',
//     avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
//     }
//   },
// ]

export default {
  mixins: [timeFormatToShortFilter],
  data() {
    return {
      chatBubbles: [],
      chatInput: '',
      isProcessing: false,
    }
  },
  computed: {
    ...mapState(['currentUser']),
  },
  filters: {
    loginNotification(bubbleData) {
      return bubbleData.status === 'online' ? bubbleData.name + ' 上線' : bubbleData.name + ' 下線'
      // {{ bubble.data.name }} {{ bubble.data.status === 'online' ? '上線' : '下線' }}
    }
  },
  created() {
    const userId = this.currentUser.id
    this.fetchMessages(userId)
    this.socketSubscribeOnlineHint()
    this.socketSubscribeOfflineHint()
    this.socketSubscribeGetMessage()
  },
  methods: {
    fetchMessages(userId) {
      console.log(`現在的使用者 id-${userId}`)
      const historyBubbles = dummyData.historyMessages.map(historyMessage => {
        return {
          bubbleType: 'message',
          data: {
            ...historyMessage,
            eventId: historyMessage.chatId
          }
        }
      })

      this.chatBubbles.push(...historyBubbles)
      console.log(this.chatBubbles)
    },
    // 暫時模仿 subscribe socket 得到有人上線的資訊
    socketSubscribeOnlineHint() {
      // 假設 onlineHint 一次只會回傳一筆 object 資料
      const newStatusMessage = {
        bubbleType: 'status',
        data: {
          ...dummyData.onlineHint,
          status: 'online',
        }
      }
      this.chatBubbles.push(newStatusMessage)
      console.log(this.chatBubbles)
    },
    // 暫時模仿 subscribe socket 得到有人下線的資訊
    socketSubscribeOfflineHint() {
      // 假設 offlineHint 一次只會回傳一筆 object 資料
      const newStatusMessage = {
        bubbleType: 'status',
        data: {
          ...dummyData.offlineHint,
          status: 'offline',
        }
      }
      this.chatBubbles.push(newStatusMessage)
      console.log(this.chatBubbles)
    },
    // 暫時模仿 subscribe socket 得到別人發送的新訊息
    socketSubscribeGetMessage() {
      // 假設 offlineHint 一次只會回傳一筆 object 資料
      const newMessage = {
        bubbleType: 'message',
        data: dummyData.message
      }
      this.chatBubbles.push(newMessage)
      console.log(this.chatBubbles)
    },
    handleFormSubmit() {
      console.log('送出訊息', this.chatInput)
      this.isProcessing = true
      // form validation
      if (this.chatInput.trim().length > 0) {
        const newMessage = {
          bubbleType: 'message',
          data: {
            eventId: -1,
            content: this.chatInput,
            createdAt: new Date(),
            user: {
              avatar: this.currentUser.avatar,
              id: this.currentUser.id
            }
          }
        }
        this.chatBubbles.push(newMessage)
        this.$emit('after-form-submit', {input: this.chatInput} )
        this.chatInput = ''
      } 
      this.isProcessing = false
    },
  }
}
</script>
