<template>
  <nav class="navbar">
    <a href="/" class="link navbar_brand"
      ><div class="navbar_brand_logo"></div>
    </a>
    <div class="navbar_link">
      <a href="/" class="link navbar_link_home-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_home-page active"></div>
          <h2 class="navbar_link_text">首頁</h2>
        </div>
      </a>
      <a href="/user" class="link navbar_link_user-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_user-page"></div>
          <h2 class="navbar_link_text">個人資料</h2>
        </div>
      </a>
      <a href="/setting" class="link navbar_link_setting-page">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_setting-page"></div>
          <h2 class="navbar_link_text">設定</h2>
        </div>
      </a>
    </div>
    <div class="navbar_link_tweet-launch">
      <button class="btn tweet-launch_button">推文</button>
    </div>
    <div class="navbar_link_logout">
      <a href="/logout" class="link navbar_link_logout">
        <div class="navbar_link_content">
          <div class="navbar_link_icon navbar_link_icon_logout"></div>
          <h2 class="navbar_link_text">登出</h2>
        </div>
      </a>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  border: 1px solid red;
}
</style>