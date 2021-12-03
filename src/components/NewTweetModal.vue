<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form action="" @submit.prevent.stop="handleFormSubmit">
        <div class="modal-container">
          <div class="modal-header">
            <span
              ><img
                @click.prevent.stop="checkoutHandler"
                src="../assets/images/cross.png"
                alt=""
                class="modal-header_cross"
            /></span>
          </div>

          <div class="modal-body">
            <span>
              <img
                :src="this.$store.state.currentUser.avatar"
                alt=""
                class="modal-body_user-image"
            /></span>
            <textarea
              type=""
              autofocus
              v-model="description"
              class="modal-body_new-tweet"
              rows1="3"
              cols="50"
              placeholder="有什麼新鮮事?"
            />
          </div>

          <div class="modal-footer">
            <div class="modal-footer_button-container">
              <div
                v-if="formValidation.tweet.error"
                class="form-row__error-message"
              >
                {{ formValidation.tweet.message }}
              </div>
              <button class="btn modal-button">推文</button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: "new-tweet-modal",
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
    };
  },
  watch: {
    description: function () {
      if (this.description.length > this.formValidation.tweet.lengthLimit) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "字數不可超過 140 字";
      } else if (this.description.length == 0) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "推文不能為空白";
      } else {
        this.formValidation.tweet.error = false;
      }
    },
  },
  methods: {
    handleFormSubmit() {
      if (this.description.length == 0) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "推文不能為空白";
      }
      if (this.formValidation.tweet.error) {
        return;
      }
      console.log("推特內容送出：", this.description);

      this.$emit("after-tweet-send");
      this.checkoutHandler();
    },
    checkoutHandler() {
      this.$emit("after-tweet-checkout");
    },
  },
};
</script>