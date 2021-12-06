<template>
  <div class="popular">
    <div class="popular__card">
      <h2 class="popular__card__title">Popular</h2>
      <div
        class="popular__card__user d-flex"
        v-for="popularUser in popularUsers"
        :key="popularUser.id"
      >
        <span
          ><router-link :to="{ name: 'user', params: { id: popularUser.id } }">
            <img
              :src="popularUser.avatar"
              alt=""
              class="popular__card__user__avatar avatar-50"
          /></router-link>
        </span>
        <div class="popular__card__user__name d-flex-col">
          <p
            class="user-name-text"
            @click.prevent.stop="toUserPage(popularUser.id)"
          >
            {{ popularUser.name }}
          </p>
          <p class="user-account-text">
            {{ popularUser.account | accountTag }}
          </p>
        </div>
        <div class="popular__card__user__button">
          <button
            class="btn-follow"
            v-if="!popularUser.isFollowed"
            @click.prevent.stop="addFollowing(popularUser.id)"
          >
            跟隨
          </button>
          <button
            class="btn-following"
            v-else
            @click.prevent.stop="deleteFollowing(popularUser.id)"
          >
            正在跟隨
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { accountFilter } from "../utils/mixins.js";
import popularUsersAPI from "../api/users";

export default {
  name: "popular-user",
  mixins: [accountFilter],
  data() {
    return {
      popularUsers: [],
    };
  },
  created() {
    this.fetchPopularUsers();
  },
  methods: {
    async fetchPopularUsers() {
      try {
        const { data } = await popularUsersAPI.getPopularUsers();

        this.popularUsers = data.users;
      } catch (error) {
        console.log(error);
      }
    },
    // 無法成功
    async addFollowing(userId) {
      try {
        const { data } = await popularUsersAPI.addFollowing({ id: userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        console.log(data.message);

        this.popularUsers = this.popularUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: true,
            };
          }
        });
      } catch (error) {
        console.log(error);
      }
    },
    async deleteFollowing(userId) {
      try {
        const { data } = await popularUsersAPI.deleteFollowing({ userId });

        if (data.status !== "success") {
          throw new Error(data.message);
        }

        this.popularUsers = this.popularUsers.map((user) => {
          if (user.id !== userId) {
            return user;
          } else {
            return {
              ...user,
              isFollowed: false,
            };
          }
        });

        console.log("deleteFollow, success");
      } catch (error) {
        console.log(error);
      }
    },
    toUserPage(userId) {
      this.$router.push({ name: "user", params: { id: userId } });
    },
  },
};
</script>

<style scoped>
.popular {
  height: 100vh;
  min-width: 410px;
  /* border: 1px solid red; */
}
</style>