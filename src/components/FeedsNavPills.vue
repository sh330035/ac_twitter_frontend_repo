<template>
  <div class="feeds-nav-pills">
    <router-link :to="{name: 'user'}" class="feeds-nav-pills__feeds-categories">推文</router-link>
    <router-link :to="{name: 'user', query: {feeds: 'reply'}}" class="feeds-nav-pills__feeds-categories">推文與回覆</router-link>
    <router-link :to="{name: 'user', query: {feeds: 'like'}}" class="feeds-nav-pills__feeds-categories">喜歡的內容</router-link>
  </div>
</template>