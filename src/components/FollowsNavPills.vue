<template>
  <ul class="follow-navPills d-flex">
    <li class="follow-navPills__item">
      <router-link
        :to="{ name: 'user-follow' }"
        class="link follow-navPills__item__link navpill-text"
        >跟隨者</router-link
      >
    </li>
    <li class="follow-navPills__item">
      <router-link
        :to="{ name: 'user-follow', query: { follow: 'following' } }"
        class="link follow-navPills__item__link navpill-text"
        >正在跟隨</router-link
      >
    </li>
    <!-- 為了延伸可重疊之底線 -->
    <div class="border"></div>
  </ul>
</template>