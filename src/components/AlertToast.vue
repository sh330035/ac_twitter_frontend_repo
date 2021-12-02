<template>
  <div>
    <div id="snackbar">
      <span class="snackbar_text">{{ this.ToastMessage.message }}</span>
      <span class="snackbar_img" v-if="this.ToastMessage.dataStatus == 'error'"
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
  name: "Toast",
  props: {
    ToastMessage: {
      type: Object,
      required: true,
    },
  },
  watch: {
    // 監看 props 中 status 的變化 (由空值變為 error 或 success) 觸發 toast
    ToastMessage: {
      handler: function () {
        this.toast();
      },
      deep: true,
    },
  },
  methods: {
    toast() {
      const toastElement = document.getElementById("snackbar");
      toastElement.className = "show";
      setTimeout(function () {
        toastElement.className = toastElement.className.replace("show", "");
      }, 2750);
    },
  },
};
</script>

<style scoped>
#snackbar {
  visibility: hidden;
  display: flex;
  justify-content: space-between;
  min-width: 394px;
  min-height: 94px;
  background-color: #fff;
  color: #000;
  font-weight: 900;
  border-radius: 8px;
  padding: 25px;
  position: fixed;
  z-index: 1;
  right: 10%;
  top: 30px;
  text-align: start;
  font-size: 20px;
  box-shadow: 2px 2px 2px 2px rgba(0, 0, 0, 0.2);
}
.snackbar_text {
  margin-top: 10px;
}

.snackbar_img {
  height: 56px;
  width: 56px;
}
#snackbar.show {
  visibility: visible;
  -webkit-animation: fadein 0.5s, fadeout 0.5s 2.5s;
  animation: fadein 0.5s, fadeout 0.5s 2.5s;
}
@-webkit-keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}
@keyframes fadein {
  from {
    top: 0;
    opacity: 0;
  }
  to {
    top: 30px;
    opacity: 1;
  }
}
@-webkit-keyframes fadeout {
  from {
    top: 30px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}
@keyframes fadeout {
  from {
    top: 30px;
    opacity: 1;
  }
  to {
    top: 0;
    opacity: 0;
  }
}
</style>