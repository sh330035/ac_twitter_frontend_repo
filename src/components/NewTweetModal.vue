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
              v-model="tweetContent"
              class="modal-body_new-tweet"
              rows="4"
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
              <button class="btn modal-button" @click="$emit('close')">
                推文
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "new-tweet-modal",
  data() {
    return {
      tweetContent: "",
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
    tweetContent: function () {
      if (this.tweetContent.length > this.formValidation.tweet.lengthLimit) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "字數不可超過 140 字";
      } else if (this.tweetContent.length == 0) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "推文不能為空白";
      } else {
        this.formValidation.tweet.error = false;
      }
    },
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  methods: {
    handleFormSubmit() {
      if (this.tweetContent.length == 0) {
        this.formValidation.tweet.error = true;
        this.formValidation.tweet.message = "推文不能為空白";
      }
      if (this.formValidation.tweet.error) {
        return;
      }
      console.log("推特內容送出：", this.tweetContent);

      this.$emit("after-tweet-send");
      this.checkoutHandler();
    },
    checkoutHandler() {
      this.$emit("after-tweet-checkout");
    },
  },
};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  margin: 55px;
}

.modal-container {
  width: 600px;
  height: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  height: 55px;
  margin-top: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
  color: #42b983;
}

.modal-header_cross {
  margin-left: 20px;
  height: 15px;
  width: 15px;
}

.modal-header_cross:hover {
  cursor: pointer;
}

.modal-body {
  display: flex;
  height: 137px;
  margin: 20px 0;
  padding: 0 15px;
}

.modal-body_user-image {
  height: 50px;
  width: 50px;
  border-radius: 50px;
}

.modal-body_new-tweet {
  margin-left: 10px;
  padding-top: 9px;
  border: none;
  resize: none;
  font-size: 18px;
  font-family: "Noto Sans TC", sans-serif;
}

.modal-footer {
  display: flex;
  justify-content: end;
}

.modal-footer_button-container {
  display: flex;
  align-items: center;
}

.form-row__error-message {
  margin: 5px 0;
  text-align: left;
  font-size: 15px;
  font-weight: 500;
  line-height: 15px;
  color: #fc5a5a;
}

.modal-button {
  width: 66px;
  margin: 15px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>