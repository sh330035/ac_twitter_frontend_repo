<template>
  <div>
    <div id="snackbar__navbar">
      <span class="snackbar_text">{{ this.NavbarToastMessage.message }}</span>
      <span
        class="snackbar_img"
        v-if="this.NavbarToastMessage.dataStatus == 'error'"
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
  name: "NavbarToast",
  props: {
    NavbarToastMessage: {
      type: Object,
      required: true,
    },
  },
  watch: {
    // 監看 props 中 status 的變化 (由空值變為 error 或 success) 觸發 toast
    NavbarToastMessage: {
      handler: function () {
        this.toastNav();
      },
      deep: true,
    },
  },
  methods: {
    toastNav() {
      const toastElement = document.getElementById("snackbar__navbar");
      toastElement.className = "show";
      setTimeout(function () {
        toastElement.className = toastElement.className.replace("show", "");
      }, 2750);
    },
  },
};
</script>
