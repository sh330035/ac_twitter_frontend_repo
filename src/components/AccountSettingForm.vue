<template>
  <form
    @submit.prevent.stop="handleFormSubmit"
    class="account-setting-form"
    action=""
    novalidate
  >
    <div class="form-row">
      <label for="account" class="form-row__label"> 帳號 </label>
      <input
        v-model="accountDetail.account"
        id="account"
        class="form-row__input"
        :class="{ invalid: formValidation.account.error }"
        type="text"
        name="account"
        required
      />
      <div v-if="formValidation.account.error" class="form-row__error-message">
        {{ formValidation.account.message }}
      </div>
    </div>
    <div class="form-row">
      <label for="name" class="form-row__label"> 名稱 </label>
      <input
        v-model="accountDetail.name"
        id="name"
        class="form-row__input"
        :class="{ invalid: formValidation.name.error }"
        type="text"
        name="name"
        required
      />
      <div class="form-row__length-counter">
        <span class="form-row__length-counter__current-length">
          {{ accountDetail.name.length }}
        </span>
        <span class="form-row__length-counter__length-limit">
          / {{ formValidation.name.lengthLimit }}
        </span>
      </div>
      <div v-if="formValidation.name.error" class="form-row__error-message">
        {{ formValidation.name.message }}
      </div>
    </div>
    <div class="form-row">
      <label for="email" class="form-row__label"> Email </label>
      <input
        v-model="accountDetail.email"
        id="email"
        class="form-row__input"
        :class="{ invalid: formValidation.email.error }"
        type="email"
        name="email"
        required
      />
      <div v-if="formValidation.email.error" class="form-row__error-message">
        {{ formValidation.email.message }}
      </div>
    </div>
    <div class="form-row">
      <label for="password" class="form-row__label"> 密碼 </label>
      <input
        v-model="accountDetail.password"
        id="password"
        class="form-row__input"
        :class="{ invalid: formValidation.password.error }"
        type="password"
        name="password"
        required
      />
      <div v-if="formValidation.password.error" class="form-row__error-message">
        {{ formValidation.password.message }}
      </div>
    </div>
    <div class="form-row">
      <label for="passwordCheck" class="form-row__label"> 密碼確認 </label>
      <input
        v-model="accountDetail.passwordCheck"
        id="passwordCheck"
        class="form-row__input"
        :class="{ invalid: formValidation.passwordCheck.error }"
        type="password"
        name="passwordCheck"
        required
      />
      <div
        v-if="formValidation.passwordCheck.error"
        class="form-row__error-message"
      >
        {{ formValidation.passwordCheck.message }}
      </div>
    </div>
    <button type="submit" class="account-setting-form__submit-btn btn">
      submit
    </button>
    <span class="link" @click="$router.back()">取消</span>
  </form>
</template>

<script>
export default {
  name: "AccountSettingForm",
  props: {
    initialAccountDetail: {
      type: Object,
    },
  },
  data() {
    return {
      accountDetail: {
        account: "",
        name: "",
        email: "",
        password: "",
        passwordCheck: "",
        role: "user",
      },
      formValidation: {
        account: {
          error: false,
          message: "test",
        },
        name: {
          lengthLimit: 50,
          error: false,
          message: "",
        },
        email: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        },
        passwordCheck: {
          error: false,
          message: "",
        },
      },
    };
  },
  created() {
    this.updateAccountDetail();
  },
  watch: {
    initialAccountDetail: function () {
      this.updateAccountDetail();
    },
    "accountDetail.name": function () {
      if (
        this.accountDetail.name.length > this.formValidation.name.lengthLimit
      ) {
        this.formValidation.name.error = true;
        this.formValidation.name.message = "字數超過限制";
      } else {
        this.formValidation.name.error = false;
      }
    },
  },
  methods: {
    updateAccountDetail() {
      this.accountDetail = {
        ...this.accountDetail,
        ...this.initialAccountDetail,
        password: "",
      };
    },
    handleFormSubmit() {
      // reset data of this.formValidation
      const fileName = Object.keys(this.formValidation);
      fileName.forEach((name) => {
        this.formValidation[name].error = false;
        this.formValidation[name].message = "";
      });
      // form validation of account
      if (this.accountDetail.account.trim().length === 0) {
        this.formValidation.account.error = true;
        this.formValidation.account.message = "請填入帳號";
        return;
      }
      // form validation of name
      if (this.accountDetail.name.trim().length === 0) {
        this.formValidation.name.error = true;
        this.formValidation.name.message = "請填入名稱";
        return;
      }
      // form validation of email
      if (this.accountDetail.email.trim().length === 0) {
        this.formValidation.email.error = true;
        this.formValidation.email.message = "請填入信箱";
        return;
      } else if (
        !this.accountDetail.email.includes("@") ||
        !this.accountDetail.email.includes(".com")
      ) {
        this.formValidation.email.error = true;
        this.formValidation.email.message = "請填入正確的信箱格式";
        return;
      }
      // form validation of password
      if (this.accountDetail.password.trim().length === 0) {
        this.formValidation.password.error = true;
        this.formValidation.password.message = "請填入密碼";
        return;
      }
      if (this.accountDetail.passwordCheck.trim().length === 0) {
        this.formValidation.passwordCheck.error = true;
        this.formValidation.passwordCheck.message = "請再次填入密碼已進行確認";
        return;
      } else if (
        this.accountDetail.password !== this.accountDetail.passwordCheck
      ) {
        this.formValidation.passwordCheck.error = true;
        this.formValidation.passwordCheck.message = "密碼不相符，請重新確認";
        this.accountDetail.passwordCheck = "";
        return;
      }

      // formSubmit
      this.$emit("after-form-submit", this.accountDetail);
      // 暫時註解掉，看這段要不要拿到母層，寫在form與後端溝通的地方
      // 因為 register 完導回 login；但 setting 完應該是導回 profile 之類
      // this.$router.push({ name: "login" });
    },
  },
};
</script>