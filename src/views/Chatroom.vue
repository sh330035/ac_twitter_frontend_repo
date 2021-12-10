<template>
  <div class="chatroom">
    <section class="center-view">
      <LoginUser />
    </section>
    <section class="right-room">
      <h1>Chatroom</h1>
    </section>
  </div>
</template>

<script>
import LoginUser from "../components/LoginUser.vue";
export default {
  name: "Chatroom",
  components: { LoginUser },
};
</script>