<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form
        action=""
        class="modal__reply__form"
        @submit.prevent.stop="handleFormSubmit"
      >
        <div class="reply-modal">
          <div class="reply-modal__header">
            <span
              ><img
                @click.prevent.stop="checkoutHandler"
                src="../assets/images/cross.png"
                alt=""
                class="reply-modal__header__cross"
            /></span>
          </div>
          <div class="reply-modal__tweet d-flex">
            <span
              ><a href="">
                <img
                  @click.prevent.stop="checkoutHandler"
                  :src="replyTweet.avatar"
                  alt=""
                  class="reply-modal__tweet__image avatar-50"
              /></a>
              <span class="line"></span>
            </span>
            <div class="reply-modal__tweet__container d-flex-col">
              <div class="reply-modal__tweet__user">
                <h2 class="reply-modal__tweet__user__name user-name-text">
                  {{ replyTweet.name }}
                </h2>
                <span
                  class="reply-modal__tweet__user__account user-account-text"
                  >{{ replyTweet.account | accountTag }}・{{
                    replyTweet.createdAt | fromNow
                  }}</span
                >
              </div>
              <div class="reply-modal__tweet__descriptoion">
                <p class="description-15">
                  {{ replyTweet.description }}
                </p>
              </div>
              <div class="reply-modal__tweet__accout">
                <p class="reply-account-13">
                  回覆給
                  <span class="ac-orange">{{
                    replyTweet.account | accountTag
                  }}</span>
                </p>
              </div>
            </div>
          </div>
          <div class="reply-modal__reply d-flex">
            <span>
              <img
                @click.prevent.stop="checkoutHandler"
                :src="this.$store.state.currentUser.avatar"
                alt=""
                class="reply-modal__reply__image avatar-50"
              />
            </span>
            <textarea
              type=""
              v-model="comment"
              class="reply-modal__reply__comment"
              rows1="3"
              cols="50"
              placeholder="推你的回覆"
            />
          </div>

          <div class="reply-modal__footer">
            <div class="reply-modal__footer__button-container d-flex">
              <div
                v-if="formValidation.comment.error"
                class="form-row__error-message"
              >
                {{ formValidation.comment.message }}
              </div>
              <button class="btn modal-button" :disabled="isProcessing || formValidation.comment.error">推文</button>
            </div>
          </div>
        </div>
      </form>
    </div>
    <Toast :ToastMessage="ToastMessage" />
  </div>
</template>

<script>
import { fromNowFilter, accountFilter } from "../utils/mixins.js";
import tweetsAPI from "../api/tweets";
import Toast from "../components/AlertToast.vue";
import { mapState } from "vuex";

export default {
  name: "reply-modal",
  components: {
    Toast,
  },
  props: {
    replyTweet: {
      type: Object,
      required: true,
    },
  },
  mixins: [fromNowFilter, accountFilter],
  data() {
    return {
      comment: "",
      formValidation: {
        comment: {
          lengthLimit: 140,
          error: false,
          message: "",
        },
      },
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
      isProcessing: false,
    };
  },
  computed: {
    ...mapState(["currentUser"]),
  },
  watch: {
    comment: function () {
      if (this.comment.trim().length > this.formValidation.comment.lengthLimit) {
        this.formValidation.comment.error = true;
        this.formValidation.comment.message = "字數不可超過 140 字";
      } else if (this.comment.trim().length == 0 && this.comment.length !== 0) {
        this.formValidation.comment.error = true;
        this.formValidation.comment.message = "推文不能為空白";
      } else {
        this.formValidation.comment.error = false;
        this.formValidation.comment.message = '';
      }
    },
  },
  methods: {
    async handleFormSubmit() {
      try {
        if (this.comment.trim().length == 0) {
          this.formValidation.comment.error = true;
          this.formValidation.comment.message = "推文不能為空白";
          this.comment = "";
        }
        if (this.formValidation.comment.error) {
          return;
        }
        this.isProcessing = true
        const { data } = await tweetsAPI.createTweetReply({
          tweetId: this.replyTweet.id,
          comment: this.comment,
        });
        if (data.status !== "success") {
          throw new Error(data.message);
        }
        this.ToastMessage.dataStatus = "";
        this.ToastMessage.dataStatus = "success";
        this.ToastMessage.message = `回文已成功送出`;
        setTimeout(() => {
          this.checkoutHandler();
          this.comment = "";
        }, 1000);
        this.$emit("after-reply-submit", this.replyTweet.id);
        this.isProcessing = false
      } catch (error) {
        console.log(error);
        this.ToastMessage.dataStatus = "error";
        this.ToastMessage.message = "推文失敗，請稍後再試";
        this.isProcessing = false
      }
    },
    checkoutHandler() {
      this.$emit("after-comment-checkout");
    },
  },
};
</script>