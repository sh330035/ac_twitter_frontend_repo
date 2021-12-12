<template>
  <div class="chatroom-page chat-feature-page">
    <section class="center-view">
      <login-users />
      <chat-window
        @after-form-submit="emitMessageToSocket"
        :chat-bubbles="chatBubbles"
        :is-processing="isProcessing"
      />
    </section>
  </div>
</template>

<script>
import LoginUsers from "../components/chatRoom/LoginUsers.vue";
import ChatWindow from "../components/chatRoom/ChatWindow.vue";
import { mapState } from "vuex";

const dummyData = {
  onlineHint: {
    eventId: 1,
    id: 5,
    name: "Hana",
    account: "user80",
    avatar: "https://randomuser.me/api/portraits/women/36.jpg",
  },
  message: {
    eventId: 2,
    content:
      "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.",
    createdAt: new Date(),
    User: {
      id: 7,
      avatar: "https://randomuser.me/api/portraits/men/36.jpg",
    },
  },
  offlineHint: {
    eventId: 3,
    id: 10,
    name: "Adam",
    account: "user80",
    avatar: "https://randomuser.me/api/portraits/men/36.jpg",
  },
  historyMessages: [
    {
      eventId: 4,
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.",
      createdAt: new Date(),
      User: {
        id: 7,
        avatar: "https://randomuser.me/api/portraits/women/3.jpg",
      },
    },
    {
      eventId: 5,
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.",
      createdAt: new Date(),
      User: {
        id: 11,
        avatar: "https://randomuser.me/api/portraits/men/16.jpg",
      },
    },
    {
      eventId: 6,
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.",
      createdAt: new Date(),
      User: {
        id: 33,
        avatar: "https://randomuser.me/api/portraits/women/10.jpg",
      },
    },
    {
      eventId: 7,
      content:
        "Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, ratione. Distinctio accusamus quo, qui aliquam doloremque voluptates itaque cupiditate porro.",
      createdAt: new Date(),
      User: {
        id: 25,
        avatar: "https://randomuser.me/api/portraits/men/6.jpg",
      },
    },
  ],
};

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
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  created() {
    const userId = this.currentUser.id;
    this.$socket.connect();
    // 上線發出訊息報到
    this.reportUserData();
    // 獲取歷史訊息 -- 目前為假資料
    this.fetchMessages(userId);
    // 接收所有人的發出的 login 訊息
    this.catchOnlineHint();
    // 接收所有人的 離線 訊息
    this.catchOfflineHint();
    // 接收所有人發出的 message 訊息
    this.catchMessage();
  },
  methods: {
    reportUserData() {
      // 上線發出訊息報到
      this.$socket.emit("onlineHint", {
        name: this.currentUser.name,
        user: {
          id: this.currentUser.id,
          account: this.currentUser.account,
          avatar: this.currentUser.avatar,
        },
      });
    },
    // 暫時模仿 socket 回傳歷史紀錄
    fetchMessages(userId) {
      console.log(`現在的使用者 id-${userId}`);
      const historyBubbles = dummyData.historyMessages.map((historyMessage) => {
        return {
          bubbleType: "message",
          data: {
            ...historyMessage,
            eventId: historyMessage.eventId,
          },
        };
      });

      this.chatBubbles.push(...historyBubbles);
      console.log(this.chatBubbles);
    },
    // 暫時模仿 subscribe socket 得到有人上線的資訊
    catchOnlineHint() {
      // 接收所有人的發出的 login 訊息
      this.sockets.subscribe("onlineHint", (data) => {
        console.log(data, "上線此資料將被儲存");
      });

      const newStatusMessage = {
        bubbleType: "status",
        data: {
          ...dummyData.onlineHint,
          status: "online",
        },
      };
      this.chatBubbles.push(newStatusMessage);
      console.log(this.chatBubbles);
    },
    // 暫時模仿 subscribe socket 得到有人下線的資訊
    catchOfflineHint() {
      // 接收所有人的發出的 離線 訊息
      this.sockets.subscribe("offlineHint", (data) => {
        console.log(data, "離線此資料將被儲存");
      });
      // 假設 offlineHint 一次只會回傳一筆 object 資料
      const newStatusMessage = {
        bubbleType: "status",
        data: {
          ...dummyData.offlineHint,
          status: "offline",
        },
      };
      this.chatBubbles.push(newStatusMessage);
      console.log(this.chatBubbles);
    },
    // 暫時模仿 subscribe socket 得到別人發送的新訊息
    emitMessageToSocket({ input }) {
      this.isProcessing = true;
      console.log(`1 -- function -- view is going to sent ${input} to socket`);
      this.$socket.emit("getMessage", {
        content: input,
        user: { id: 3, name: "JJJ", avatar: "...", account: "user123" },
      });
      this.isProcessing = false;
    },
    catchMessage() {
      // 接收所有人發出的 message 訊息
      this.sockets.subscribe("getMessage", (receivedData) => {
        // 假設 offlineHint 一次只會回傳一筆 object 資料
        const newMessage = {
          bubbleType: "message",
          data: {
            ...receivedData,
            eventId: 5,
          },
        };
        this.chatBubbles.push(newMessage);
        // console.log(this.chatBubbles)
      });
    },
  },
  sockets: {
    publicNamespace: (data) => {
      console.log(data);
    },
    onlineHint: (data) => {
      console.log("已進入聊天室");
      return data;
    },
    offlineHint: (data) => {
      console.log("已離開聊天室");
      return data;
    },
    getMessage: (receivedData) => {
      console.log("2 -- 接收 -- 有新消息", receivedData);
    },
  },
};
</script>