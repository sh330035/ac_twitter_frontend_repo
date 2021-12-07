<template>
  <div class="modal-mask" @click.self.prevent="closeSettingForm">
    <div class="modal-wrapper modal__profile-setting">
      <form
        @submit.prevent.stop="handleFormSubmit"
        action=""
        class="profile-setting-form"
      >
        <div class="profile-setting-form__header">
          <span
            @click.prevent="closeSettingForm"
            class="profile-setting-form__header__close-icon"
          ></span>
          <span class="profile-setting-form__header__title">編輯個人資料</span>
          <button
            :disabled="
              formValidation.name.error || formValidation.introduction.error || isProcessing
            "
            class="profile-setting-form__header__save-btn btn"
            type="submit"
          >
            儲存
          </button>
        </div>
        <div class="profile-setting-form__pictures">
          <div class="profile-setting-form__pictures__cover">
            <img
              v-show="user.cover"
              class="profile-setting-form__pictures__cover__img"
              :src="user.cover"
              alt="cover image"
            />
            <div class="profile-setting-form__pictures__cover__btns">
              <label
                for="cover"
                class="profile-setting-form__pictures__cover__btns__add-icon"
              ></label>
              <input
                @change="handleCoverChange"
                type="file"
                name="cover"
                id="cover"
                class="profile-setting-form__pictures__file-input"
                accept="image/*"
              />
              <span
                @click="deleteCoverImage"
                class="profile-setting-form__pictures__cover__btns__delete-icon"
              ></span>
            </div>
          </div>
          <div class="profile-setting-form__pictures__avatar">
            <img
              v-show="user.avatar"
              :src="user.avatar"
              alt="Avatar"
              class="profile-setting-form__pictures__avatar__img"
            />
            <label
              for="avatar"
              class="profile-setting-form__pictures__avatar__add-icon"
            ></label>
            <input
              @change="handleAvatarChange"
              type="file"
              name="avatar"
              id="avatar"
              class="profile-setting-form__pictures__file-input"
              accept="image/*"
            />
          </div>
        </div>
        <div class="profile-setting-form__body">
          <div class="form-row">
            <label for="name" class="form-row__label">名稱</label>
            <input
              v-model="user.name"
              class="form-row__input"
              :class="{ invalid: formValidation.name.error }"
              type="text"
              id="name"
              name="name"
              required
            />
            <div class="form-row__length-counter">
              <span class="form-row__length-counter__current-length">
                {{ user.name.length }}
              </span>
              <span class="form-row__length-counter__length-limit">
                / {{ formValidation.name.lengthLimit }}
              </span>
            </div>
            <div
              v-if="formValidation.name.error"
              class="form-row__error-message"
            >
              {{ formValidation.name.message }}
            </div>
          </div>
          <div class="form-row profile-setting-form__body__introduction">
            <label for="introduction" class="form-row__label">自我介紹</label>
            <textarea
              v-model="user.introduction"
              class="form-row__input"
              :class="{ invalid: formValidation.introduction.error }"
              id="introduction"
              name="introduction"
              required
            />
            <div class="form-row__length-counter">
              <span class="form-row__length-counter__current-length">
                {{ user.introduction.length }}
              </span>
              <span class="form-row__length-counter__length-limit">
                / {{ formValidation.introduction.lengthLimit }}
              </span>
            </div>
            <div
              v-if="formValidation.introduction.error"
              class="form-row__error-message"
            >
              {{ formValidation.introduction.message }}
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    initialUser: {
      type: Object,
      required: true,
    },
    isProcessing: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      user: {
        id: -1,
        name: "",
        avatar: "",
        cover: "",
        introduction: "",
      },
      formValidation: {
        name: {
          lengthLimit: 50,
          error: false,
          message: "",
        },
        introduction: {
          lengthLimit: 160,
          error: false,
          message: "",
        },
      },
    };
  },
  created() {
    this.updateUserProfile();
  },
  watch: {
    initialUser: function () {
      this.updateUserProfile();
    },
    "user.name": function () {
      if (this.user.name.length > this.formValidation.name.lengthLimit) {
        this.formValidation.name.error = true;
        this.formValidation.name.message = "字數超過限制";
      } else {
        this.formValidation.name.error = false;
      }
    },
    "user.introduction": function () {
      if (
        this.user.introduction.length >
        this.formValidation.introduction.lengthLimit
      ) {
        this.formValidation.introduction.error = true;
        this.formValidation.introduction.message = "字數超過限制";
      } else {
        this.formValidation.introduction.error = false;
      }
    },
  },
  methods: {
    updateUserProfile() {
      const { id, name, avatar, cover, introduction } = this.initialUser;
      this.user = {
        ...this.user,
        id,
        name,
        avatar,
        cover,
        introduction,
      };
    },
    closeSettingForm() {
      // if (event.target.matches('.modal-mask') || event.target.matches('.profile-setting-form__header__close-icon'))
      this.$emit("close-setting-form");
      this.updateUserProfile();
    },
    handleCoverChange(e) {
      const { files } = e.target;

      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        return;
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.cover = imageURL;
      }
    },
    deleteCoverImage() {
      this.user.cover = "";
    },
    handleAvatarChange(e) {
      const { files } = e.target;
      console.log("files", files);
      if (files.length === 0) {
        // 使用者沒有選擇上傳的檔案
        this.user.avatar = "";
      } else {
        // 否則產生預覽圖
        const imageURL = window.URL.createObjectURL(files[0]);
        this.user.avatar = imageURL;
      }
    },
    handleFormSubmit() {
      this.$emit("after-profile-form-submit", this.user);
    },
  },
};
</script>

<style lang="scss" scoped>
form {
  position: absolute;
  z-index: 10;
  background-color: white;
}
</style>
