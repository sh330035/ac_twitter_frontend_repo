<template>
  <div>
    <div id="snackbar__App">
      <span class="snackbar_text">{{ this.appToastMessage.message }}</span>
      <span
        class="snackbar_img"
        v-if="this.appToastMessage.dataStatus == 'error'"
        ><img src="../assets/images/error.svg" alt=""
      /></span>
      <span class="snackbar_img" v-else
        ><img src="../assets/images/success.svg" alt=""
      /></span>
    </div>
  </div>
</template>

<script>
export default {
  name: "App-Toast",
  props: {
    appToastMessage: {
      type: Object,
      required: true,
    },
  },
  watch: {
    // 監看 props 中 status 的變化 (由空值變為 error 或 success) 觸發 toast
    appToastMessage: {
      handler: function () {
        this.toast();
      },
      deep: true,
    },
  },
  methods: {
    toast() {
      const toastElement = document.getElementById("snackbar__App");
      toastElement.className = "show";
      setTimeout(function () {
        toastElement.className = toastElement.className.replace("show", "");
      }, 2750);
    },
  },
};
</script>

