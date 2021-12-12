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
            v-if="bubble.data.User.id !== currentUser.id"
            class="message-container__chat-bubble__received-message"
          >
            <img
              :src="bubble.data.User.avatar"
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
            v-if="bubble.data.User.id === currentUser.id"
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

// chatBubbles 處理後的資料格式：
// chatBubbles = [
//   { bubbleType: 'message',
//     data: {
//       eventId: 1,
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
  props: {
    chatBubbles: {
      type: Array,
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      chatInput: '',
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
  methods: {
    handleFormSubmit() {
      console.log('送出訊息', this.chatInput)
      // form validation
      if (this.chatInput.trim().length > 0) {
        this.$emit('after-form-submit', {input: this.chatInput} )
        this.chatInput = ''
      } 
    },
  }
}
</script>
