<template>
  <div class="test-page">
    <!-- 測試頁面，確認字體有拉到 SCSS 的樣式 -->
    <section class="center-view">
      <h3>Test page</h3>
      <i class="fas fa-align-left"></i>
      <button @click="sendToastMessage">Show Snackbar</button>
      <Toast :ToastMessage="ToastMessage" />
      <h3>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatum debitis mollitia ipsam quod, provident, perferendis nisi
        maiores nihil sapiente animi incidunt laudantium blanditiis aspernatur
        beatae? Obcaecati quae officiis fugiat! 帳號Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptatum debitis mollitia ipsam
        quod, provident, perferendis nisi maiores nihil sapiente animi incidunt
        laudantium blanditiis aspernatur beatae? Obcaecati quae officiis fugiat!
        帳號Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatum debitis mollitia ipsam quod, provident, perferendis nisi
        maiores nihil sapiente animi incidunt laudantium blanditiis aspernatur
        beatae? Obcaecati quae officiis fugiat! 帳號Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptatum debitis mollitia ipsam
        quod, provident, perferendis nisi maiores nihil sapiente animi incidunt
        laudantium blanditiis aspernatur beatae? Obcaecati quae officiis fugiat!
        帳號Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatum debitis mollitia ipsam quod, provident, perferendis nisi
        maiores nihil sapiente animi incidunt laudantium blanditiis aspernatur
        beatae? Obcaecati quae officiis fugiat! 帳號Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptatum debitis mollitia ipsam
        quod, provident, perferendis nisi maiores nihil sapiente animi incidunt
        laudantium blanditiis aspernatur beatae? Obcaecati quae officiis fugiat!
        帳號Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatum debitis mollitia ipsam quod, provident, perferendis nisi
        maiores nihil sapiente animi incidunt laudantium blanditiis aspernatur
        beatae? Obcaecati quae officiis fugiat! 帳號Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptatum debitis mollitia ipsam
        quod, provident, perferendis nisi maiores nihil sapiente animi incidunt
        laudantium blanditiis aspernatur beatae? Obcaecati quae officiis fugiat!
        帳號Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem
        voluptatum debitis mollitia ipsam quod, provident, perferendis nisi
        maiores nihil sapiente animi incidunt laudantium blanditiis aspernatur
        beatae? Obcaecati quae officiis fugiat! 帳號Lorem ipsum dolor sit amet
        consectetur adipisicing elit. Autem voluptatum debitis mollitia ipsam
        quod, provident, perferendis nisi maiores nihil sapiente animi incidunt
        laudantium blanditiis aspernatur beatae? Obcaecati quae officiis fugiat!
        帳號
      </h3>
    </section>
    <section class="right-card">
      <PopularUsersCard />
    </section>
  </div>
</template>

<script>
import PopularUsersCard from "../components/PopularUsersCard.vue";
import Toast from "../components/AlertToast.vue";

export default {
  name: "test-page",
  components: { PopularUsersCard, Toast },
  data() {
    return {
      // 母層須 props 此物件給 Toast 做為控制參數
      ToastMessage: {
        message: "",
        dataStatus: "",
      },
    };
  },
  methods: {
    // 母層須帶此函式，控制 toast 之行為與字串
    sendToastMessage() {
      // catch觸發錯誤訊息後，在 error catch 處呼叫此函式；或成功寫入資料、登入...等等
      // 並以後端回傳之 data.status 為參數傳入，改寫程式
      // props 出去的 message 決定顯示文字， dataStatus 決定勾勾或驚嘆號
      this.ToastMessage.dataStatus = "";
      // this.ToastMessage.dataStatus = "success";
      this.ToastMessage.dataStatus = "error";

      if (this.ToastMessage.dataStatus == "success") {
        this.ToastMessage.message = "恭喜成功登入";
      } else if (this.ToastMessage.dataStatus == "error") {
        this.ToastMessage.message = "帳號或密碼輸入錯誤";
      }
    },
  },
};
</script>
