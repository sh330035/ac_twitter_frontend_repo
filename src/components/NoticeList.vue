<template>
  <div class="notice-list d-flex-col">
    <router-link :to="{ name: 'user', params: { id: notice.user.id } }">
      <img
        :src="notice.user.avatar"
        alt=""
        class="notice-list_avatar avatar-30"
    /></router-link>

    <span class="notice-list_title black-mediun-15"
      >{{ notice.user.name }} {{ notice.categories }}</span
    >
    <span
      class="notice-list_content gray-mediun-15"
      v-if="notice.noticeContent"
      >{{ notice.noticeContent }}</span
    >
  </div>
</template>

<script>
export default {
  name: "notice-list",
  props: {
    notice: {
      type: Object,
      required: true,
    },
  },
};
</script>