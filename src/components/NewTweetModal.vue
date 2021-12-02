<template>
  <div class="modal-mask">
    <div class="modal-wrapper">
      <form action="">
        <div class="modal-container">
          <div class="modal-header">
            <span
              ><img
                src="../assets/images/cross.png"
                alt=""
                class="modal-header_cross"
            /></span>
          </div>

          <div class="modal-body">
            <span><img src="" alt="" class="modal-body_user-image" /></span>
            <textarea
              type=""
              class="modal-body_new-tweet"
              rows="4"
              cols="50"
              placeholder="有什麼新鮮事?"
            />
          </div>

          <div class="modal-footer">
            <div class="modal-footer_button-container">
              <button class="btn modal-button" @click="$emit('close')">
                推文
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: table;
  transition: opacity 0.3s ease;
}

.modal-wrapper {
  margin: 55px;
}

.modal-container {
  width: 600px;
  height: 300px;
  margin: 0px auto;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
}

.modal-header {
  height: 55px;
  margin-top: 0;
  display: flex;
  align-items: center;
  border-bottom: 1px solid #e6ecf0;
  color: #42b983;
}

.modal-header_cross {
  margin-left: 20px;
  height: 15px;
  width: 15px;
}

.modal-header_cross:hover {
  cursor: pointer;
}

.modal-body {
  display: flex;
  height: 137px;
  margin: 20px 0;
  padding: 0 15px;
}

.modal-body_user-image {
  height: 50px;
  width: 50px;
  border-radius: 50px;
}

.modal-body_new-tweet {
  margin-left: 10px;
  border: none;
}

.modal-footer {
  display: flex;
  justify-content: end;
}

.modal-button {
  width: 66px;
  margin: 15px;
}

/*
 * The following styles are auto-applied to elements with
 * transition="modal" when their visibility is toggled
 * by Vue.js.
 *
 * You can easily play with the modal transition by editing
 * these styles.
 */

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>