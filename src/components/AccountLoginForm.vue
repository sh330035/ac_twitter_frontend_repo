<template>
  <form
    @submit.prevent.stop="handleFormSubmit"
    class="account-setting-form"
    action=""
    novalidate
  >
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
    <button type="submit" class="account-setting-form__submit-btn btn">
      登入
    </button>
  </form>
</template>

<script>
export default {
  name: "AccountSettingForm",
  data() {
    return {
      accountDetail: {
        email: "",
        password: "",
        role: "user",
      },
      formValidation: {
        email: {
          error: false,
          message: "",
        },
        password: {
          error: false,
          message: "",
        }
      },
    }
  },
  methods: {
    handleFormSubmit() {
      // reset data of this.formValidation
      const fileName = Object.keys(this.formValidation)
      fileName.forEach((name) => {
        this.formValidation[name].error = false
        this.formValidation[name].message = ""
      })
      // form validation of email
      if (this.accountDetail.email.trim().length === 0) {
        this.formValidation.email.error = true
        this.formValidation.email.message = "請填入信箱"
        return
      } else if (
        !this.accountDetail.email.includes("@") ||
        !this.accountDetail.email.includes(".com")
      ) {
        this.formValidation.email.error = true
        this.formValidation.email.message = "請填入正確的信箱格式"
        return
      }
      // form validation of password
      if (this.accountDetail.password.trim().length === 0) {
        this.formValidation.password.error = true
        this.formValidation.password.message = "請填入密碼"
        return
      }

      // formSubmit
      this.$emit("after-form-submit", this.accountDetail)
    },
  },
};
</script>