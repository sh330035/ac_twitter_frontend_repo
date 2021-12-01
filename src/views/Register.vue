<template>
  <div class="register">
    <img class="logo" :src="require('../assets/images/logo.png')" alt="" />
    <h2>建立你的帳號</h2>
    <account-setting-form />
  </div>
</template>

<script>
import AccountSettingForm from '../components/AccountSettingForm.vue'

export default {
  components: {
    AccountSettingForm,
  }
}
</script>

<style lang="scss" scoped>
// general setting -- submit merge 後刪除
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
}

ul,
ol,
li {
  list-style: none;
}

a,
a:hover,
a:active,
a:visited,
a:focus {
  text-decoration: none;
  color: inherit;
  outline: none;
  cursor: pointer;
}

button,
button:hover,
button:active,
button:focus {
  border: 0;
  outline: none;
  -webkit-appearance: none;
  cursor: pointer;
}

button[disabled] {
  pointer-events: none;
}

input:required,
input:invalid {
  box-shadow: none;
}

input:focus,
textarea:focus,
select,
select:focus,
a:focus {
  outline: none;
}

// 放在 global setting
// 通用設定 for Register & Login & Admin Login
.register {
  width: 100%;
  margin: 0 auto;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .logo {
    display: block;
    height: 50px;
    width: 50px;
    margin-bottom: 20px;
  }
  h2 {
    margin-bottom: 20px;
  }
  form {
    margin: 20px;
    width: 100%;
    max-width: 540px;
    display: flex;
    flex-direction: column;
    gap: 32px;

    .form-row {
      //  暫時寫在 component 理
    }
  }
}

// .register {
//   .account-setting-form {

//   }
// }
</style>
