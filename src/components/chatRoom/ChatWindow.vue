<template>
  <section class="chat-window">
    <div class="chatroom-banner">
      <h2>公開聊天室</h2>
    </div>
    <div class="message-container">
      <!-- v-for START -->
      <div class="message-container__chat-bubble">
        <!-- 上線/下線狀態更新 -->
        <div class="message-container__chat-bubble__status-pill">
          Esther Howard 上線
        </div>
        <!-- 他人訊息 -->
        <div class="message-container__chat-bubble__received-message">
          <img
            src="https://randomuser.me/api/portraits/women/36.jpg"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              id.
            </div>
            <div
              class="
                message-container__chat-bubble__received-message__info-wrapper__time
              "
            >
              下午4:21 - filter
            </div>
          </div>
        </div>

        <div
          class="message-container__chat-bubble__received-message"
          :class="{ sent: true }"
        >
          <img
            src="https://randomuser.me/api/portraits/women/36.jpg"
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
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto,
              id.
            </div>
            <div
              class="
                message-container__chat-bubble__received-message__info-wrapper__time
              "
            >
              下午4:21 - filter
            </div>
          </div>
        </div>
        <!-- 本人送出訊息 -->
        <div class="message-container__chat-bubble__message-sent">
          <div
            class="message-container__chat-bubble__message-sent__chat-content"
          >
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ea, sit.
          </div>
          <div class="message-container__chat-bubble__message-sent__time">
            下午4:21 - filter2
          </div>
        </div>
      </div>
      <!-- v-for END -->
    </div>
    <div class="chat-input-box">
      <form action="" class="chat-input-box__form">
        <input
          type="text"
          class="chat-input-box__form__input"
          placeholder="輸入訊息 ..."
        />
        <button type="submit" class="chat-input-box__form__send-btn"></button>
      </form>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex'

const dummyData = {
  onlineHint: {
    id: 5,
    name: 'Hana',
    account: 'user80',
    avatar: 'https://randomuser.me/api/portraits/women/36.jpg'
  },
  messages: {
    content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
    createdAt: new Date(),
    user: {
      id: 7,
      avatar: 'https://randomuser.me/api/portraits/men/36.jpg'
    }
  },
  historyMessages: [
    {
      chatId: 1,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 7,
        avatar: 'https://randomuser.me/api/portraits/women/3.jpg'
      }
    },
    {
      chatId: 2,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 11,
        avatar: 'https://randomuser.me/api/portraits/men/16.jpg'
      }
    },
    {
      chatId: 3,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 33,
        avatar: 'https://randomuser.me/api/portraits/women/10.jpg'
      }
    },
    {
      chatId: 4,
      content: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.',
      createdAt: new Date(),
      user: {
        id: 25,
        avatar: 'https://randomuser.me/api/portraits/men/6.jpg'
      }
    },
  ]
}

export default {
  data() {
    return {
      chatBubbles: []
    }
  },
  computed: {
    ...mapState(['currentUser'])
  },
  created() {
    const userId = this.currentUser.id
    this.fetchMessages(userId)
  },
  methods: {
    fetchMessages(userId) {
      console.log(`現在的使用者 id-${userId}`)
      this.messages = dummyData.userData
    }
  }
}
</script>
