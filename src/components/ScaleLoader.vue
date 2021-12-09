<template>
  <div class="v-spinner" v-show="isLoading">
    <div class="spinner-Style v-scale v-scale1 spinner-delay1"></div>
    <div class="spinner-Style v-scale v-scale2 spinner-delay2"></div>
    <div class="spinner-Style v-scale v-scale3 spinner-delay3"></div>
    <div class="spinner-Style v-scale v-scale4 spinner-delay4"></div>
    <!-- <div class="spinner-Style v-scale v-scale5 spinner-delay5"></div> -->
    <!-- <div class="spinner-Style v-scale v-scale5 spinner-delay6"></div>
    <div class="spinner-Style v-scale v-scale5 spinner-delay7"></div> -->

  </div>
</template>

<script>
export default {
  name: 'ScaleLoader',
  props: {
    isLoading: {
      type: Boolean,
      default: false
    },
  },
}
</script>

<style>
.v-spinner {
  text-align: center;
}

.spinner-Style {
  background-color: #ff6600a4;
  height: 25px;
  width: 5px;
  margin: 30px 4px;
  border-radius: 2px;
  display: inline-block;
  animation-name: v-scaleStretchDelay;
  animation-duration: 1s;
  animation-iteration-count: infinite;
  animation-timing-function: cubic-bezier(0.2, 0.68, 0.18, 1.08);
  animation-fill-mode: both;
}

.spinner-delay1 {
  animation-delay: 0.1s;
}
.spinner-delay2 {
  animation-delay: 0.2s;
}

.spinner-delay3 {
  animation-delay: 0.3s;
}

.spinner-delay4 {
  animation-delay: 0.4s;
}

/* .spinner-delay5 {
  animation-delay: 0.5s;
}

.spinner-delay6 {
  animation-delay: 0.6s;
}

.spinner-delay7 {
  animation-delay: 0.7s;
} */

@-webkit-keyframes v-scaleStretchDelay {
  0% {
    -webkit-animation-name: inherit;
    -webkit-animation-duration: inherit;
    -webkit-animation-iteration-count: inherit;
    -webkit-animation-direction: inherit;
  }
  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(0.6);
    transform: scaleY(0.6);
    background-color: #ff6600da;
  }
}
@keyframes v-scaleStretchDelay {
  0% {
    -webkit-animation-name: inherit;
    -webkit-animation-duration: inherit;
    -webkit-animation-iteration-count: inherit;
    -webkit-animation-direction: inherit;
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
  50% {
    -webkit-transform: scaleY(0.6);
    transform: scaleY(0.6);
    background-color: #ff6600da;
  }
}
</style>