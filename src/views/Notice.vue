<template>
  <div class="notice">
    <section class="center-view">
      <PageNameBanner :banner-title="bannerTitle" />
      <NoticeList v-for="notice in notices" :key="notice.id" :notice="notice" />
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import PageNameBanner from "../components/PageNameBanner.vue";
import NoticeList from "../components/NoticeList.vue";

const dummyData = {
  notices: [
    {
      id: 101,
      categories: "有新的推文通知",
      noticeContent:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos porro obcaecati",
      user: {
        id: 8,
        name: "John",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      isRead: false,
    },
    {
      id: 98,
      categories: "開始追蹤你",
      noticeContent: "",
      user: {
        id: 23,
        name: "Kevin",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      isRead: false,
    },
    {
      id: 95,
      categories: "有新的回覆",
      noticeContent: "Lorem ipsum dolor sit amet consectetur",
      user: {
        id: 10,
        name: "David",
        avatar: "https://randomuser.me/api/portraits/women/6.jpg",
      },
      isRead: false,
    },
  ],
};

export default {
  name: "Notice",
  components: {
    PopularUsersCard,
    PageNameBanner,
    NoticeList,
  },
  data() {
    return {
      bannerTitle: "通知",
      notices: [
        // {
        //   id: -1,
        //   categories: "",
        //   noticeContent: "",
        //   user: {
        //     id: -1,
        //     name: "",
        //     avatar: "",
        //   },
        //   isRead: false,
        // },
      ],
    };
  },
  created() {
    this.fetchNotice();
  },
  methods: {
    fetchNotice() {
      // 串接 API
      this.notices = dummyData.notices;
    },
  },
};
</script>