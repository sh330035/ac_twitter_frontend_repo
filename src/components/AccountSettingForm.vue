<template>
  <form
    @submit.prevent.stop="handleFormSubmit"
    class="account-setting-form"
    action=""
  >
    <div class="account-setting-form__form-row form-row">
      <label for="account" class="account-setting-form__form-row__label">
        帳號
      </label>
      <input
        v-model="accountDetail.account"
        id="account"
        class="account-setting-form__form-row__input"
        type="text"
        name="account"
        placeholder="@"
        required
      />
      <div
        v-if="formValidation.account.error"
        class="account-setting-form__form-row__error-message"
      >
        {{ formValidation.account.message }}
      </div>
    </div>
    <div class="account-setting-form__form-row form-row">
      <label for="name" class="account-setting-form__form-row__label">
        名稱
      </label>
      <input
        v-model="accountDetail.name"
        id="name"
        class="account-setting-form__form-row__input"
        type="text"
        name="name"
        required
      />
    </div>
    <div class="account-setting-form__form-row form-row">
      <label for="email" class="account-setting-form__form-row__label">
        Email
      </label>
      <input
        v-model="accountDetail.email"
        id="email"
        class="account-setting-form__form-row__input"
        type="email"
        name="email"
        required
      />
    </div>
    <div class="account-setting-form__form-row form-row">
      <label for="password" class="account-setting-form__form-row__label">
        密碼
      </label>
      <input
        v-model="accountDetail.password"
        id="password"
        class="account-setting-form__form-row__input"
        type="text"
        name="password"
        required
      />
    </div>
    <div class="account-setting-form__form-row form-row">
      <label for="passwordCheck" class="account-setting-form__form-row__label">
        密碼確認
      </label>
      <input
        v-model="accountDetail.passwordCheck"
        id="passwordCheck"
        class="account-setting-form__form-row__input"
        type="text"
        name="passwordCheck"
        required
      />
    </div>
    <button type="submit" class="account-setting-form__submit-btn btn">
      submit
    </button>
    <router-link class="link" to="">取消</router-link>
  </form>
</template>

<script>

export default {
  data() {
    return {
      accountDetail: {
        account: '@',
        name: '',
        email: '',
        password: '',
        role: 'user'
      },
      formValidation: {
        account: {
          error: true,
          message: 'test'
        },
        name: {
          error: false,
          message: ''
        },
        email: {
          error: false,
          message: ''
        },
        password: {
          error: false,
          message: ''
        },
      }
    }
  },
  methods: {
    handleFormSubmit() {
      console.log('validate form')
      // form validation
      // console.log(this.accountDetail.account.slice(0, 1))
      // console.log(this.accountDetail.account.slice(0, 1) === '@')
      // console.log(this.accountDetail.account.includes('@'))
      if (this.accountDetail.account.trim().length === 0 || !this.accountDetail.account.includes('@')) {
        console.log('account name invalid')
      }
      
    }
  }
}

</script>

<style lang="scss">
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

.form-row {
  width: 100%;
  height: 52px;
  position: relative;
  background-color: #f5f8fa;
  label {
    position: absolute;
    top: 5px;
    left: 10px;
    font-size: 15px;
    line-height: 15px;
    font-weight: 500;
    color: #657786;
  }
  input {
    width: 100%;
    // height: 100%;
    // display: block;
    padding: 20px 10px 4px 10px;
    border-color: transparent;
    border-bottom: 2px solid #657786;
    // active & error 要是另一個底色樣式
    background-color: transparent;
    font-size: 19px;
    font-weight: 500;
    line-height: 28px;
    color: #1c1c1c;
    vertical-align: text-bottom;
    // &::placeholder {
    //   // padding: 20px 10px 4px 10px;
    // }
  }
}

.link {
  font-size: 18px;
  font-weight: 800;
  line-height: 26px;
  text-decoration: underline;
  color: #0099ff;
}
</style>