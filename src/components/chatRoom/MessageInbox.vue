<template>
  <section class="message-inbox">
    <div class="banner page-name-banner">
      <div class="banner__other-page message-inbox_banner d-flex">
        <span class="banner__other-page__info">
          <h2>訊息</h2>
        </span>
        <!-- 這個按鈕 UI 沒寫要連結到哪裡去? 通常應該是連到可以跟其他人開始聊天的地方，但我們的 user follow page 沒有開始聊天的按鈕...所以就先不放連結了 -->
        <div class="message-inbox_icon"></div>
      </div>
    </div>
    <div class="message-inbox_personal">
      <div
        class="message-inbox_personal_list"
        v-for="user in users"
        :key="user.id"
      >
        <router-link
          class="d-flex"
          :to="{ name: 'messages-to-user', params: { id: user.id } }"
        >
          <span class="avatar-container"
            ><router-link :to="{ name: 'user', params: { id: user.id } }">
              <img
                :src="user.avatar"
                alt=""
                class="message-inbox_avatar avatar-50"
            /></router-link>
          </span>
          <div class="message-inbox_block d-flex-col">
            <div class="message-inbox_name d-flex">
              <span class="d-flex">
                <p
                  class="user-name-text"
                  @click.prevent.stop="toUserPage(user.id)"
                >
                  {{ user.name }}
                </p>
                <p class="user-account-text">
                  {{ user.account | accountTag }}
                </p>
              </span>
              <span class="message-inbox_name_date">
                <p class="user-account-text">
                  {{ user.latestMessage.createdAt | fromNow }}
                </p>
              </span>
            </div>
            <span class="message-inbox_content">
              <p class="user-account-text message-inbox_content_text">
                {{ user.latestMessage.content }}
              </p>
            </span>
          </div>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script>
import { fromNowFilter, accountFilter } from "../../utils/mixins";

const dummyData = {
  userData: [
    {
      id: 8,
      name: "Apple",
      account: "apple",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      latestMessage: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad esse dolore sequi aliquid, voluptates maxime dolorum ea facere enim impedit necessitatibus, non magni amet modi molestias perspiciatis adipisci assumenda quo!",
        createdAt: "2021-12-10T11:09:34.000Z",
      },
    },
    {
      id: 10,
      name: "Orange",
      account: "orange",
      avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      latestMessage: {
        content:
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad esse dolore sequi aliquid, voluptates maxime dolorum ea facere enim impedit necessitatibus, non magni amet modi molestias perspiciatis adipisci assumenda quo!",
        createdAt: "2021-12-08T11:09:34.000Z",
      },
    },
  ],
};

export default {
  name: "message-inbox",
  mixins: [fromNowFilter, accountFilter],
  data() {
    return {
      users: [
        {
          id: -1,
          name: "",
          account: "",
          avatar: "",
          content: "",
          createdAt: "",
        },
      ],
    };
  },
  created() {
    this.fetchUserMessages();
  },
  methods: {
    fetchUserMessages() {
      // ToDo 串接 API
      this.users = dummyData.userData;
    },
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
  },
};
</script>