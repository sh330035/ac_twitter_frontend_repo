<template>
  <div class="form-wrapper">
    <Toast :ToastMessage="ToastMessage" />
    <form action="" class="tweet-form" @submit.prevent.stop="handleFormSubmit">
      <div class="tweet-form__container">
        <span>
          <img
            :src="this.$store.state.currentUser.avatar"
            alt=""
            class="tweet-form__image"
        /></span>
        <textarea
          type=""
          autofocus
          v-model="description"
          class="tweet-form__new-tweet"
          rows="2"
          cols="45"
          placeholder="有什麼新鮮事?"
        />
      </div>
      <div class="tweet-form__footer">
        <span
          v-if="formValidation.tweet.error"
          class="tweet-form__footer__error-message"
        >
          {{ formValidation.tweet.message }}
        </span>
        <button class="btn tweet-form__footer__button">推文</button>
      </div>
    </form>
  </div>
</template>

<script>
import Toast from "../components/AlertToast.vue";

export default {
  name: "new-tweet-form",
  components: { Toast },
  data() {
    return {
      description: "",
      formValidation: {
        tweet: {
          lengthLimit: 140,
          error: false,
          message: "",
        },
      },
      // 母層須 props 此物件給 Toast 做為控制參數
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      // 預設後端回傳正確訊息
      backendReturnStatus: true,
    };
  },
  watch: {
    description: function () {
      if (this.description.length > this.formValidation.tweet.lengthLimit) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "字數不可超過 140 字";
      } else {
        this.formValidation.tweet.error = false;
      }
    },
  },
  methods: {
    handleFormSubmit() {
      if (this.description.trim().length == 0) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "推文不能為空白";
        this.description = "";
      }
      if (this.formValidation.tweet.error) {
        return;
      }
      console.log("推特內容送出：", this.description);

      if (!this.backendReturnStatus) {
        this.sendToastMessage("error");
      } else {
        this.sendToastMessage("success");
      }
      this.description = "";
    },
    sendToastMessage(status) {
      this.ToastMessage.dataStatus = "";
      this.ToastMessage.dataStatus = status;
      this.ToastMessage.message = "推文發送成功";
    },
  },
};
</script>